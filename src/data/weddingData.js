// Traditional Royal Luxury Wedding Configuration
// Monika Pandit (Divya) & Ritesh Ku. Pandit (Chintu) - 11 Dec 2026, Tatanagar, Jharkhand

export const weddingData = {
  couple: {
    bride: {
      fullName: "Monika Pandit",
      nickname: "Divya",
      title: "The Royal Bride",
      about: "A graceful soul filled with warmth, virtues, and endless joy, blessed by her beloved elders and siblings.",
      father: "Shri Shambhu Pandit",
      mother: "Smt. Rekha Pandit",
      family: {
        father: "Shri Shambhu Pandit",
        mother: "Smt. Rekha Pandit",
        elderBrother: "Om Prakash Pandit",
        youngerBrother: "Amandeep Pandit",
        youngerSister: "Dipika Pandit",
      },
      photo: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    },
    groom: {
      fullName: "Ritesh Ku. Pandit",
      nickname: "Chintu",
      title: "The Royal Groom",
      about: "An honorable gentleman of noble character and immense love, cherished by his family and ready for the sacred union.",
      father: "Shri Pradip Ku. Pandit",
      mother: "Smt. Sunaina Devi",
      family: {
        father: "Shri Pradip Ku. Pandit",
        mother: "Smt. Sunaina Devi",
        elderSister: "Supriya Devi",
        youngerBrother: "Ritik Kumar",
      },
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    },
  },

  // Main Wedding Ceremony Date & Time
  weddingDate: "2026-12-11T21:00:00+05:30", // 11th Dec 2026 after 9:00 PM
  weddingDateDisplay: "शुक्रवार, 11 दिसम्बर 2026 (Friday, 11th Dec 2026)",
  weddingTimeDisplay: "रात्रि 9:00 बजे से (Subh Vivah Lagna - 9:00 PM Onwards)",

  location: {
    city: "Tatanagar",
    state: "Jharkhand",
    venueName: "Royal Heritage Palace & Banquets",
    address: "Circuit House Area / Bistupur, Tatanagar (Jamshedpur), Jharkhand - 831001",
    googleMapsUrl: "https://maps.google.com/?q=Tatanagar,+Jamshedpur,+Jharkhand",
    embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117711.9547517112!2d86.1158223!3d22.8045665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e31989f0e2b5%3A0xeeec8e81ce9b344f!2sJamshedpur%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    nearestStation: "Tatanagar Junction Railway Station (TATA) - 4 km",
    nearestAirport: "Birsa Munda Airport, Ranchi (IXR) - ~130 km",
    helplinePhone: "+91 98765 43210",
  },

  // Event schedule with royal traditional styling
  events: [
    {
      id: "haldi-mehendi",
      name: "शुभ हल्दी एवं मेहंदी रस्म",
      subName: "Mehendi & Haldi Rasam",
      tagline: "हरिद्रा लेपन, शुभ शगुन और सखियों के संग मेहंदी के रंग",
      date: "गुरुवार, 10 दिसम्बर 2026",
      dateEn: "Thursday, 10th Dec 2026",
      time: "प्रातः 11:00 बजे से (11:00 AM Onwards)",
      venue: "पंडित निवास (Family Residence), टाटानगर",
      dressCode: "पारंपरिक पीला परिधान (Traditional Bright Yellow)",
      icon: "Sparkles",
      badge: "शगुन रस्म",
      themeColor: "from-amber-900/90 to-yellow-950/95",
      borderGlow: "border-amber-500/60 shadow-amber-900/30",
    },
    {
      id: "sangeet",
      name: "संगीत संध्या एवं वलय उत्सव",
      subName: "Sangeet & Ring Ceremony",
      tagline: "सुरमई संगीत, मधुर गीतों की झंकार और सुरम्य नृत्य उत्सव",
      date: "गुरुवार, 10 दिसम्बर 2026",
      dateEn: "Thursday, 10th Dec 2026",
      time: "संध्या 6:30 बजे से (6:30 PM Onwards)",
      venue: "रॉयल पैलेस ग्रैंड हॉल, टाटानगर, झारखण्ड",
      dressCode: "राजसी इंडो-वेस्टर्न एवं फेस्टिव ग्लैम (Royal Ethnic / Indo-Western)",
      icon: "Music",
      badge: "संगीत उत्सव",
      themeColor: "from-emerald-950/95 to-teal-950/95",
      borderGlow: "border-emerald-500/60 shadow-emerald-950/40",
    },
    {
      id: "baraat-vivah",
      name: "शुभ विवाह एवं पाणिग्रहण संस्कार",
      subName: "Baraat Swagat & Shubh Vivah",
      tagline: "सात फेरे, पवित्र वैदिक मंत्रोच्चार और जन्मों-जन्मों का पावन बंधन",
      date: "शुक्रवार, 11 दिसम्बर 2026",
      dateEn: "Friday, 11th Dec 2026",
      time: "बारात स्वागत: सायं 8:00 बजे | पाणिग्रहण: रात्रि 9:00 बजे से",
      venue: "रॉयल हेरिटेज पैलेस, टाटानगर, झारखण्ड",
      dressCode: "शाही पारंपरिक राजपूताना / बनारसी परिधान (Royal Traditional Finery)",
      icon: "HeartHandshake",
      isMain: true,
      badge: "मुख्य लग्न मुहूर्त",
      themeColor: "from-rose-950/95 to-amber-950/95",
      borderGlow: "border-amber-400 ring-2 ring-amber-400/50 shadow-amber-900/50",
    },
    {
      id: "reception",
      name: "वर-वधू आशीर्वाद समारोह (प्रीतिभोज)",
      subName: "Ashirwad Samaroh & Grand Reception",
      tagline: "नवदम्पति को शुभाशीर्वाद, मंगल कामनाएं एवं शाही प्रीतिभोज",
      date: "शनिवार, 12 दिसम्बर 2026",
      dateEn: "Saturday, 12th Dec 2026",
      time: "सायं 7:30 बजे से (7:30 PM Onwards)",
      venue: "ग्रैंड बैंक्वेट लॉन, टाटानगर, झारखण्ड",
      dressCode: "भव्य फॉर्मल एवं एथनिक परिधान (Grand Formal / Festive)",
      icon: "PartyPopper",
      badge: "आशीर्वाद प्रीतिभोज",
      themeColor: "from-stone-950/95 to-amber-950/95",
      borderGlow: "border-amber-500/60 shadow-stone-900/40",
    },
  ],

  // Royal Gallery
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
      title: "राजसी प्रेम का सूत्रपात",
      caption: "Two souls united by destiny, blessed by traditions",
    },
    {
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
      title: "वधु सौंदर्य व लालित्य",
      caption: "Adorned in royal crimson, ready for the sacred vows",
    },
    {
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
      title: "अनंत पथ पर साथ",
      caption: "Walking hand in hand toward eternity",
    },
    {
      url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1000&q=80",
      title: "मुस्कुराते पल",
      caption: "Laughter and eternal companionship",
    },
    {
      url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=80",
      title: "वैदिक फेरे व मंगल सूत्र",
      caption: "Sacred fire, holy mantras and lifelong promises",
    },
    {
      url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80",
      title: "आशीर्वाद और उत्सव",
      caption: "Surrounded by loving family and divine grace",
    },
  ],

  // Blessings Wall with Exact Family Members
  initialWishes: [
    {
      id: "w-1",
      name: "ओम प्रकाश पंडित (बड़ा भाई) एवं अमनदीप पंडित (छोटा भाई)",
      relation: "वधु के भ्रातागण (Bride's Brothers)",
      message: "हमारी प्यारी दिव्या दीदी, ईश्वर आपके जीवन को सदैव सुख, समृद्धि और आनंद से परिपूर्ण रखें। हमारे चिंटू जीजू का परिवार में सहर्ष स्वागत है!",
      time: "2 hours ago",
      hearts: 54,
    },
    {
      id: "w-2",
      name: "सुप्रिया देवी (बड़ी बहन) एवं रितिक कुमार (छोटा भाई)",
      relation: "वर के सहोदर (Groom's Sister & Brother)",
      message: "हमारे प्रिय चिंटू भैया और मोनिका भाभी को इस पावन विवाह के अवसर पर अनंत बधाई एवं शुभाशीर्वाद। आपकी जोड़ी सदा मुस्कुराती रहे!",
      time: "4 hours ago",
      hearts: 68,
    },
    {
      id: "w-3",
      name: "दीपिका पंडित (छोटी बहन)",
      relation: "वधु की छोटी बहन (Bride's Sister)",
      message: "मेरी सबसे प्यारी दीदी और जीजू, आप दोनों दुनिया की सबसे सुंदर जोड़ी हैं। भगवान गणेश जी आप पर सदा अपनी कृपा बनाए रखें!",
      time: "6 hours ago",
      hearts: 49,
    },
    {
      id: "w-4",
      name: "शंभू पंडित एवं रेखा पंडित",
      relation: "वधु के माता-पिता (Bride's Parents)",
      message: "आयुष्मान भव! हमारी लाडली मोनिका एवं दामाद रितेश को संसार का संपूर्ण सुख, शांति और सौभाग्य प्राप्त हो।",
      time: "1 day ago",
      hearts: 108,
    },
    {
      id: "w-5",
      name: "प्रदीप कु. पंडित एवं सुनैना देवी",
      relation: "वर के माता-पिता (Groom's Parents)",
      message: "मंगलम् भगवान विष्णुः। हमारे सुपुत्र रितेश और पुत्रवधू मोनिका को सात जन्मों के इस पवित्र बंधन पर कोटि-कोटि आशीर्वाद।",
      time: "1 day ago",
      hearts: 112,
    },
  ],

  googleSheetScriptUrl: "",

  // Traditional Shehnai & Sitar Royal Indian Instrumental
  audioTrack: {
    title: "Royal Shehnai & Sitar Festive Melody",
    src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113271.mp3",
  },
};
