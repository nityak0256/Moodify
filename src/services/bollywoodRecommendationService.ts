/**
 * Bollywood Music Recommendation Service for MOODIFY
 *
 * Privacy Guarantee:
 * This service receives strictly the calculated mood string identifier (e.g. 'happy', 'calm').
 * It NEVER receives camera frames, facial landmarks, biometric tensors, or face embeddings.
 *
 * All recommended songs are real, officially released Bollywood and Hindi cinema tracks.
 */

export interface BollywoodSong {
  id: string;
  title: string;
  artist: string;
  movie: string;
  year?: number;
  moodTag: string;
  genre: string;
  youtubeUrl: string;
  spotifyUrl: string;
  jiosaavnUrl: string;
}

export interface BollywoodMoodPackage {
  moodId: string;
  moodLabel: string;
  emoji: string;
  explanation: string;
  songs: BollywoodSong[];
  totalAvailable: number;
  pageIndex: number;
}

const BOLLYWOOD_CATALOG: Record<string, {
  label: string;
  emoji: string;
  explanation: string;
  songs: BollywoodSong[];
}> = {
  happy: {
    label: 'Happy',
    emoji: '😂',
    explanation: "Your vibe is already giving main-character energy, so here's a Bollywood soundtrack to match it 🎧✨",
    songs: [
      {
        id: 'h-1',
        title: 'Ilahi',
        artist: 'Arijit Singh',
        movie: 'Yeh Jawaani Hai Deewani',
        year: 2013,
        moodTag: 'Carefree & Euphoric',
        genre: 'Acoustic Pop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Ilahi+Arijit+Singh+Yeh+Jawaani+Hai+Deewani',
        spotifyUrl: 'https://open.spotify.com/search/Ilahi%20Arijit%20Singh',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Ilahi%20Arijit%20Singh'
      },
      {
        id: 'h-2',
        title: 'Badtameez Dil',
        artist: 'Benny Dayal, Shefali Alvares',
        movie: 'Yeh Jawaani Hai Deewani',
        year: 2013,
        moodTag: 'Celebratory Dance',
        genre: 'Bollywood Brass Pop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Badtameez+Dil+Benny+Dayal',
        spotifyUrl: 'https://open.spotify.com/search/Badtameez%20Dil%20Benny%20Dayal',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Badtameez%20Dil'
      },
      {
        id: 'h-3',
        title: 'Gallan Goodiyaan',
        artist: 'Yashita Sharma, Manish Kumar Tipu, Farhan Akhtar, Shankar Mahadevan, Sukhwinder Singh',
        movie: 'Dil Dhadakne Do',
        year: 2015,
        moodTag: 'High Energy Family Jam',
        genre: 'Punjabi Pop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Gallan+Goodiyaan+Dil+Dhadakne+Do',
        spotifyUrl: 'https://open.spotify.com/search/Gallan%20Goodiyaan',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Gallan%20Goodiyaan'
      },
      {
        id: 'h-4',
        title: 'What Jhumka?',
        artist: 'Arijit Singh, Jonita Gandhi, Pritam',
        movie: 'Rocky Aur Rani Kii Prem Kahaani',
        year: 2023,
        moodTag: 'Catchy & Playful',
        genre: 'Modern Desi Pop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=What+Jhumka+Arijit+Singh+Jonita+Gandhi',
        spotifyUrl: 'https://open.spotify.com/search/What%20Jhumka',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/What%20Jhumka'
      },
      {
        id: 'h-5',
        title: 'Aankh Marey',
        artist: 'Neha Kakkar, Mika Singh, Kumar Sanu, Tanishk Bagchi',
        movie: 'Simmba',
        year: 2018,
        moodTag: 'Party Anthemic',
        genre: 'Club Dance',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Aankh+Marey+Neha+Kakkar+Mika+Singh+Simmba',
        spotifyUrl: 'https://open.spotify.com/search/Aankh%20Marey%20Simmba',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Aankh%20Marey'
      },
      {
        id: 'h-6',
        title: 'Senorita',
        artist: 'Farhan Akhtar, Hrithik Roshan, Abhay Deol, Maria del Mar Fernández',
        movie: 'Zindagi Na Milegi Dobara',
        year: 2011,
        moodTag: 'Flamenco Fiesta',
        genre: 'Latin Bollywood Fusion',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Senorita+Zindagi+Na+Milegi+Dobara',
        spotifyUrl: 'https://open.spotify.com/search/Senorita%20Zindagi%20Na%20Milegi%20Dobara',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Senorita'
      },
      {
        id: 'h-7',
        title: 'Subha Hone Na De',
        artist: 'Mika Singh, Shefali Alvares',
        movie: 'Desi Boyz',
        year: 2011,
        moodTag: 'Late Night Euphoria',
        genre: 'Club Pop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Subha+Hone+Na+De+Mika+Singh',
        spotifyUrl: 'https://open.spotify.com/search/Subha%20Hone%20Na%20De',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Subha%20Hone%20Na%20De'
      }
    ]
  },

  calm: {
    label: 'Calm',
    emoji: '😌',
    explanation: "Let's keep the peaceful vibe going 🌿🎧",
    songs: [
      {
        id: 'c-1',
        title: 'Iktara',
        artist: 'Kavita Seth, Amitabh Bhattacharya',
        movie: 'Wake Up Sid',
        year: 2009,
        moodTag: 'Serene Acoustic Soul',
        genre: 'Sufi Folk Pop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Iktara+Kavita+Seth+Wake+Up+Sid',
        spotifyUrl: 'https://open.spotify.com/search/Iktara%20Kavita%20Seth',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Iktara'
      },
      {
        id: 'c-2',
        title: 'Shaam',
        artist: 'Amit Trivedi, Neuman Pinto, Nikhil D\'Souza',
        movie: 'Aisha',
        year: 2010,
        moodTag: 'Golden Sunset Acoustic',
        genre: 'Indie Bollywood Pop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Shaam+Amit+Trivedi+Aisha',
        spotifyUrl: 'https://open.spotify.com/search/Shaam%20Aisha%20Amit%20Trivedi',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Shaam%20Aisha'
      },
      {
        id: 'c-3',
        title: 'Kho Gaye Hum Kahan',
        artist: 'Jasleen Royal, Prateek Kuhad',
        movie: 'Baar Baar Dekho',
        year: 2016,
        moodTag: 'Dreamy & Gentle',
        genre: 'Acoustic Indie',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Kho+Gaye+Hum+Kahan+Jasleen+Royal+Prateek+Kuhad',
        spotifyUrl: 'https://open.spotify.com/search/Kho%20Gaye%20Hum%20Kahan',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Kho%20Gaye%20Hum%20Kahan'
      },
      {
        id: 'c-4',
        title: 'Aaj Jaane Ki Zid Na Karo',
        artist: 'Farida Khanum / Shilpa Rao',
        movie: 'Ae Dil Hai Mushkil / Coke Studio',
        year: 2016,
        moodTag: 'Timeless Classical Ghazal',
        genre: 'Ghazal / Contemporary',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Aaj+Jaane+Ki+Zid+Na+Karo+Shilpa+Rao',
        spotifyUrl: 'https://open.spotify.com/search/Aaj%20Jaane%20Ki%20Zid%20Na%20Karo',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Aaj%20Jaane%20Ki%20Zid%20Na%20Karo'
      },
      {
        id: 'c-5',
        title: 'Phir Le Aaya Dil',
        artist: 'Arijit Singh, Pritam',
        movie: 'Barfi!',
        year: 2012,
        moodTag: 'Subtle & Poetic',
        genre: 'Semi-Classical Ghazal',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Phir+Le+Aaya+Dil+Arijit+Singh+Barfi',
        spotifyUrl: 'https://open.spotify.com/search/Phir%20Le%20Aaya%20Dil%20Arijit%20Singh',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Phir%20Le%20Aaya%20Dil'
      },
      {
        id: 'c-6',
        title: 'Tum Se Hi',
        artist: 'Mohit Chauhan, Pritam',
        movie: 'Jab We Met',
        year: 2007,
        moodTag: 'Peaceful Rain Melody',
        genre: 'Romantic Soft Rock',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Tum+Se+Hi+Mohit+Chauhan+Jab+We+Met',
        spotifyUrl: 'https://open.spotify.com/search/Tum%20Se%20Hi%20Jab%20We%20Met',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Tum%20Se%20Hi'
      },
      {
        id: 'c-7',
        title: 'Der Lagi Lekin',
        artist: 'Shankar Mahadevan',
        movie: 'Zindagi Na Milegi Dobara',
        year: 2011,
        moodTag: 'Deep Introspective Peace',
        genre: 'Acoustic Ballad',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Der+Lagi+Lekin+Shankar+Mahadevan',
        spotifyUrl: 'https://open.spotify.com/search/Der%20Lagi%20Lekin',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Der%20Lagi%20Lekin'
      }
    ]
  },

  sad: {
    label: 'Sad',
    emoji: '😢',
    explanation: "Here's a softer Bollywood selection that matches the vibe and may help you relax 🫂🎧",
    songs: [
      {
        id: 's-1',
        title: 'Channa Mereya',
        artist: 'Arijit Singh, Pritam',
        movie: 'Ae Dil Hai Mushkil',
        year: 2016,
        moodTag: 'Cathartic & Comforting',
        genre: 'Sufi Ballad',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Channa+Mereya+Arijit+Singh',
        spotifyUrl: 'https://open.spotify.com/search/Channa%20Mereya%20Arijit%20Singh',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Channa%20Mereya'
      },
      {
        id: 's-2',
        title: 'Agar Tum Saath Ho',
        artist: 'Alka Yagnik, Arijit Singh, A.R. Rahman',
        movie: 'Tamasha',
        year: 2015,
        moodTag: 'Intense Healing Ballad',
        genre: 'Emotional Contemporary',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Agar+Tum+Saath+Ho+Alka+Yagnik+Arijit+Singh',
        spotifyUrl: 'https://open.spotify.com/search/Agar%20Tum%20Saath%20Ho',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Agar%20Tum%20Saath%20Ho'
      },
      {
        id: 's-3',
        title: 'Phir Le Aya Dil',
        artist: 'Arijit Singh, Pritam',
        movie: 'Barfi!',
        year: 2012,
        moodTag: 'Nostalgic Solace',
        genre: 'Ghazal Ballad',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Phir+Le+Aya+Dil+Reprise+Arijit+Singh',
        spotifyUrl: 'https://open.spotify.com/search/Phir%20Le%20Aya%20Dil%20Barfi',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Phir%20Le%20Aya%20Dil'
      },
      {
        id: 's-4',
        title: 'Hamari Adhuri Kahani',
        artist: 'Arijit Singh, Jeet Gannguli',
        movie: 'Hamari Adhuri Kahani',
        year: 2015,
        moodTag: 'Deep Melancholy Release',
        genre: 'Soulful Ballad',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Hamari+Adhuri+Kahani+Arijit+Singh',
        spotifyUrl: 'https://open.spotify.com/search/Hamari%20Adhuri%20Kahani%20Arijit%20Singh',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Hamari%20Adhuri%20Kahani'
      },
      {
        id: 's-5',
        title: 'Tadap Tadap',
        artist: 'KK, Ismail Darbar',
        movie: 'Hum Dil De Chuke Sanam',
        year: 1999,
        moodTag: 'Expressive Heartfelt Cry',
        genre: 'Classical Dramatic',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Tadap+Tadap+KK+Hum+Dil+De+Chuke+Sanam',
        spotifyUrl: 'https://open.spotify.com/search/Tadap%20Tadap%20KK',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Tadap%20Tadap'
      },
      {
        id: 's-6',
        title: 'Kabira',
        artist: 'Tochi Raina, Rekha Bhardwaj',
        movie: 'Yeh Jawaani Hai Deewani',
        year: 2013,
        moodTag: 'Gentle Comforting Warmth',
        genre: 'Sufi Folk',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Kabira+Yeh+Jawaani+Hai+Deewani',
        spotifyUrl: 'https://open.spotify.com/search/Kabira%20Yeh%20Jawaani%20Hai%20Deewani',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Kabira'
      },
      {
        id: 's-7',
        title: 'Kal Ho Naa Ho (Heartbeat)',
        artist: 'Sonu Nigam, Shankar-Ehsaan-Loy',
        movie: 'Kal Ho Naa Ho',
        year: 2003,
        moodTag: 'Inspiring Hope Through Sorrow',
        genre: 'Orchestral Ballad',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Kal+Ho+Naa+Ho+Sonu+Nigam+Title+Track',
        spotifyUrl: 'https://open.spotify.com/search/Kal%20Ho%20Naa%20Ho%20Sonu%20Nigam',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Kal%20Ho%20Naa%20Ho'
      }
    ]
  },

  angry: {
    label: 'Angry',
    emoji: '😠',
    explanation: 'Power through that intense energy with high-octane Bollywood anthems ⚡🔥',
    songs: [
      {
        id: 'a-1',
        title: 'Zinda',
        artist: 'Siddharth Mahadevan, Shankar-Ehsaan-Loy',
        movie: 'Bhaag Milkha Bhaag',
        year: 2013,
        moodTag: 'Raw Adrenaline & Fire',
        genre: 'Hard Rock Bollywood',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Zinda+Siddharth+Mahadevan+Bhaag+Milkha+Bhaag',
        spotifyUrl: 'https://open.spotify.com/search/Zinda%20Bhaag%20Milkha%20Bhaag',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Zinda'
      },
      {
        id: 'a-2',
        title: 'Sultan',
        artist: 'Sukhwinder Singh, Shadab Faridi',
        movie: 'Sultan',
        year: 2016,
        moodTag: 'Unstoppable Fighter Spirit',
        genre: 'Epic Battle Anthem',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Sultan+Title+Track+Sukhwinder+Singh',
        spotifyUrl: 'https://open.spotify.com/search/Sultan%20Title%20Track%20Sukhwinder%20Singh',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Sultan%20Title%20Track'
      },
      {
        id: 'a-3',
        title: 'Malhari',
        artist: 'Vishal Dadlani, Sanjay Leela Bhansali',
        movie: 'Bajirao Mastani',
        year: 2015,
        moodTag: 'Roaring Victory Drums',
        genre: 'Historic War Dance',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Malhari+Vishal+Dadlani+Bajirao+Mastani',
        spotifyUrl: 'https://open.spotify.com/search/Malhari%20Bajirao%20Mastani',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Malhari'
      },
      {
        id: 'a-4',
        title: 'Apna Time Aayega',
        artist: 'Ranveer Singh, DIVINE',
        movie: 'Gully Boy',
        year: 2019,
        moodTag: 'Fierce Hunger & Grit',
        genre: 'Desi Hip-Hop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Apna+Time+Aayega+Ranveer+Singh+Gully+Boy',
        spotifyUrl: 'https://open.spotify.com/search/Apna%20Time%20Aayega',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Apna%20Time%20Aayega'
      },
      {
        id: 'a-5',
        title: 'Kar Har Maidaan Fateh',
        artist: 'Sukhwinder Singh, Shreya Ghoshal',
        movie: 'Sanju',
        year: 2018,
        moodTag: 'Overcoming The Storm',
        genre: 'Inspirational Power Anthem',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Kar+Har+Maidaan+Fateh+Sukhwinder+Singh+Shreya+Ghoshal',
        spotifyUrl: 'https://open.spotify.com/search/Kar%20Har%20Maidaan%20Fateh',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Kar%20Har%20Maidaan%20Fateh'
      },
      {
        id: 'a-6',
        title: 'Aarambh Hai Prachand',
        artist: 'Piyush Mishra',
        movie: 'Gulaal',
        year: 2009,
        moodTag: 'Ferocious Determination',
        genre: 'Poetic War Cry',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Aarambh+Hai+Prachand+Piyush+Mishra',
        spotifyUrl: 'https://open.spotify.com/search/Aarambh%20Hai%20Prachand',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Aarambh%20Hai%20Prachand'
      }
    ]
  },

  anxious: {
    label: 'Anxious',
    emoji: '😰',
    explanation: 'Take a deep breath — these soothing Bollywood melodies are here to ground you 🌿🧘',
    songs: [
      {
        id: 'anx-1',
        title: 'Love You Zindagi',
        artist: 'Amit Trivedi, Jasleen Royal',
        movie: 'Dear Zindagi',
        year: 2016,
        moodTag: 'Warm Breath of Fresh Air',
        genre: 'Uplifting Acoustic',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Love+You+Zindagi+Jasleen+Royal+Dear+Zindagi',
        spotifyUrl: 'https://open.spotify.com/search/Love%20You%20Zindagi',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Love%20You%20Zindagi'
      },
      {
        id: 'anx-2',
        title: 'Safarnama',
        artist: 'Lucky Ali, A.R. Rahman',
        movie: 'Tamasha',
        year: 2015,
        moodTag: 'Gentle Grounding Journey',
        genre: 'Philosophical Soft Folk',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Safarnama+Lucky+Ali+Tamasha',
        spotifyUrl: 'https://open.spotify.com/search/Safarnama%20Lucky%20Ali',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Safarnama'
      },
      {
        id: 'anx-3',
        title: 'Aao Milo Chalo',
        artist: 'Shaan, Ustad Sultan Khan, Pritam',
        movie: 'Jab We Met',
        year: 2007,
        moodTag: 'Road Trip Serenity',
        genre: 'Breeze Pop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Aao+Milo+Chalo+Shaan+Jab+We+Met',
        spotifyUrl: 'https://open.spotify.com/search/Aao%20Milo%20Chalo%20Jab%20We%20Met',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Aao%20Milo%20Chalo'
      },
      {
        id: 'anx-4',
        title: 'Khaabon Ke Parinday',
        artist: 'Alyssa Mendonsa, Mohit Chauhan',
        movie: 'Zindagi Na Milegi Dobara',
        year: 2011,
        moodTag: 'Weightless Release',
        genre: 'Bossa Nova Bollywood',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Khaabon+Ke+Parinday+Zindagi+Na+Milegi+Dobara',
        spotifyUrl: 'https://open.spotify.com/search/Khaabon%20Ke%20Parinday',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Khaabon%20Ke%20Parinday'
      },
      {
        id: 'anx-5',
        title: 'Yun Hi Chala Chal',
        artist: 'Udit Narayan, Hariharan, Kailash Kher, A.R. Rahman',
        movie: 'Swades',
        year: 2004,
        moodTag: 'Steady Reassuring Stride',
        genre: 'Acoustic Travel Anthem',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Yun+Hi+Chala+Chal+Swades',
        spotifyUrl: 'https://open.spotify.com/search/Yun%20Hi%20Chala%20Chal%20Swades',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Yun%20Hi%20Chala%20Chal'
      },
      {
        id: 'anx-6',
        title: 'Roobaroo',
        artist: 'A.R. Rahman, Naresh Iyer',
        movie: 'Rang De Basanti',
        year: 2006,
        moodTag: 'Light Dissolving Shadows',
        genre: 'Uplifting Acoustic',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Roobaroo+Rang+De+Basanti',
        spotifyUrl: 'https://open.spotify.com/search/Roobaroo%20Rang%20De%20Basanti',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Roobaroo'
      }
    ]
  },

  tired: {
    label: 'Tired',
    emoji: '😴',
    explanation: 'Mellow acoustic Hindi tracks to help you unwind and recharge 💤✨',
    songs: [
      {
        id: 't-1',
        title: 'Iktara',
        artist: 'Kavita Seth',
        movie: 'Wake Up Sid',
        year: 2009,
        moodTag: 'Quiet Unwinding',
        genre: 'Acoustic Sufi',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Iktara+Wake+Up+Sid',
        spotifyUrl: 'https://open.spotify.com/search/Iktara%20Wake%20Up%20Sid',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Iktara'
      },
      {
        id: 't-2',
        title: 'Khaabon Ke Parinday',
        artist: 'Alyssa Mendonsa, Mohit Chauhan',
        movie: 'Zindagi Na Milegi Dobara',
        year: 2011,
        moodTag: 'Float Into Slumber',
        genre: 'Gentle Acoustic',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Khaabon+Ke+Parinday+Zindagi+Na+Milegi+Dobara',
        spotifyUrl: 'https://open.spotify.com/search/Khaabon%20Ke%20Parinday',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Khaabon%20Ke%20Parinday'
      },
      {
        id: 't-3',
        title: 'Shaam',
        artist: 'Amit Trivedi, Neuman Pinto, Nikhil D\'Souza',
        movie: 'Aisha',
        year: 2010,
        moodTag: 'Dusk Wind Down',
        genre: 'Acoustic Lounge',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Shaam+Amit+Trivedi+Aisha',
        spotifyUrl: 'https://open.spotify.com/search/Shaam%20Aisha',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Shaam%20Aisha'
      },
      {
        id: 't-4',
        title: 'Saibo',
        artist: 'Shreya Ghoshal, Tochi Raina, Sachin-Jigar',
        movie: 'Shor in the City',
        year: 2011,
        moodTag: 'Tender Heartbeat Rest',
        genre: 'Romantic Folk Ballad',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Saibo+Shreya+Ghoshal+Tochi+Raina',
        spotifyUrl: 'https://open.spotify.com/search/Saibo%20Shor%20in%20the%20City',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Saibo'
      },
      {
        id: 't-5',
        title: 'Tu Bin Bataye',
        artist: 'Madhushree, Naresh Iyer, A.R. Rahman',
        movie: 'Rang De Basanti',
        year: 2006,
        moodTag: 'Velvet Soft Warmth',
        genre: 'Lullaby Pop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Tu+Bin+Bataye+Rang+De+Basanti',
        spotifyUrl: 'https://open.spotify.com/search/Tu%20Bin%20Bataye',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Tu%20Bin%20Bataye'
      },
      {
        id: 't-6',
        title: 'Kun Faya Kun',
        artist: 'A.R. Rahman, Javed Ali, Mohit Chauhan',
        movie: 'Rockstar',
        year: 2011,
        moodTag: 'Spiritual Deep Rest',
        genre: 'Sufi Qawwali Ambient',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Kun+Faya+Kun+A.R.+Rahman+Rockstar',
        spotifyUrl: 'https://open.spotify.com/search/Kun%20Faya%20Kun',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Kun%20Faya%20Kun'
      }
    ]
  },

  excited: {
    label: 'Excited',
    emoji: '🤪',
    explanation: 'Time to turn that energy into a full Bollywood playlist 🔥',
    songs: [
      {
        id: 'ex-1',
        title: 'Ghungroo',
        artist: 'Arijit Singh, Shilpa Rao, Vishal-Shekhar',
        movie: 'War',
        year: 2019,
        moodTag: 'Sleek Disco Funk',
        genre: 'Groove Dance',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Ghungroo+Song+War+Arijit+Singh+Shilpa+Rao',
        spotifyUrl: 'https://open.spotify.com/search/Ghungroo%20War',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Ghungroo'
      },
      {
        id: 'ex-2',
        title: 'Jai Jai Shivshankar',
        artist: 'Vishal Dadlani, Benny Dayal',
        movie: 'War',
        year: 2019,
        moodTag: 'Explosive Dance Battle',
        genre: 'Electrifying Festival Pop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Jai+Jai+Shivshankar+War+Hrithik+Tiger',
        spotifyUrl: 'https://open.spotify.com/search/Jai%20Jai%20Shivshankar',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Jai%20Jai%20Shivshankar'
      },
      {
        id: 'ex-3',
        title: 'Malhari',
        artist: 'Vishal Dadlani',
        movie: 'Bajirao Mastani',
        year: 2015,
        moodTag: 'Wild Tribal Energy',
        genre: 'Folk Victory Dance',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Malhari+Bajirao+Mastani',
        spotifyUrl: 'https://open.spotify.com/search/Malhari',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Malhari'
      },
      {
        id: 'ex-4',
        title: 'Kala Chashma',
        artist: 'Amar Arshi, Badshah, Neha Kakkar',
        movie: 'Baar Baar Dekho',
        year: 2016,
        moodTag: 'Global Viral Banger',
        genre: 'Punjabi Club Dance',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Kala+Chashma+Baar+Baar+Dekho',
        spotifyUrl: 'https://open.spotify.com/search/Kala%20Chashma',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Kala%20Chashma'
      },
      {
        id: 'ex-5',
        title: 'Gallan Goodiyaan',
        artist: 'Farhan Akhtar, Shankar Mahadevan, Sukhwinder Singh',
        movie: 'Dil Dhadakne Do',
        year: 2015,
        moodTag: 'Unstoppable Group Dance',
        genre: 'High Tempo Jam',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Gallan+Goodiyaan+Dil+Dhadakne+Do',
        spotifyUrl: 'https://open.spotify.com/search/Gallan%20Goodiyaan',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Gallan%20Goodiyaan'
      },
      {
        id: 'ex-6',
        title: 'Kar Gayi Chull',
        artist: 'Badshah, Fazilpuria, Neha Kakkar, Sukriti Kakar',
        movie: 'Kapoor & Sons',
        year: 2016,
        moodTag: 'House Party Ignition',
        genre: 'Party Hip-Hop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Kar+Gayi+Chull+Kapoor+and+Sons',
        spotifyUrl: 'https://open.spotify.com/search/Kar%20Gayi%20Chull',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Kar%20Gayi%20Chull'
      }
    ]
  },

  motivated: {
    label: 'Motivated',
    emoji: '🤩',
    explanation: 'High-octane Bollywood firepower to fuel your hustle and momentum 🚀🔥',
    songs: [
      {
        id: 'm-1',
        title: 'Apna Time Aayega',
        artist: 'Ranveer Singh, DIVINE',
        movie: 'Gully Boy',
        year: 2019,
        moodTag: 'Relentless Drive',
        genre: 'Desi Street Rap',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Apna+Time+Aayega+Ranveer+Singh+Gully+Boy',
        spotifyUrl: 'https://open.spotify.com/search/Apna%20Time%20Aayega',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Apna%20Time%20Aayega'
      },
      {
        id: 'm-2',
        title: 'Zinda',
        artist: 'Siddharth Mahadevan',
        movie: 'Bhaag Milkha Bhaag',
        year: 2013,
        moodTag: 'Breaking Every Barrier',
        genre: 'Rock Anthem',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Zinda+Bhaag+Milkha+Bhaag',
        spotifyUrl: 'https://open.spotify.com/search/Zinda%20Bhaag%20Milkha%20Bhaag',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Zinda'
      },
      {
        id: 'm-3',
        title: 'Kar Har Maidaan Fateh',
        artist: 'Sukhwinder Singh, Shreya Ghoshal',
        movie: 'Sanju',
        year: 2018,
        moodTag: 'Rise Above All Odds',
        genre: 'Inspiring Ballad',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Kar+Har+Maidaan+Fateh+Sanju',
        spotifyUrl: 'https://open.spotify.com/search/Kar%20Har%20Maidaan%20Fateh',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Kar%20Har%20Maidaan%20Fateh'
      },
      {
        id: 'm-4',
        title: 'Sultan',
        artist: 'Sukhwinder Singh',
        movie: 'Sultan',
        year: 2016,
        moodTag: 'Champion Mindset',
        genre: 'Battle Anthem',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Sultan+Title+Track+Sukhwinder+Singh',
        spotifyUrl: 'https://open.spotify.com/search/Sultan%20Title%20Track',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Sultan%20Title%20Track'
      },
      {
        id: 'm-5',
        title: 'Lakshya',
        artist: 'Shankar Mahadevan, Shankar-Ehsaan-Loy',
        movie: 'Lakshya',
        year: 2004,
        moodTag: 'Laser Focus & Purpose',
        genre: 'Progressive Rock',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Lakshya+Title+Track+Shankar+Mahadevan',
        spotifyUrl: 'https://open.spotify.com/search/Lakshya%20Title%20Track',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Lakshya%20Title%20Track'
      },
      {
        id: 'm-6',
        title: 'Chak Lein De',
        artist: 'Kailash Kher',
        movie: 'Chandni Chowk to China',
        year: 2009,
        moodTag: 'Fearless Comeback',
        genre: 'High Voltage Rock',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Chak+Lein+De+Kailash+Kher',
        spotifyUrl: 'https://open.spotify.com/search/Chak%20Lein%20De%20Kailash%20Kher',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Chak%20Lein%20De'
      }
    ]
  },

  bored: {
    label: 'Bored',
    emoji: '🥱',
    explanation: 'Boredom busters incoming! High-tempo Bollywood beats to get you hooked 💃🎉',
    songs: [
      {
        id: 'b-1',
        title: 'Kar Gayi Chull',
        artist: 'Badshah, Fazilpuria, Neha Kakkar, Sukriti Kakar',
        movie: 'Kapoor & Sons',
        year: 2016,
        moodTag: 'Instant Mood Shift',
        genre: 'Desi Rap Dance',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Kar+Gayi+Chull+Kapoor+and+Sons',
        spotifyUrl: 'https://open.spotify.com/search/Kar%20Gayi%20Chull',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Kar%20Gayi%20Chull'
      },
      {
        id: 'b-2',
        title: 'What Jhumka?',
        artist: 'Arijit Singh, Jonita Gandhi',
        movie: 'Rocky Aur Rani Kii Prem Kahaani',
        year: 2023,
        moodTag: 'Earworm Hook',
        genre: 'Commercial Pop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=What+Jhumka+Rocky+Aur+Rani',
        spotifyUrl: 'https://open.spotify.com/search/What%20Jhumka',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/What%20Jhumka'
      },
      {
        id: 'b-3',
        title: 'Aankh Marey',
        artist: 'Neha Kakkar, Mika Singh, Kumar Sanu',
        movie: 'Simmba',
        year: 2018,
        moodTag: 'Pure Fun Nostalgia',
        genre: 'Remix Dance',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Aankh+Marey+Simmba',
        spotifyUrl: 'https://open.spotify.com/search/Aankh%20Marey',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Aankh%20Marey'
      },
      {
        id: 'b-4',
        title: 'The Breakup Song',
        artist: 'Arijit Singh, Badshah, Jonita Gandhi, Nakash Aziz',
        movie: 'Ae Dil Hai Mushkil',
        year: 2016,
        moodTag: 'Playful Upbeat Vibe',
        genre: 'Club Dance',
        youtubeUrl: 'https://www.youtube.com/results?search_query=The+Breakup+Song+Ae+Dil+Hai+Mushkil',
        spotifyUrl: 'https://open.spotify.com/search/The%20Breakup%20Song',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/The%20Breakup%20Song'
      },
      {
        id: 'b-5',
        title: 'Balam Pichkari',
        artist: 'Vishal Dadlani, Shalmali Kholgade',
        movie: 'Yeh Jawaani Hai Deewani',
        year: 2013,
        moodTag: 'Electric Festive Burst',
        genre: 'Folk Pop Dance',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Balam+Pichkari+Yeh+Jawaani+Hai+Deewani',
        spotifyUrl: 'https://open.spotify.com/search/Balam%20Pichkari',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Balam%20Pichkari'
      },
      {
        id: 'b-6',
        title: 'Matargashti',
        artist: 'Mohit Chauhan, A.R. Rahman',
        movie: 'Tamasha',
        year: 2015,
        moodTag: 'Carefree Strolling',
        genre: 'French Accordion Desi Pop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Matargashti+Mohit+Chauhan+Tamasha',
        spotifyUrl: 'https://open.spotify.com/search/Matargashti',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Matargashti'
      }
    ]
  },

  lonely: {
    label: 'Lonely',
    emoji: '😔',
    explanation: "Warm, comforting tunes to keep you company and remind you you're not alone 🫶🎶",
    songs: [
      {
        id: 'l-1',
        title: 'Love You Zindagi',
        artist: 'Jasleen Royal, Amit Trivedi',
        movie: 'Dear Zindagi',
        year: 2016,
        moodTag: 'Warm Hug Melodies',
        genre: 'Gentle Acoustic',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Love+You+Zindagi+Dear+Zindagi',
        spotifyUrl: 'https://open.spotify.com/search/Love%20You%20Zindagi',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Love%20You%20Zindagi'
      },
      {
        id: 'l-2',
        title: 'Kabira',
        artist: 'Tochi Raina, Rekha Bhardwaj',
        movie: 'Yeh Jawaani Hai Deewani',
        year: 2013,
        moodTag: 'Soothing Companionship',
        genre: 'Sufi Folk',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Kabira+Yeh+Jawaani+Hai+Deewani',
        spotifyUrl: 'https://open.spotify.com/search/Kabira',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Kabira'
      },
      {
        id: 'l-3',
        title: 'Safarnama',
        artist: 'Lucky Ali, A.R. Rahman',
        movie: 'Tamasha',
        year: 2015,
        moodTag: 'Self-Discovery Journey',
        genre: 'Acoustic Solitude',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Safarnama+Lucky+Ali+Tamasha',
        spotifyUrl: 'https://open.spotify.com/search/Safarnama',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Safarnama'
      },
      {
        id: 'l-4',
        title: 'Ilahi',
        artist: 'Arijit Singh',
        movie: 'Yeh Jawaani Hai Deewani',
        year: 2013,
        moodTag: 'Solo Traveler Freedom',
        genre: 'Uplifting Acoustic',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Ilahi+Arijit+Singh',
        spotifyUrl: 'https://open.spotify.com/search/Ilahi',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Ilahi'
      },
      {
        id: 'l-5',
        title: 'Yun Hi Chala Chal',
        artist: 'Udit Narayan, Hariharan, Kailash Kher',
        movie: 'Swades',
        year: 2004,
        moodTag: 'Friendship on the Road',
        genre: 'Heartwarming Folk',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Yun+Hi+Chala+Chal+Swades',
        spotifyUrl: 'https://open.spotify.com/search/Yun%20Hi%20Chala%20Chal',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Yun%20Hi%20Chala%20Chal'
      },
      {
        id: 'l-6',
        title: 'Kholo Kholo',
        artist: 'Raman Mahadevan, Shankar-Ehsaan-Loy',
        movie: 'Taare Zameen Par',
        year: 2007,
        moodTag: 'Unconditional Encouragement',
        genre: 'Acoustic Heart Song',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Kholo+Kholo+Taare+Zameen+Par',
        spotifyUrl: 'https://open.spotify.com/search/Kholo%20Kholo%20Taare%20Zameen%20Par',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Kholo%20Kholo'
      }
    ]
  },

  overwhelmed: {
    label: 'Overwhelmed',
    emoji: '😵',
    explanation: 'Gentle, spacious soundscapes to quiet the noise and bring your peace back 🕊️🎧',
    songs: [
      {
        id: 'o-1',
        title: 'Love You Zindagi',
        artist: 'Amit Trivedi, Jasleen Royal',
        movie: 'Dear Zindagi',
        year: 2016,
        moodTag: 'Simplify Everything',
        genre: 'Mindful Pop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Love+You+Zindagi+Dear+Zindagi',
        spotifyUrl: 'https://open.spotify.com/search/Love%20You%20Zindagi',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Love%20You%20Zindagi'
      },
      {
        id: 'o-2',
        title: 'Safarnama',
        artist: 'Lucky Ali, A.R. Rahman',
        movie: 'Tamasha',
        year: 2015,
        moodTag: 'Step-by-Step Breathing',
        genre: 'Calming Acoustic',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Safarnama+Lucky+Ali',
        spotifyUrl: 'https://open.spotify.com/search/Safarnama',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Safarnama'
      },
      {
        id: 'o-3',
        title: 'Khaabon Ke Parinday',
        artist: 'Alyssa Mendonsa, Mohit Chauhan',
        movie: 'Zindagi Na Milegi Dobara',
        year: 2011,
        moodTag: 'Open Sky Tranquility',
        genre: 'Smooth Breeze Pop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Khaabon+Ke+Parinday+Zindagi+Na+Milegi+Dobara',
        spotifyUrl: 'https://open.spotify.com/search/Khaabon%20Ke%20Parinday',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Khaabon%20Ke%20Parinday'
      },
      {
        id: 'o-4',
        title: 'Aao Milo Chalo',
        artist: 'Shaan, Ustad Sultan Khan',
        movie: 'Jab We Met',
        year: 2007,
        moodTag: 'Unrushed Cadence',
        genre: 'Gentle Travel Melody',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Aao+Milo+Chalo+Jab+We+Met',
        spotifyUrl: 'https://open.spotify.com/search/Aao%20Milo%20Chalo',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Aao%20Milo%20Chalo'
      },
      {
        id: 'o-5',
        title: 'Ilahi',
        artist: 'Arijit Singh',
        movie: 'Yeh Jawaani Hai Deewani',
        year: 2013,
        moodTag: 'Letting Go of the Noise',
        genre: 'Refreshing Acoustic',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Ilahi+Arijit+Singh',
        spotifyUrl: 'https://open.spotify.com/search/Ilahi',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Ilahi'
      },
      {
        id: 'o-6',
        title: 'Kun Faya Kun',
        artist: 'A.R. Rahman, Javed Ali, Mohit Chauhan',
        movie: 'Rockstar',
        year: 2011,
        moodTag: 'Deep Inner Healing',
        genre: 'Sufi Sanctuary',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Kun+Faya+Kun+Rockstar',
        spotifyUrl: 'https://open.spotify.com/search/Kun%20Faya%20Kun',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Kun%20Faya%20Kun'
      }
    ]
  },

  confident: {
    label: 'Confident',
    emoji: '😎',
    explanation: 'Pure swagger and main-character anthems for your winning streak 😎✨',
    songs: [
      {
        id: 'cf-1',
        title: 'Apna Time Aayega',
        artist: 'Ranveer Singh, DIVINE',
        movie: 'Gully Boy',
        year: 2019,
        moodTag: 'Maximum Swagger',
        genre: 'Desi Rap',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Apna+Time+Aayega+Gully+Boy',
        spotifyUrl: 'https://open.spotify.com/search/Apna%20Time%20Aayega',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Apna%20Time%20Aayega'
      },
      {
        id: 'cf-2',
        title: 'Ghungroo',
        artist: 'Arijit Singh, Shilpa Rao',
        movie: 'War',
        year: 2019,
        moodTag: 'Effortless Charisma',
        genre: 'Smooth Dance',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Ghungroo+War',
        spotifyUrl: 'https://open.spotify.com/search/Ghungroo%20War',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Ghungroo'
      },
      {
        id: 'cf-3',
        title: 'Swag Se Swagat',
        artist: 'Vishal Dadlani, Neha Bhasin',
        movie: 'Tiger Zinda Hai',
        year: 2017,
        moodTag: 'High-Impact Entrance',
        genre: 'Electronic Desi Pop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Swag+Se+Swagat+Tiger+Zinda+Hai',
        spotifyUrl: 'https://open.spotify.com/search/Swag%20Se%20Swagat',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Swag%20Se%20Swagat'
      },
      {
        id: 'cf-4',
        title: 'Badtameez Dil',
        artist: 'Benny Dayal, Shefali Alvares',
        movie: 'Yeh Jawaani Hai Deewani',
        year: 2013,
        moodTag: 'Full Boss Energy',
        genre: 'Brass Pop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Badtameez+Dil+Benny+Dayal',
        spotifyUrl: 'https://open.spotify.com/search/Badtameez%20Dil',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Badtameez%20Dil'
      },
      {
        id: 'cf-5',
        title: 'Besharam Rang',
        artist: 'Shilpa Rao, Caralisa Monteiro, Vishal-Shekhar',
        movie: 'Pathaan',
        year: 2023,
        moodTag: 'Sultry Bold Confidence',
        genre: 'Euro Dance Pop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Besharam+Rang+Pathaan',
        spotifyUrl: 'https://open.spotify.com/search/Besharam%20Rang',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Besharam%20Rang'
      },
      {
        id: 'cf-6',
        title: 'Sher Khul Gaye',
        artist: 'Benny Dayal, Shilpa Rao, Vishal & Sheykhar',
        movie: 'Fighter',
        year: 2024,
        moodTag: 'Top-Gun High Glamour',
        genre: 'Disco Pop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Sher+Khul+Gaye+Fighter',
        spotifyUrl: 'https://open.spotify.com/search/Sher%20Khul%20Gaye',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Sher%20Khul%20Gaye'
      }
    ]
  },

  content: {
    label: 'Content',
    emoji: '🥰',
    explanation: 'Sweet, romantic and feel-good melodies celebrating your peaceful headspace 🌸✨',
    songs: [
      {
        id: 'ct-1',
        title: 'Mast Magan',
        artist: 'Arijit Singh, Chinmayi Sripada, Shankar-Ehsaan-Loy',
        movie: '2 States',
        year: 2014,
        moodTag: 'Heart Full of Gratitude',
        genre: 'Sufi Romance',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Mast+Magan+2+States',
        spotifyUrl: 'https://open.spotify.com/search/Mast%20Magan',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Mast%20Magan'
      },
      {
        id: 'ct-2',
        title: 'Iktara',
        artist: 'Kavita Seth, Tochi Raina',
        movie: 'Wake Up Sid',
        year: 2009,
        moodTag: 'Soulful Contentment',
        genre: 'Acoustic Melody',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Iktara+Wake+Up+Sid',
        spotifyUrl: 'https://open.spotify.com/search/Iktara',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Iktara'
      },
      {
        id: 'ct-3',
        title: 'Tum Se Hi',
        artist: 'Mohit Chauhan',
        movie: 'Jab We Met',
        year: 2007,
        moodTag: 'Gentle Warm Glow',
        genre: 'Soft Rock Romance',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Tum+Se+Hi+Jab+We+Met',
        spotifyUrl: 'https://open.spotify.com/search/Tum%20Se%20Hi',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Tum%20Se%20Hi'
      },
      {
        id: 'ct-4',
        title: 'Tere Bina',
        artist: 'A.R. Rahman, Chinmayi, Murtuza Khan, Qadir Khan',
        movie: 'Guru',
        year: 2007,
        moodTag: 'Timeless Devotion',
        genre: 'Qawwali Romantic',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Tere+Bina+Guru+AR+Rahman',
        spotifyUrl: 'https://open.spotify.com/search/Tere%20Bina%20Guru',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Tere%20Bina%20Guru'
      },
      {
        id: 'ct-5',
        title: 'Raabta',
        artist: 'Arijit Singh, Hamsika Iyer, Joi Barua',
        movie: 'Agent Vinod',
        year: 2012,
        moodTag: 'Serendipitous Harmony',
        genre: 'Acoustic Pop Ballad',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Raabta+Kehte+Hain+Khuda+Ne+Agent+Vinod',
        spotifyUrl: 'https://open.spotify.com/search/Raabta%20Agent%20Vinod',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Raabta'
      },
      {
        id: 'ct-6',
        title: 'Hasi Ban Gaye',
        artist: 'Shreya Ghoshal, Ami Mishra',
        movie: 'Hamari Adhuri Kahani',
        year: 2015,
        moodTag: 'Gentle Tender Smile',
        genre: 'Soulful Melody',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Hasi+Ban+Gaye+Shreya+Ghoshal',
        spotifyUrl: 'https://open.spotify.com/search/Hasi%20Ban%20Gaye',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Hasi%20Ban%20Gaye'
      }
    ]
  },

  confused: {
    label: 'Confused',
    emoji: '😶',
    explanation: 'Clarity-bringing, uplifting melodies to help you untangle and reset 🧩🎧',
    songs: [
      {
        id: 'cfz-1',
        title: 'Safarnama',
        artist: 'Lucky Ali, A.R. Rahman',
        movie: 'Tamasha',
        year: 2015,
        moodTag: 'Finding One\'s Compass',
        genre: 'Introspective Folk',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Safarnama+Lucky+Ali+Tamasha',
        spotifyUrl: 'https://open.spotify.com/search/Safarnama',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Safarnama'
      },
      {
        id: 'cfz-2',
        title: 'Khaabon Ke Parinday',
        artist: 'Alyssa Mendonsa, Mohit Chauhan',
        movie: 'Zindagi Na Milegi Dobara',
        year: 2011,
        moodTag: 'Clear The Mental Fog',
        genre: 'Acoustic Freedom',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Khaabon+Ke+Parinday+Zindagi+Na+Milegi+Dobara',
        spotifyUrl: 'https://open.spotify.com/search/Khaabon%20Ke%20Parinday',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Khaabon%20Ke%20Parinday'
      },
      {
        id: 'cfz-3',
        title: 'Aao Milo Chalo',
        artist: 'Shaan, Ustad Sultan Khan',
        movie: 'Jab We Met',
        year: 2007,
        moodTag: 'One Step At A Time',
        genre: 'Breezy Travel Pop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Aao+Milo+Chalo+Jab+We+Met',
        spotifyUrl: 'https://open.spotify.com/search/Aao%20Milo%20Chalo',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Aao%20Milo%20Chalo'
      },
      {
        id: 'cfz-4',
        title: 'Matargashti',
        artist: 'Mohit Chauhan, A.R. Rahman',
        movie: 'Tamasha',
        year: 2015,
        moodTag: 'Don\'t Take It Too Seriously',
        genre: 'Playful Desi Pop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Matargashti+Tamasha',
        spotifyUrl: 'https://open.spotify.com/search/Matargashti',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Matargashti'
      },
      {
        id: 'cfz-5',
        title: 'Give Me Some Sunshine',
        artist: 'Suraj Jagan, Sharman Joshi, Swanand Kirkire',
        movie: '3 Idiots',
        year: 2009,
        moodTag: 'Unburdening The Mind',
        genre: 'Acoustic Folk Rock',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Give+Me+Some+Sunshine+3+Idiots',
        spotifyUrl: 'https://open.spotify.com/search/Give%20Me%20Some%20Sunshine',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Give%20Me%20Some%20Sunshine'
      }
    ]
  },

  neutral: {
    label: 'Neutral',
    emoji: '😐',
    explanation: 'Smooth, easygoing Bollywood favorites perfectly tuned to your balanced vibe ☀️🎧',
    songs: [
      {
        id: 'n-1',
        title: 'Safarnama',
        artist: 'Lucky Ali, A.R. Rahman',
        movie: 'Tamasha',
        year: 2015,
        moodTag: 'Balanced & Steady',
        genre: 'Acoustic Indie Pop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Safarnama+Lucky+Ali',
        spotifyUrl: 'https://open.spotify.com/search/Safarnama',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Safarnama'
      },
      {
        id: 'n-2',
        title: 'Yun Hi Chala Chal',
        artist: 'Udit Narayan, Hariharan, Kailash Kher',
        movie: 'Swades',
        year: 2004,
        moodTag: 'Effortless Motion',
        genre: 'Travel Folk Pop',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Yun+Hi+Chala+Chal+Swades',
        spotifyUrl: 'https://open.spotify.com/search/Yun%20Hi%20Chala%20Chal',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Yun%20Hi%20Chala%20Chal'
      },
      {
        id: 'n-3',
        title: 'Hairat',
        artist: 'Lucky Ali, Vishal-Shekhar',
        movie: 'Anjaana Anjaani',
        year: 2010,
        moodTag: 'Open Highway Breeze',
        genre: 'Pop Rock',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Hairat+Lucky+Ali+Anjaana+Anjaani',
        spotifyUrl: 'https://open.spotify.com/search/Hairat%20Lucky%20Ali',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Hairat'
      },
      {
        id: 'n-4',
        title: 'Matargashti',
        artist: 'Mohit Chauhan, A.R. Rahman',
        movie: 'Tamasha',
        year: 2015,
        moodTag: 'Cheery Walk',
        genre: 'Acoustic Novelty',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Matargashti+Tamasha',
        spotifyUrl: 'https://open.spotify.com/search/Matargashti',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Matargashti'
      },
      {
        id: 'n-5',
        title: 'Kinare',
        artist: 'Mohan Kanan, Amit Trivedi',
        movie: 'Queen',
        year: 2014,
        moodTag: 'Quiet Contemplation',
        genre: 'Contemporary Acoustic',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Kinare+Queen+Amit+Trivedi',
        spotifyUrl: 'https://open.spotify.com/search/Kinare%20Queen',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Kinare'
      },
      {
        id: 'n-6',
        title: 'Dil Dhadakne Do',
        artist: 'Shankar Mahadevan, Suraj Jagan, Joi Barua',
        movie: 'Zindagi Na Milegi Dobara',
        year: 2011,
        moodTag: 'Easygoing Sunshine',
        genre: 'Acoustic Rock',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Dil+Dhadakne+Do+Title+Track+ZNMD',
        spotifyUrl: 'https://open.spotify.com/search/Dil%20Dhadakne%20Do%20ZNMD',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Dil%20Dhadakne%20Do'
      }
    ]
  },

  low_energy: {
    label: 'Low Energy',
    emoji: '😪',
    explanation: 'Gentle acoustic Hindi melodies to help you rest and regain your strength 🔋🌿',
    songs: [
      {
        id: 'le-1',
        title: 'Kun Faya Kun',
        artist: 'A.R. Rahman, Javed Ali, Mohit Chauhan',
        movie: 'Rockstar',
        year: 2011,
        moodTag: 'Healing & Recharge',
        genre: 'Sufi Sanctuary',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Kun+Faya+Kun+Rockstar',
        spotifyUrl: 'https://open.spotify.com/search/Kun%20Faya%20Kun',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Kun%20Faya%20Kun'
      },
      {
        id: 'le-2',
        title: 'Iktara',
        artist: 'Kavita Seth',
        movie: 'Wake Up Sid',
        year: 2009,
        moodTag: 'Effortless Calming',
        genre: 'Acoustic Soul',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Iktara+Wake+Up+Sid',
        spotifyUrl: 'https://open.spotify.com/search/Iktara',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Iktara'
      },
      {
        id: 'le-3',
        title: 'Saibo',
        artist: 'Shreya Ghoshal, Tochi Raina',
        movie: 'Shor in the City',
        year: 2011,
        moodTag: 'Quiet Warmth',
        genre: 'Acoustic Folk',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Saibo+Shreya+Ghoshal',
        spotifyUrl: 'https://open.spotify.com/search/Saibo',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Saibo'
      },
      {
        id: 'le-4',
        title: 'Shaam',
        artist: 'Amit Trivedi, Nikhil D\'Souza',
        movie: 'Aisha',
        year: 2010,
        moodTag: 'Restful Twilight',
        genre: 'Acoustic Lounge',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Shaam+Amit+Trivedi+Aisha',
        spotifyUrl: 'https://open.spotify.com/search/Shaam%20Aisha',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Shaam%20Aisha'
      },
      {
        id: 'le-5',
        title: 'Tu Bin Bataye',
        artist: 'Madhushree, Naresh Iyer',
        movie: 'Rang De Basanti',
        year: 2006,
        moodTag: 'Gentle Slumber',
        genre: 'Soft Lullaby',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Tu+Bin+Bataye+Rang+De+Basanti',
        spotifyUrl: 'https://open.spotify.com/search/Tu%20Bin%20Bataye',
        jiosaavnUrl: 'https://www.jiosaavn.com/search/Tu%20Bin%20Bataye'
      }
    ]
  }
};

