// Traditional Royal Luxury Wedding Configuration - Bride Side (वधू पक्ष)
// Monika Pandit (Divya) weds Ritesh Kumar (Chintu)
// Shubh Vivah: 11 Dec 2026 • Sidhgora Bara Flat Club House, near SDSM School, Jamshedpur

export const weddingData = {
  couple: {
    bride: {
      fullName: "Monika Pandit",
      nickname: "Divya",
      title: "सौ. कां. (वधू)",
      about: "A graceful soul filled with warmth, virtues, and endless joy, blessed by her beloved parents and siblings.",
      father: "श्री शंभू पंडित",
      mother: "श्रीमती रेखा पंडित",
      nativeAddress: "ग्राम:लोदिया, रजवाड़ा, साहिबगंज, मुजफ्फरपुर (बिहार)",
      family: {
        father: "श्री शंभू पंडित",
        mother: "श्रीमती रेखा पंडित",
        elderBrother: "ओम प्रकाश पंडित",
        youngerBrother: "अमनदीप पंडित",
        youngerSister: "दीपिका पंडित",
      },
      photo: `${import.meta.env.BASE_URL}face/bride.jpg`,
    },
    groom: {
      fullName: "Ritesh Kumar",
      nickname: "Chintu",
      title: "चि. (वर)",
      about: "An honorable gentleman of noble character and immense love, cherished by his family and ready for the sacred union.",
      father: "श्री प्रदीप कुमार पंडित",
      mother: "श्रीमती सुनैना देवी",
      nativeAddress: "टेल्को, जमशेदपुर, झारखण्ड",
      family: {
        father: "श्री प्रदीप कुमार पंडित",
        mother: "श्रीमती सुनैना देवी",
        elderSister: "सुप्रिया देवी",
        youngerBrother: "रितिक कुमार",
      },
      photo: `${import.meta.env.BASE_URL}face/groom.jpg`,
    },
  },

  // Main Wedding Ceremony Date & Time
  weddingDate: "2026-12-11T21:00:00+05:30", // 11th Dec 2026 after 9:00 PM
  weddingDateDisplay: "शुक्रवार, 11 दिसम्बर 2026",
  weddingTimeDisplay: "लग्न मुहूर्त: रात्रि 9:00 बजे से",

  location: {
    city: "जमशेदपुर (झारखण्ड)",
    state: "झारखण्ड",
    venueName: "सिदगोड़ा बारा फ्लैट क्लब हाउस",
    address: "नियर SDSM स्कूल, सिदगोड़ा, जमशेदपुर, झारखण्ड",
    landmark: "नियर SDSM स्कूल, सिदगोड़ा, जमशेदपुर",
    googleMapsUrl: "https://maps.app.goo.gl/Gg18Xamsf2QUWa6C8?g_st=aw",
    embedMapUrl: "https://maps.google.com/maps?q=Sidhgora+Bara+Flat+Club+House+SDSM+School+Jamshedpur&t=&z=15&ie=UTF8&iwloc=&output=embed",
    nearestStation: "टाटानगर जंक्शन (TATA) - ~8 किमी",
    nearestAirport: "सोनारी एयरपोर्ट (IXW), जमशेदपुर - ~7 किमी",
    nearestBusStand: "मानगो बस स्टैंड - ~2.5 किमी",
  },

  // Event schedule strictly from authentic wedding card
  events: [
    {
      id: "tilak",
      name: "शुभ तिलकोत्सव",
      subName: "Shubh Tilakotsav",
      tagline: "मांगलिक तिलक, शगुन एवं पावन वैदिक परंपरा",
      date: "बुधवार, 09 दिसम्बर 2026",
      dateEn: "Wednesday, 09th Dec 2026",
      time: "मांगलिक लग्न मुहूर्त अनुसार",
      venue: "जमशेदपुर, झारखण्ड",
      icon: "Sparkles",
      badge: "तिलक रस्म",
      themeColor: "from-amber-900/90 to-yellow-950/95",
      borderGlow: "border-amber-500/60 shadow-amber-900/30",
    },
    {
      id: "matkor-haldi",
      name: "मटकोड़ एवं हल्दी कलश",
      subName: "Matkor & Haldi Kalash",
      tagline: "मातृका पूजन, हरिद्रा लेपन और मांगलिक कलश स्थापना",
      date: "गुरूवार, 10 दिसम्बर 2026",
      dateEn: "Thursday, 10th Dec 2026",
      time: "शुभ मांगलिक बेला",
      venue: "जमशेदपुर, झारखण्ड",
      icon: "Music",
      badge: "हल्दी रस्म",
      themeColor: "from-amber-950/95 to-yellow-900/90",
      borderGlow: "border-amber-500/60 shadow-amber-900/40",
    },
    {
      id: "vivah",
      name: "शुभविवाह (पाणिग्रहण संस्कार)",
      subName: "Shubh Vivah & Panigrahan",
      tagline: "सात फेरे, पवित्र सिंदूरदान और जन्म-जन्मांतर का पावन बंधन",
      date: "शुक्रवार, 11 दिसम्बर 2026",
      dateEn: "Friday, 11th Dec 2026",
      time: "बारात स्वागत: संध्या • लग्न मुहूर्त: रात्रि 9:00 बजे से",
      venue: "सिदगोड़ा बारा फ्लैट क्लब हाउस, नियर SDSM स्कूल, जमशेदपुर",
      icon: "HeartHandshake",
      isMain: true,
      badge: "मुख्य लग्न मुहूर्त",
      themeColor: "from-rose-950/95 to-amber-950/95",
      borderGlow: "border-amber-400 ring-2 ring-amber-400/50 shadow-amber-900/50",
    },
    {
      id: "preetibhoj",
      name: "प्रीतिभोज (Grand Reception)",
      subName: "Preetibhoj Samaroh",
      tagline: "नवदम्पति को शुभाशीर्वाद, मंगल स्नेह मिलन एवं भव्य प्रीतिभोज",
      date: "रविवार, 13 दिसम्बर 2026",
      dateEn: "Sunday, 13th Dec 2026",
      time: "संध्या 7:30 बजे से",
      venue: "जेमको मैदान, आजाद बस्ती, गुरूद्वारा रोड नं. 1, टेल्को, जमशेदपुर",
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
  ],

  // Darshanabhilashi & Family Blessings strictly from Bride's Family (वधू पक्ष)
  initialWishes: [
    {
      id: "w-1",
      name: "श्रीमती रेखा पंडित एवं श्री शंभू पंडित",
      relation: "वधु के माता-पिता (Bride's Parents)",
      message: "आयुष्मान भव! हमारी लाडली मोनिका एवं दामाद रितेश को संसार का संपूर्ण सुख, शांति और अखंड सौभाग्य प्राप्त हो।",
      time: "Bride Family",
      hearts: 151,
    },
    {
      id: "w-2",
      name: "ओम प्रकाश पंडित (बड़े भाई) एवं अमनदीप पंडित (छोटे भाई)",
      relation: "वधु के भ्रातागण (Bride's Brothers)",
      message: "हमारी प्यारी दिव्या दीदी, ईश्वर आपके जीवन को सदैव सुख, सौभाग्य और आनंद से परिपूर्ण रखें। जीजू का परिवार में सहर्ष स्वागत है!",
      time: "Bride Family",
      hearts: 95,
    },
    {
      id: "w-3",
      name: "दीपिका पंडित (छोटी बहन)",
      relation: "वधु की छोटी बहन (Bride's Sister)",
      message: "मेरी सबसे प्यारी दीदी और जीजू, आप दोनों दुनिया की सबसे सुंदर जोड़ी हैं। भगवान गणेश जी आप पर सदा अपनी कृपा बनाए रखें!",
      time: "Bride Family",
      hearts: 88,
    },
    {
      id: "w-4",
      name: "श्रीमती सुनैना देवी एवं श्री प्रदीप कुमार पंडित",
      relation: "वर के माता-पिता (Groom's Parents)",
      message: "मंगलम् भगवान विष्णुः। हमारे सुपुत्र रितेश और पुत्रवधू मोनिका को सात जन्मों के इस पवित्र बंधन पर कोटि-कोटि आशीर्वाद।",
      time: "Groom Family",
      hearts: 142,
    },
    {
      id: "w-5",
      name: "सुप्रिया देवी (बड़ी बहन) एवं रितिक कुमार (छोटा भाई)",
      relation: "वर के सहोदर (Groom's Sister & Brother)",
      message: "हमारे प्रिय चिंटू भैया और मोनिका भाभी को पावन परिणयोत्सव पर हार्दिक बधाई एवं शुभाशीर्वाद!",
      time: "Groom Family",
      hearts: 76,
    },
    {
      id: "w-6",
      name: "दर्शनाभिलाषी (समस्त पंडित परिवार)",
      relation: "दर्शनाभिलाषी (Well-Wishers)",
      message: "श्रीमती रेखा पंडित एवं श्री शंभू पंडित, ओम प्रकाश पंडित (बड़े भाई), अमनदीप पंडित (छोटे भाई), दीपिका पंडित (छोटी बहन) एवं समस्त पंडित परिवार।",
      time: "Bride Family",
      hearts: 120,
    },
  ],

  googleSheetScriptUrl: "",

  // User provided custom audio track: Bin Tere Kya Jeen
  audioTrack: {
    title: "Bin Tere Kya Jeena",
    src: `${import.meta.env.BASE_URL}music.mp3`,
  },
};
