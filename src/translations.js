// Translations for Voxly Bot
// Add more languages as needed

export const translations = {
  en: {
    name: "English",
    flag: "🇬🇧",
    
    // Welcome & Setup
    welcome: "🎙 <b>Welcome to Voxly!</b>\n\nTurn your voice into perfectly formatted text.\n\nPlease select your language:",
    language_set: "✅ Language set to English!",
    
    // Output Type Selection
    select_output: "📝 <b>What are you creating?</b>\n\nThis helps me format your text better:",
    output_types: {
      general: "📄 General Text",
      email: "📧 Email",
      summary: "📋 Summary",
      notes: "📝 Notes & Ideas",
      todo: "✅ To-Do List",
      message: "💬 Message/Chat"
    },
    output_set: "✅ Output type set to: ",
    
    // Tone Selection
    select_tone: "🎨 <b>Choose your tone:</b>",
    tones: {
      professional: "👔 Professional",
      casual: "😊 Casual",
      friendly: "🤗 Friendly",
      formal: "📜 Formal",
      concise: "⚡ Concise"
    },
    tone_set: "✅ Tone set to: ",
    
    // Setup Complete
    setup_complete: "🎉 <b>You're all set!</b>\n\n" +
      "Now send me a voice message and I'll convert it to text.\n\n" +
      "<b>Commands:</b>\n" +
      "/settings - Change preferences\n" +
      "/language - Change language\n" +
      "/output - Change output type\n" +
      "/tone - Change tone\n" +
      "/status - Check your usage\n" +
      "/pay - Get premium access",
    
    // Status
    status_vip: "👑 <b>VIP Status</b>\n\nYou have unlimited free access!",
    status_premium: "📊 <b>Your Status</b>\n\nPlan: Premium ✅\nMessages remaining: {remaining}\nTotal used: {used}",
    status_trial: "📊 <b>Your Status</b>\n\nPlan: Free Trial\nUsed: {used}/{total}\nRemaining: {remaining}",
    trial_ended: "\n\n⚠️ Free trial ended. Use /pay to continue.",
    
    // Payment
    pay_instructions: "💳 <b>Payment Instructions</b>\n\n" +
      "Send exactly <b>{amount} USDT</b> (TRC20) to:\n\n" +
      "<code>{wallet}</code>\n\n" +
      "You'll get: <b>{messages} messages</b>\n\n" +
      "⚠️ <b>Important:</b>\n" +
      "• Use TRON network (TRC20) only\n" +
      "• After sending, use /verify YOUR_TRON_ADDRESS\n\n" +
      "Example:\n<code>/verify TXyz123abc...</code>",
    
    verify_prompt: "❌ Please provide your TRON wallet address.\n\nExample:\n<code>/verify TXyz123abc...</code>",
    verify_checking: "🔍 Checking payment...",
    verify_success: "✅ <b>Payment Verified!</b>\n\nAmount: {amount} USDT\nTX: <code>{tx}</code>\n\n🎉 You now have {messages} messages!",
    verify_failed: "❌ <b>Payment not found</b>\n\n" +
      "Please make sure:\n" +
      "• You sent {amount} USDT (TRC20)\n" +
      "• You sent to: <code>{wallet}</code>\n" +
      "• Transaction is confirmed (wait 1-2 min)\n\n" +
      "Try /verify again after confirmation.",
    
    // Messages
    no_messages: "⚠️ <b>No messages remaining</b>\n\nGet {messages} more messages for just <b>{amount} USDT</b>\n\nUse /pay to see payment instructions.",
    messages_remaining: "\n\n⚠️ {count} message(s) remaining.",
    processing: "🎙 Processing your voice...",
    error: "Sorry, I couldn't process that. Please try again.",
    
    // Settings
    current_settings: "⚙️ <b>Your Settings</b>\n\n" +
      "🌐 Language: {language}\n" +
      "📝 Output: {output}\n" +
      "🎨 Tone: {tone}\n\n" +
      "Use commands to change:\n/language /output /tone"
  },

  fa: {
    name: "فارسی",
    flag: "🇮🇷",
    
    // Welcome & Setup
    welcome: "🎙 <b>به Voxly خوش آمدید!</b>\n\nصدای خود را به متن تبدیل کنید.\n\nلطفاً زبان خود را انتخاب کنید:",
    language_set: "✅ زبان به فارسی تغییر کرد!",
    
    // Output Type Selection
    select_output: "📝 <b>چه نوع متنی می‌سازید؟</b>\n\nاین به من کمک می‌کند متن شما را بهتر قالب‌بندی کنم:",
    output_types: {
      general: "📄 متن عمومی",
      email: "📧 ایمیل",
      summary: "📋 خلاصه",
      notes: "📝 یادداشت و ایده",
      todo: "✅ لیست کارها",
      message: "💬 پیام/چت"
    },
    output_set: "✅ نوع خروجی: ",
    
    // Tone Selection
    select_tone: "🎨 <b>لحن مورد نظر خود را انتخاب کنید:</b>",
    tones: {
      professional: "👔 حرفه‌ای",
      casual: "😊 معمولی",
      friendly: "🤗 دوستانه",
      formal: "📜 رسمی",
      concise: "⚡ مختصر"
    },
    tone_set: "✅ لحن: ",
    
    // Setup Complete
    setup_complete: "🎉 <b>همه چیز آماده است!</b>\n\n" +
      "حالا یک پیام صوتی بفرستید تا آن را به متن تبدیل کنم.\n\n" +
      "<b>دستورات:</b>\n" +
      "/settings - تغییر تنظیمات\n" +
      "/language - تغییر زبان\n" +
      "/output - تغییر نوع خروجی\n" +
      "/tone - تغییر لحن\n" +
      "/status - بررسی وضعیت\n" +
      "/pay - دسترسی پریمیوم",
    
    // Status
    status_vip: "👑 <b>وضعیت VIP</b>\n\nشما دسترسی نامحدود رایگان دارید!",
    status_premium: "📊 <b>وضعیت شما</b>\n\nپلن: پریمیوم ✅\nپیام‌های باقیمانده: {remaining}\nکل استفاده شده: {used}",
    status_trial: "📊 <b>وضعیت شما</b>\n\nپلن: دوره آزمایشی\nاستفاده شده: {used}/{total}\nباقیمانده: {remaining}",
    trial_ended: "\n\n⚠️ دوره آزمایشی تمام شد. از /pay استفاده کنید.",
    
    // Payment
    pay_instructions: "💳 <b>راهنمای پرداخت</b>\n\n" +
      "دقیقاً <b>{amount} USDT</b> (TRC20) به این آدرس بفرستید:\n\n" +
      "<code>{wallet}</code>\n\n" +
      "دریافت می‌کنید: <b>{messages} پیام</b>\n\n" +
      "⚠️ <b>مهم:</b>\n" +
      "• فقط از شبکه TRON (TRC20) استفاده کنید\n" +
      "• بعد از ارسال، از /verify آدرس_کیف_پول استفاده کنید",
    
    verify_prompt: "❌ لطفاً آدرس کیف پول TRON خود را وارد کنید.",
    verify_checking: "🔍 در حال بررسی پرداخت...",
    verify_success: "✅ <b>پرداخت تأیید شد!</b>\n\nمبلغ: {amount} USDT\n\n🎉 شما الان {messages} پیام دارید!",
    verify_failed: "❌ <b>پرداخت یافت نشد</b>\n\nلطفاً مطمئن شوید که پرداخت انجام شده و چند دقیقه صبر کنید.",
    
    // Messages
    no_messages: "⚠️ <b>پیامی باقی نمانده</b>\n\n{messages} پیام دیگر فقط با <b>{amount} USDT</b>\n\nاز /pay استفاده کنید.",
    messages_remaining: "\n\n⚠️ {count} پیام باقیمانده.",
    processing: "🎙 در حال پردازش صدای شما...",
    error: "متأسفانه نتوانستم پردازش کنم. لطفاً دوباره امتحان کنید.",
    
    // Settings
    current_settings: "⚙️ <b>تنظیمات شما</b>\n\n" +
      "🌐 زبان: {language}\n" +
      "📝 خروجی: {output}\n" +
      "🎨 لحن: {tone}\n\n" +
      "برای تغییر از دستورات استفاده کنید:\n/language /output /tone"
  },

  es: {
    name: "Español",
    flag: "🇪🇸",
    
    welcome: "🎙 <b>¡Bienvenido a Voxly!</b>\n\nConvierte tu voz en texto perfectamente formateado.\n\nPor favor, selecciona tu idioma:",
    language_set: "✅ ¡Idioma configurado a Español!",
    
    select_output: "📝 <b>¿Qué estás creando?</b>\n\nEsto me ayuda a formatear mejor tu texto:",
    output_types: {
      general: "📄 Texto General",
      email: "📧 Correo",
      summary: "📋 Resumen",
      notes: "📝 Notas e Ideas",
      todo: "✅ Lista de Tareas",
      message: "💬 Mensaje/Chat"
    },
    output_set: "✅ Tipo de salida: ",
    
    select_tone: "🎨 <b>Elige tu tono:</b>",
    tones: {
      professional: "👔 Profesional",
      casual: "😊 Casual",
      friendly: "🤗 Amigable",
      formal: "📜 Formal",
      concise: "⚡ Conciso"
    },
    tone_set: "✅ Tono: ",
    
    setup_complete: "🎉 <b>¡Todo listo!</b>\n\n" +
      "Ahora envíame un mensaje de voz y lo convertiré en texto.\n\n" +
      "<b>Comandos:</b>\n" +
      "/settings - Cambiar preferencias\n" +
      "/language - Cambiar idioma\n" +
      "/output - Cambiar tipo de salida\n" +
      "/tone - Cambiar tono\n" +
      "/status - Ver tu uso\n" +
      "/pay - Obtener acceso premium",
    
    status_vip: "👑 <b>Estado VIP</b>\n\n¡Tienes acceso ilimitado gratis!",
    status_premium: "📊 <b>Tu Estado</b>\n\nPlan: Premium ✅\nMensajes restantes: {remaining}\nTotal usado: {used}",
    status_trial: "📊 <b>Tu Estado</b>\n\nPlan: Prueba Gratis\nUsado: {used}/{total}\nRestante: {remaining}",
    trial_ended: "\n\n⚠️ Prueba terminada. Usa /pay para continuar.",
    
    pay_instructions: "💳 <b>Instrucciones de Pago</b>\n\n" +
      "Envía exactamente <b>{amount} USDT</b> (TRC20) a:\n\n" +
      "<code>{wallet}</code>\n\n" +
      "Obtendrás: <b>{messages} mensajes</b>",
    
    verify_prompt: "❌ Por favor proporciona tu dirección de wallet TRON.",
    verify_checking: "🔍 Verificando pago...",
    verify_success: "✅ <b>¡Pago Verificado!</b>\n\n🎉 ¡Ahora tienes {messages} mensajes!",
    verify_failed: "❌ <b>Pago no encontrado</b>\n\nPor favor verifica y espera unos minutos.",
    
    no_messages: "⚠️ <b>Sin mensajes restantes</b>\n\nObtén {messages} mensajes por solo <b>{amount} USDT</b>",
    messages_remaining: "\n\n⚠️ {count} mensaje(s) restante(s).",
    processing: "🎙 Procesando tu voz...",
    error: "Lo siento, no pude procesar eso. Por favor intenta de nuevo.",
    
    current_settings: "⚙️ <b>Tu Configuración</b>\n\n" +
      "🌐 Idioma: {language}\n" +
      "📝 Salida: {output}\n" +
      "🎨 Tono: {tone}"
  },

  de: {
    name: "Deutsch",
    flag: "🇩🇪",
    
    welcome: "🎙 <b>Willkommen bei Voxly!</b>\n\nVerwandle deine Stimme in perfekt formatierten Text.\n\nBitte wähle deine Sprache:",
    language_set: "✅ Sprache auf Deutsch gesetzt!",
    
    select_output: "📝 <b>Was erstellst du?</b>",
    output_types: {
      general: "📄 Allgemeiner Text",
      email: "📧 E-Mail",
      summary: "📋 Zusammenfassung",
      notes: "📝 Notizen & Ideen",
      todo: "✅ To-Do-Liste",
      message: "💬 Nachricht/Chat"
    },
    output_set: "✅ Ausgabetyp: ",
    
    select_tone: "🎨 <b>Wähle deinen Ton:</b>",
    tones: {
      professional: "👔 Professionell",
      casual: "😊 Locker",
      friendly: "🤗 Freundlich",
      formal: "📜 Formell",
      concise: "⚡ Prägnant"
    },
    tone_set: "✅ Ton: ",
    
    setup_complete: "🎉 <b>Alles bereit!</b>\n\n" +
      "Sende mir jetzt eine Sprachnachricht.\n\n" +
      "<b>Befehle:</b>\n" +
      "/settings - Einstellungen ändern\n" +
      "/status - Nutzung prüfen\n" +
      "/pay - Premium-Zugang",
    
    status_vip: "👑 <b>VIP-Status</b>\n\nDu hast unbegrenzten kostenlosen Zugang!",
    status_premium: "📊 <b>Dein Status</b>\n\nPlan: Premium ✅\nVerbleibend: {remaining}\nGenutzt: {used}",
    status_trial: "📊 <b>Dein Status</b>\n\nPlan: Kostenlose Testversion\nGenutzt: {used}/{total}\nVerbleibend: {remaining}",
    trial_ended: "\n\n⚠️ Testversion beendet. Nutze /pay zum Fortfahren.",
    
    pay_instructions: "💳 <b>Zahlungsanweisungen</b>\n\nSende genau <b>{amount} USDT</b> (TRC20) an:\n\n<code>{wallet}</code>",
    verify_prompt: "❌ Bitte gib deine TRON-Wallet-Adresse an.",
    verify_checking: "🔍 Überprüfe Zahlung...",
    verify_success: "✅ <b>Zahlung bestätigt!</b>\n\n🎉 Du hast jetzt {messages} Nachrichten!",
    verify_failed: "❌ <b>Zahlung nicht gefunden</b>",
    
    no_messages: "⚠️ <b>Keine Nachrichten übrig</b>",
    messages_remaining: "\n\n⚠️ {count} Nachricht(en) übrig.",
    processing: "🎙 Verarbeite deine Stimme...",
    error: "Entschuldigung, das konnte ich nicht verarbeiten.",
    
    current_settings: "⚙️ <b>Deine Einstellungen</b>\n\n🌐 Sprache: {language}\n📝 Ausgabe: {output}\n🎨 Ton: {tone}"
  },

  fr: {
    name: "Français",
    flag: "🇫🇷",
    
    welcome: "🎙 <b>Bienvenue sur Voxly!</b>\n\nTransformez votre voix en texte parfaitement formaté.\n\nVeuillez sélectionner votre langue:",
    language_set: "✅ Langue définie sur Français!",
    
    select_output: "📝 <b>Que créez-vous?</b>",
    output_types: {
      general: "📄 Texte Général",
      email: "📧 Email",
      summary: "📋 Résumé",
      notes: "📝 Notes & Idées",
      todo: "✅ Liste de Tâches",
      message: "💬 Message/Chat"
    },
    output_set: "✅ Type de sortie: ",
    
    select_tone: "🎨 <b>Choisissez votre ton:</b>",
    tones: {
      professional: "👔 Professionnel",
      casual: "😊 Décontracté",
      friendly: "🤗 Amical",
      formal: "📜 Formel",
      concise: "⚡ Concis"
    },
    tone_set: "✅ Ton: ",
    
    setup_complete: "🎉 <b>Tout est prêt!</b>\n\nEnvoyez-moi un message vocal maintenant.",
    
    status_vip: "👑 <b>Statut VIP</b>\n\nVous avez un accès illimité gratuit!",
    status_premium: "📊 <b>Votre Statut</b>\n\nPlan: Premium ✅\nRestant: {remaining}\nUtilisé: {used}",
    status_trial: "📊 <b>Votre Statut</b>\n\nPlan: Essai Gratuit\nUtilisé: {used}/{total}",
    trial_ended: "\n\n⚠️ Essai terminé. Utilisez /pay pour continuer.",
    
    pay_instructions: "💳 <b>Instructions de Paiement</b>\n\nEnvoyez <b>{amount} USDT</b> (TRC20) à:\n\n<code>{wallet}</code>",
    verify_prompt: "❌ Veuillez fournir votre adresse de portefeuille TRON.",
    verify_checking: "🔍 Vérification du paiement...",
    verify_success: "✅ <b>Paiement Vérifié!</b>",
    verify_failed: "❌ <b>Paiement non trouvé</b>",
    
    no_messages: "⚠️ <b>Plus de messages</b>",
    messages_remaining: "\n\n⚠️ {count} message(s) restant(s).",
    processing: "🎙 Traitement de votre voix...",
    error: "Désolé, je n'ai pas pu traiter cela.",
    
    current_settings: "⚙️ <b>Vos Paramètres</b>\n\n🌐 Langue: {language}\n📝 Sortie: {output}\n🎨 Ton: {tone}"
  },

  ar: {
    name: "العربية",
    flag: "🇸🇦",
    
    welcome: "🎙 <b>مرحباً بك في Voxly!</b>\n\nحوّل صوتك إلى نص منسق بشكل مثالي.\n\nالرجاء اختيار لغتك:",
    language_set: "✅ تم تعيين اللغة إلى العربية!",
    
    select_output: "📝 <b>ماذا تنشئ؟</b>",
    output_types: {
      general: "📄 نص عام",
      email: "📧 بريد إلكتروني",
      summary: "📋 ملخص",
      notes: "📝 ملاحظات وأفكار",
      todo: "✅ قائمة مهام",
      message: "💬 رسالة/دردشة"
    },
    output_set: "✅ نوع المخرج: ",
    
    select_tone: "🎨 <b>اختر نبرتك:</b>",
    tones: {
      professional: "👔 مهني",
      casual: "😊 عادي",
      friendly: "🤗 ودي",
      formal: "📜 رسمي",
      concise: "⚡ موجز"
    },
    tone_set: "✅ النبرة: ",
    
    setup_complete: "🎉 <b>كل شيء جاهز!</b>\n\nأرسل لي رسالة صوتية الآن.",
    
    status_vip: "👑 <b>حالة VIP</b>\n\nلديك وصول مجاني غير محدود!",
    status_premium: "📊 <b>حالتك</b>\n\nالخطة: بريميوم ✅\nالمتبقي: {remaining}",
    status_trial: "📊 <b>حالتك</b>\n\nالخطة: تجربة مجانية\nالمستخدم: {used}/{total}",
    trial_ended: "\n\n⚠️ انتهت التجربة. استخدم /pay للمتابعة.",
    
    pay_instructions: "💳 <b>تعليمات الدفع</b>\n\nأرسل <b>{amount} USDT</b> (TRC20) إلى:\n\n<code>{wallet}</code>",
    verify_prompt: "❌ الرجاء تقديم عنوان محفظة TRON الخاص بك.",
    verify_checking: "🔍 جارٍ التحقق من الدفع...",
    verify_success: "✅ <b>تم التحقق من الدفع!</b>",
    verify_failed: "❌ <b>لم يتم العثور على الدفع</b>",
    
    no_messages: "⚠️ <b>لا رسائل متبقية</b>",
    messages_remaining: "\n\n⚠️ {count} رسالة متبقية.",
    processing: "🎙 جارٍ معالجة صوتك...",
    error: "عذراً، لم أتمكن من المعالجة.",
    
    current_settings: "⚙️ <b>إعداداتك</b>\n\n🌐 اللغة: {language}\n📝 المخرج: {output}\n🎨 النبرة: {tone}"
  },

  tr: {
    name: "Türkçe",
    flag: "🇹🇷",
    
    welcome: "🎙 <b>Voxly'ye Hoş Geldiniz!</b>\n\nSesinizi mükemmel biçimlendirilmiş metne dönüştürün.\n\nLütfen dilinizi seçin:",
    language_set: "✅ Dil Türkçe olarak ayarlandı!",
    
    select_output: "📝 <b>Ne oluşturuyorsunuz?</b>",
    output_types: {
      general: "📄 Genel Metin",
      email: "📧 E-posta",
      summary: "📋 Özet",
      notes: "📝 Notlar ve Fikirler",
      todo: "✅ Yapılacaklar Listesi",
      message: "💬 Mesaj/Sohbet"
    },
    output_set: "✅ Çıktı türü: ",
    
    select_tone: "🎨 <b>Tonunuzu seçin:</b>",
    tones: {
      professional: "👔 Profesyonel",
      casual: "😊 Rahat",
      friendly: "🤗 Arkadaşça",
      formal: "📜 Resmi",
      concise: "⚡ Özlü"
    },
    tone_set: "✅ Ton: ",
    
    setup_complete: "🎉 <b>Her şey hazır!</b>\n\nŞimdi bana bir sesli mesaj gönderin.",
    
    status_vip: "👑 <b>VIP Durumu</b>\n\nSınırsız ücretsiz erişiminiz var!",
    status_premium: "📊 <b>Durumunuz</b>\n\nPlan: Premium ✅\nKalan: {remaining}",
    status_trial: "📊 <b>Durumunuz</b>\n\nPlan: Ücretsiz Deneme\nKullanılan: {used}/{total}",
    trial_ended: "\n\n⚠️ Deneme süresi bitti. Devam etmek için /pay kullanın.",
    
    pay_instructions: "💳 <b>Ödeme Talimatları</b>\n\nTam olarak <b>{amount} USDT</b> (TRC20) gönderin.",
    verify_prompt: "❌ Lütfen TRON cüzdan adresinizi girin.",
    verify_checking: "🔍 Ödeme kontrol ediliyor...",
    verify_success: "✅ <b>Ödeme Doğrulandı!</b>",
    verify_failed: "❌ <b>Ödeme bulunamadı</b>",
    
    no_messages: "⚠️ <b>Mesaj kalmadı</b>",
    messages_remaining: "\n\n⚠️ {count} mesaj kaldı.",
    processing: "🎙 Sesiniz işleniyor...",
    error: "Üzgünüm, işleyemedim.",
    
    current_settings: "⚙️ <b>Ayarlarınız</b>\n\n🌐 Dil: {language}\n📝 Çıktı: {output}\n🎨 Ton: {tone}"
  },

  ru: {
    name: "Русский",
    flag: "🇷🇺",
    
    welcome: "🎙 <b>Добро пожаловать в Voxly!</b>\n\nПревратите голос в идеально отформатированный текст.\n\nВыберите язык:",
    language_set: "✅ Язык установлен на Русский!",
    
    select_output: "📝 <b>Что вы создаёте?</b>",
    output_types: {
      general: "📄 Общий текст",
      email: "📧 Email",
      summary: "📋 Резюме",
      notes: "📝 Заметки и идеи",
      todo: "✅ Список дел",
      message: "💬 Сообщение/Чат"
    },
    output_set: "✅ Тип вывода: ",
    
    select_tone: "🎨 <b>Выберите тон:</b>",
    tones: {
      professional: "👔 Профессиональный",
      casual: "😊 Повседневный",
      friendly: "🤗 Дружелюбный",
      formal: "📜 Формальный",
      concise: "⚡ Краткий"
    },
    tone_set: "✅ Тон: ",
    
    setup_complete: "🎉 <b>Всё готово!</b>\n\nТеперь отправьте голосовое сообщение.",
    
    status_vip: "👑 <b>VIP Статус</b>\n\nУ вас безлимитный бесплатный доступ!",
    status_premium: "📊 <b>Ваш статус</b>\n\nПлан: Премиум ✅\nОсталось: {remaining}",
    status_trial: "📊 <b>Ваш статус</b>\n\nПлан: Пробный\nИспользовано: {used}/{total}",
    trial_ended: "\n\n⚠️ Пробный период закончился.",
    
    pay_instructions: "💳 <b>Инструкции по оплате</b>\n\nОтправьте <b>{amount} USDT</b> (TRC20).",
    verify_prompt: "❌ Укажите адрес TRON кошелька.",
    verify_checking: "🔍 Проверка оплаты...",
    verify_success: "✅ <b>Оплата подтверждена!</b>",
    verify_failed: "❌ <b>Оплата не найдена</b>",
    
    no_messages: "⚠️ <b>Сообщения закончились</b>",
    messages_remaining: "\n\n⚠️ Осталось {count} сообщений.",
    processing: "🎙 Обработка голоса...",
    error: "Извините, не удалось обработать.",
    
    current_settings: "⚙️ <b>Настройки</b>\n\n🌐 Язык: {language}\n📝 Вывод: {output}\n🎨 Тон: {tone}"
  },

  zh: {
    name: "中文",
    flag: "🇨🇳",
    
    welcome: "🎙 <b>欢迎使用 Voxly！</b>\n\n将您的语音转换为完美格式的文本。\n\n请选择您的语言：",
    language_set: "✅ 语言已设置为中文！",
    
    select_output: "📝 <b>您在创建什么？</b>",
    output_types: {
      general: "📄 通用文本",
      email: "📧 邮件",
      summary: "📋 摘要",
      notes: "📝 笔记和想法",
      todo: "✅ 待办事项",
      message: "💬 消息/聊天"
    },
    output_set: "✅ 输出类型：",
    
    select_tone: "🎨 <b>选择您的语气：</b>",
    tones: {
      professional: "👔 专业",
      casual: "😊 随意",
      friendly: "🤗 友好",
      formal: "📜 正式",
      concise: "⚡ 简洁"
    },
    tone_set: "✅ 语气：",
    
    setup_complete: "🎉 <b>一切就绪！</b>\n\n现在发送语音消息给我。",
    
    status_vip: "👑 <b>VIP 状态</b>\n\n您拥有无限免费访问权限！",
    status_premium: "📊 <b>您的状态</b>\n\n计划：高级 ✅\n剩余：{remaining}",
    status_trial: "📊 <b>您的状态</b>\n\n计划：免费试用\n已用：{used}/{total}",
    trial_ended: "\n\n⚠️ 试用结束。使用 /pay 继续。",
    
    pay_instructions: "💳 <b>付款说明</b>\n\n发送 <b>{amount} USDT</b> (TRC20)。",
    verify_prompt: "❌ 请提供您的 TRON 钱包地址。",
    verify_checking: "🔍 正在验证付款...",
    verify_success: "✅ <b>付款已验证！</b>",
    verify_failed: "❌ <b>未找到付款</b>",
    
    no_messages: "⚠️ <b>没有剩余消息</b>",
    messages_remaining: "\n\n⚠️ 剩余 {count} 条消息。",
    processing: "🎙 正在处理您的语音...",
    error: "抱歉，无法处理。",
    
    current_settings: "⚙️ <b>您的设置</b>\n\n🌐 语言：{language}\n📝 输出：{output}\n🎨 语气：{tone}"
  }
};

// Helper function to get translation with variable substitution
export function t(lang, key, vars = {}) {
  const keys = key.split('.');
  let value = translations[lang] || translations.en;
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  if (!value) {
    // Fallback to English
    value = translations.en;
    for (const k of keys) {
      value = value?.[k];
    }
  }
  
  if (typeof value === 'string') {
    // Replace variables like {amount} with actual values
    return value.replace(/\{(\w+)\}/g, (match, varName) => vars[varName] ?? match);
  }
  
  return value || key;
}

// Get list of supported languages for buttons
export function getLanguageButtons() {
  return Object.entries(translations).map(([code, lang]) => ({
    code,
    name: lang.name,
    flag: lang.flag
  }));
}
