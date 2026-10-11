/**
 * Web Bluetooth GATT Service for standard Heart Rate Profile (0x180D).
 * Reads genuine live biometric BPM from supported fitness straps/watches.
 */

export interface BluetoothDevice {
  name?: string;
  id: string;
  gatt?: BluetoothRemoteGATTServer;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
}

export interface BluetoothRemoteGATTServer {
  connected: boolean;
  device: BluetoothDevice;
  connect(): Promise<BluetoothRemoteGATTServer>;
  disconnect(): void;
  getPrimaryService(service: string): Promise<BluetoothRemoteGATTService>;
}

export interface BluetoothRemoteGATTService {
  getCharacteristic(characteristic: string): Promise<BluetoothRemoteGATTCharacteristic>;
}

export interface BluetoothRemoteGATTCharacteristic {
  value?: DataView;
  startNotifications(): Promise<BluetoothRemoteGATTCharacteristic>;
  stopNotifications(): Promise<BluetoothRemoteGATTCharacteristic>;
  addEventListener(type: string, listener: (event: Event) => void): void;
}

export interface BleHeartRateConnection {
  device: BluetoothDevice;
  server: BluetoothRemoteGATTServer;
  disconnect: () => void;
}

export function isWebBluetoothSupported(): boolean {
  return typeof navigator !== 'undefined' && 'bluetooth' in (navigator as any);
}

export async function connectBleHeartRate(
  onHeartRate: (bpm: number) => void,
  onDisconnect?: () => void
): Promise<BleHeartRateConnection> {
  if (!isWebBluetoothSupported()) {
    throw new Error('Web Bluetooth is not supported on this browser or platform (Chrome / Edge on desktop/Android recommended).');
  }

  const nav = navigator as any;

  // Standard Bluetooth SIG UUIDs
  const HEART_RATE_SERVICE_UUID = 'heart_rate';
  const HEART_RATE_MEASUREMENT_UUID = 'heart_rate_measurement';

  // Request device
  const device: BluetoothDevice = await nav.bluetooth.requestDevice({
    filters: [{ services: [HEART_RATE_SERVICE_UUID] }],
    optionalServices: [HEART_RATE_SERVICE_UUID]
  });

  if (!device.gatt) {
    throw new Error('Selected Bluetooth device does not provide a GATT server.');
  }

  device.addEventListener('gattserverdisconnected', () => {
    if (onDisconnect) onDisconnect();
  });

  const server = await device.gatt.connect();
  const service = await server.getPrimaryService(HEART_RATE_SERVICE_UUID);
  const characteristic = await service.getCharacteristic(HEART_RATE_MEASUREMENT_UUID);

  await characteristic.startNotifications();

  characteristic.addEventListener('characteristicvaluechanged', (event: Event) => {
    const char = event.target as unknown as BluetoothRemoteGATTCharacteristic;
    const value = char?.value;
    if (!value) return;

    // Bluetooth SIG GATT specification for Heart Rate Measurement (0x2A37):
    // Flags byte is at offset 0. Bit 0 indicates format:
    // 0: Heart Rate Value Format is UINT8 (1 byte at offset 1)
    // 1: Heart Rate Value Format is UINT16 (2 bytes at offset 1)
    const flags = value.getUint8(0);
    const is16Bit = (flags & 0x01) !== 0;
    let bpm = 0;

    if (is16Bit) {
      bpm = value.getUint16(1, true); // Little-endian
    } else {
      bpm = value.getUint8(1);
    }

    if (bpm > 30 && bpm < 240) {
      onHeartRate(bpm);
    }
  });

  return {
    device,
    server,
    disconnect: () => {
      if (device.gatt?.connected) {
        device.gatt.disconnect();
      }
    }
  };
}