/**
 * Pure recommendation function that accepts strictly the calculated mood identifier.
 * Zero facial data, biometric data, or camera inputs are processed here.
 * 
 * Supports pagination / cyclic rotation for the "🔄 More Songs" feature
 * without re-scanning or changing the calculated mood.
 */
export function getBollywoodRecommendations(
  moodId: string, 
  pageIndex: number = 0,
  pageSize: number = 3
): BollywoodMoodPackage {
  const normalizedKey = (moodId || 'neutral').toLowerCase().trim();
  const entry = BOLLYWOOD_CATALOG[normalizedKey] || BOLLYWOOD_CATALOG['neutral'];

  const total = entry.songs.length;
  if (total === 0) {
    return {
      moodId: normalizedKey,
      moodLabel: entry.label,
      emoji: entry.emoji,
      explanation: entry.explanation,
      songs: [],
      totalAvailable: 0,
      pageIndex: 0
    };
  }

  // Calculate circular slice for "More Songs" pagination
  const startIndex = (pageIndex * pageSize) % total;
  const sliced: BollywoodSong[] = [];

  for (let i = 0; i < pageSize; i++) {
    const idx = (startIndex + i) % total;
    sliced.push(entry.songs[idx]);
  }

  return {
    moodId: normalizedKey,
    moodLabel: entry.label,
    emoji: entry.emoji,
    explanation: entry.explanation,
    songs: sliced,
    totalAvailable: total,
    pageIndex
  };
}
