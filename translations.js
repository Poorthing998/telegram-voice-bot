// Voxly Translations - Updated with AI Chat mode

export const translations = {
  en: {
    name: "English",
    flag: "🇬🇧",
    
    // Welcome
    welcome: "🎙 <b>Welcome to Voxly!</b>\n\nTurn your voice into perfectly formatted text.\n\nPlease select your language:",
    language_set: "✅ Language set to English!",
    
    // Processing Mode Selection
    select_processing: "⚙️ <b>How should I process your voice?</b>\n\nChoose your preferred mode:",
    processing_modes: {
      direct: "📝 Direct — Raw transcription, no changes",
      light: "✨ Light — Fix grammar & filler words only",
      enhanced: "🚀 Enhanced — Format as email, notes, etc.",
      ai_chat: "🤖 AI Chat — Ask AI questions, get answers"
    },
    processing_set: "✅ Processing mode: ",
    
    // Output Type Selection (only for enhanced mode)
    select_output: "📝 <b>What format do you want?</b>\n\nI'll format your voice into this:",
    output_types: {
      email: "📧 Email",
      summary: "📋 Summary",
      notes: "📝 Notes",
      todo: "✅ To-Do List",
      message: "💬 Chat Message",
      general: "📄 General Text"
    },
    output_set: "✅ Output format: ",
    
    // Tone Selection (only for email)
    select_tone: "🎨 <b>Choose email tone:</b>",
    tones: {
      professional: "👔 Professional",
      casual: "😊 Casual",
      friendly: "🤗 Friendly",
      formal: "📜 Formal"
    },
    tone_set: "✅ Tone: ",
    
    // Setup Complete messages
    setup_complete_direct: "🎉 <b>Ready!</b>\n\nI'll give you the exact transcription — no changes at all.\n\n🎤 Send a voice message to start!",
    setup_complete_light: "🎉 <b>Ready!</b>\n\nI'll clean up your speech — fix grammar and remove filler words, nothing more.\n\n🎤 Send a voice message to start!",
    setup_complete_enhanced: "🎉 <b>Ready!</b>\n\nI'll format your voice as {output}.\n\n🎤 Send a voice message to start!",
    setup_complete_ai_chat: "🎉 <b>Ready!</b>\n\nSpeak your questions and I'll answer them as your AI assistant.\n\n🎤 Send a voice message to start!",
    
    // Status
    status_vip: "👑 <b>VIP Status</b>\n\nYou have unlimited free access!",
    status_premium: "📊 <b>Your Status</b>\n\nPlan: Premium ✅\nMessages remaining: {remaining}\nTotal used: {used}",
    status_trial: "📊 <b>Your Status</b>\n\nPlan: Free Trial\nUsed: {used}/{total}\nRemaining: {remaining}",
    trial_ended: "\n\n⚠️ Free trial ended. Use /pay to continue.",
    
    // Payment
    pay_instructions: "💳 <b>Get Premium</b>\n\nSend <b>{amount} USDT</b> (TRC20) to:\n\n<code>{wallet}</code>\n\nYou'll get: <b>{messages} messages</b>\n\nAfter sending:\n<code>/verify YOUR_WALLET_ADDRESS</code>",
    verify_prompt: "❌ Please provide your TRON wallet address.\n\nExample: <code>/verify TXyz123...</code>",
    verify_checking: "🔍 Checking payment...",
    verify_success: "✅ <b>Payment Verified!</b>\n\nAmount: {amount} USDT\n\n🎉 You now have {messages} messages!",
    verify_failed: "❌ <b>Payment not found</b>\n\nMake sure:\n• You sent {amount} USDT (TRC20)\n• To: <code>{wallet}</code>\n• Wait 1-2 min for confirmation\n\nTry /verify again.",
    
    // Messages
    no_messages: "⚠️ <b>No messages left</b>\n\nGet {messages} more for <b>{amount} USDT</b>\n\nUse /pay for instructions.",
    messages_remaining: "\n\n⚠️ {count} message(s) left.",
    error: "Sorry, something went wrong. Please try again.",
    
    // Settings
    current_settings: "⚙️ <b>Your Settings</b>\n\n🌐 Language: {language}\n⚙️ Mode: {mode}\n📝 Format: {output}\n🎨 Tone: {tone}\n\nCommands: /language /mode /output /tone",
    current_settings_direct: "⚙️ <b>Your Settings</b>\n\n🌐 Language: {language}\n⚙️ Mode: {mode}\n\nUse /mode to change.",
    current_settings_light: "⚙️ <b>Your Settings</b>\n\n🌐 Language: {language}\n⚙️ Mode: {mode}\n\nUse /mode to change.",
    current_settings_ai_chat: "⚙️ <b>Your Settings</b>\n\n🌐 Language: {language}\n⚙️ Mode: AI Chat\n\nUse /mode to change."
  },

  fa: {
    name: "فارسی",
    flag: "🇮🇷",
    
    welcome: "🎙 <b>به Voxly خوش آمدید!</b>\n\nصدای خود را به متن تبدیل کنید.\n\nزبان خود را انتخاب کنید:",
    language_set: "✅ زبان فارسی تنظیم شد!",
    
    select_processing: "⚙️ <b>چگونه صدای شما را پردازش کنم؟</b>",
    processing_modes: {
      direct: "📝 مستقیم — فقط رونویسی، بدون تغییر",
      light: "✨ سبک — فقط اصلاح گرامر",
      enhanced: "🚀 پیشرفته — قالب‌بندی کامل",
      ai_chat: "🤖 چت هوش مصنوعی — سوال بپرسید"
    },
    processing_set: "✅ حالت: ",
    
    select_output: "📝 <b>چه فرمتی می‌خواهید؟</b>",
    output_types: {
      email: "📧 ایمیل",
      summary: "📋 خلاصه",
      notes: "📝 یادداشت",
      todo: "✅ لیست کارها",
      message: "💬 پیام",
      general: "📄 متن عمومی"
    },
    output_set: "✅ فرمت: ",
    
    select_tone: "🎨 <b>لحن ایمیل:</b>",
    tones: {
      professional: "👔 حرفه‌ای",
      casual: "😊 غیررسمی",
      friendly: "🤗 دوستانه",
      formal: "📜 رسمی"
    },
    tone_set: "✅ لحن: ",
    
    setup_complete_direct: "🎉 <b>آماده!</b>\n\nرونویسی دقیق بدون تغییر.\n\n🎤 یک پیام صوتی بفرستید!",
    setup_complete_light: "🎉 <b>آماده!</b>\n\nگرامر و کلمات اضافی اصلاح می‌شود.\n\n🎤 یک پیام صوتی بفرستید!",
    setup_complete_enhanced: "🎉 <b>آماده!</b>\n\nصدای شما به {output} تبدیل می‌شود.\n\n🎤 یک پیام صوتی بفرستید!",
    setup_complete_ai_chat: "🎉 <b>آماده!</b>\n\nسوالات خود را بپرسید.\n\n🎤 یک پیام صوتی بفرستید!",
    
    status_vip: "👑 <b>وضعیت VIP</b>\n\nدسترسی نامحدود!",
    status_premium: "📊 <b>وضعیت</b>\n\nپلن: پریمیوم ✅\nپیام‌های باقیمانده: {remaining}",
    status_trial: "📊 <b>وضعیت</b>\n\nپلن: رایگان\nاستفاده شده: {used}/{total}",
    trial_ended: "\n\n⚠️ دوره رایگان تمام شد. از /pay استفاده کنید.",
    
    pay_instructions: "💳 <b>پریمیوم</b>\n\n<b>{amount} USDT</b> به این آدرس بفرستید:\n\n<code>{wallet}</code>\n\nبعد از ارسال:\n<code>/verify آدرس_کیف_پول</code>",
    verify_prompt: "❌ آدرس کیف پول TRON را وارد کنید.",
    verify_checking: "🔍 بررسی پرداخت...",
    verify_success: "✅ <b>پرداخت تایید شد!</b>\n\n🎉 شما {messages} پیام دارید!",
    verify_failed: "❌ <b>پرداخت پیدا نشد</b>\n\nدوباره تلاش کنید.",
    
    no_messages: "⚠️ <b>پیامی باقی نمانده</b>\n\n/pay برای خرید",
    messages_remaining: "\n\n⚠️ {count} پیام باقی مانده.",
    error: "خطایی رخ داد. دوباره تلاش کنید.",
    
    current_settings: "⚙️ <b>تنظیمات</b>\n\n🌐 زبان: {language}\n⚙️ حالت: {mode}\n📝 فرمت: {output}",
    current_settings_direct: "⚙️ <b>تنظیمات</b>\n\n🌐 زبان: {language}\n⚙️ حالت: مستقیم",
    current_settings_light: "⚙️ <b>تنظیمات</b>\n\n🌐 زبان: {language}\n⚙️ حالت: سبک",
    current_settings_ai_chat: "⚙️ <b>تنظیمات</b>\n\n🌐 زبان: {language}\n⚙️ حالت: چت هوش مصنوعی"
  },

  de: {
    name: "Deutsch",
    flag: "🇩🇪",
    
    welcome: "🎙 <b>Willkommen bei Voxly!</b>\n\nVerwandeln Sie Ihre Stimme in Text.\n\nBitte wählen Sie Ihre Sprache:",
    language_set: "✅ Sprache auf Deutsch gesetzt!",
    
    select_processing: "⚙️ <b>Wie soll ich Ihre Stimme verarbeiten?</b>",
    processing_modes: {
      direct: "📝 Direkt — Nur Transkription",
      light: "✨ Leicht — Grammatik korrigieren",
      enhanced: "🚀 Erweitert — Vollständige Formatierung",
      ai_chat: "🤖 KI-Chat — Fragen stellen"
    },
    processing_set: "✅ Modus: ",
    
    select_output: "📝 <b>Welches Format möchten Sie?</b>",
    output_types: {
      email: "📧 E-Mail",
      summary: "📋 Zusammenfassung",
      notes: "📝 Notizen",
      todo: "✅ Aufgabenliste",
      message: "💬 Nachricht",
      general: "📄 Allgemeiner Text"
    },
    output_set: "✅ Format: ",
    
    select_tone: "🎨 <b>E-Mail-Ton wählen:</b>",
    tones: {
      professional: "👔 Professionell",
      casual: "😊 Locker",
      friendly: "🤗 Freundlich",
      formal: "📜 Formell"
    },
    tone_set: "✅ Ton: ",
    
    setup_complete_direct: "🎉 <b>Bereit!</b>\n\nExakte Transkription ohne Änderungen.\n\n🎤 Senden Sie eine Sprachnachricht!",
    setup_complete_light: "🎉 <b>Bereit!</b>\n\nGrammatik und Füllwörter werden korrigiert.\n\n🎤 Senden Sie eine Sprachnachricht!",
    setup_complete_enhanced: "🎉 <b>Bereit!</b>\n\nIhre Stimme wird als {output} formatiert.\n\n🎤 Senden Sie eine Sprachnachricht!",
    setup_complete_ai_chat: "🎉 <b>Bereit!</b>\n\nStellen Sie Ihre Fragen.\n\n🎤 Senden Sie eine Sprachnachricht!",
    
    status_vip: "👑 <b>VIP-Status</b>\n\nUnbegrenzter Zugang!",
    status_premium: "📊 <b>Status</b>\n\nPlan: Premium ✅\nVerbleibend: {remaining}",
    status_trial: "📊 <b>Status</b>\n\nPlan: Kostenlos\nGenutzt: {used}/{total}",
    trial_ended: "\n\n⚠️ Testphase beendet. /pay für Premium.",
    
    pay_instructions: "💳 <b>Premium</b>\n\nSenden Sie <b>{amount} USDT</b> an:\n\n<code>{wallet}</code>",
    verify_prompt: "❌ Bitte geben Sie Ihre TRON-Wallet-Adresse an.",
    verify_checking: "🔍 Zahlung wird überprüft...",
    verify_success: "✅ <b>Zahlung bestätigt!</b>\n\n🎉 Sie haben {messages} Nachrichten!",
    verify_failed: "❌ <b>Zahlung nicht gefunden</b>",
    
    no_messages: "⚠️ <b>Keine Nachrichten übrig</b>\n\n/pay für mehr",
    messages_remaining: "\n\n⚠️ {count} Nachricht(en) übrig.",
    error: "Fehler aufgetreten. Bitte erneut versuchen.",
    
    current_settings: "⚙️ <b>Einstellungen</b>\n\n🌐 Sprache: {language}\n⚙️ Modus: {mode}",
    current_settings_direct: "⚙️ <b>Einstellungen</b>\n\n🌐 Sprache: {language}\n⚙️ Modus: Direkt",
    current_settings_light: "⚙️ <b>Einstellungen</b>\n\n🌐 Sprache: {language}\n⚙️ Modus: Leicht",
    current_settings_ai_chat: "⚙️ <b>Einstellungen</b>\n\n🌐 Sprache: {language}\n⚙️ Modus: KI-Chat"
  },

  es: {
    name: "Español",
    flag: "🇪🇸",
    
    welcome: "🎙 <b>¡Bienvenido a Voxly!</b>\n\nConvierte tu voz en texto.\n\nSelecciona tu idioma:",
    language_set: "✅ Idioma configurado: Español",
    
    select_processing: "⚙️ <b>¿Cómo proceso tu voz?</b>",
    processing_modes: {
      direct: "📝 Directo — Solo transcripción",
      light: "✨ Ligero — Corregir gramática",
      enhanced: "🚀 Avanzado — Formato completo",
      ai_chat: "🤖 Chat IA — Hacer preguntas"
    },
    processing_set: "✅ Modo: ",
    
    select_output: "📝 <b>¿Qué formato quieres?</b>",
    output_types: {
      email: "📧 Correo",
      summary: "📋 Resumen",
      notes: "📝 Notas",
      todo: "✅ Lista de tareas",
      message: "💬 Mensaje",
      general: "📄 Texto general"
    },
    output_set: "✅ Formato: ",
    
    select_tone: "🎨 <b>Tono del correo:</b>",
    tones: {
      professional: "👔 Profesional",
      casual: "😊 Casual",
      friendly: "🤗 Amigable",
      formal: "📜 Formal"
    },
    tone_set: "✅ Tono: ",
    
    setup_complete_direct: "🎉 <b>¡Listo!</b>\n\nTranscripción exacta sin cambios.\n\n🎤 ¡Envía un mensaje de voz!",
    setup_complete_light: "🎉 <b>¡Listo!</b>\n\nCorregiré gramática y muletillas.\n\n🎤 ¡Envía un mensaje de voz!",
    setup_complete_enhanced: "🎉 <b>¡Listo!</b>\n\nTu voz será formateada como {output}.\n\n🎤 ¡Envía un mensaje de voz!",
    setup_complete_ai_chat: "🎉 <b>¡Listo!</b>\n\nHaz tus preguntas.\n\n🎤 ¡Envía un mensaje de voz!",
    
    status_vip: "👑 <b>Estado VIP</b>\n\n¡Acceso ilimitado!",
    status_premium: "📊 <b>Estado</b>\n\nPlan: Premium ✅\nRestantes: {remaining}",
    status_trial: "📊 <b>Estado</b>\n\nPlan: Gratis\nUsados: {used}/{total}",
    trial_ended: "\n\n⚠️ Prueba terminada. /pay para premium.",
    
    pay_instructions: "💳 <b>Premium</b>\n\nEnvía <b>{amount} USDT</b> a:\n\n<code>{wallet}</code>",
    verify_prompt: "❌ Proporciona tu dirección de wallet TRON.",
    verify_checking: "🔍 Verificando pago...",
    verify_success: "✅ <b>¡Pago verificado!</b>\n\n🎉 ¡Tienes {messages} mensajes!",
    verify_failed: "❌ <b>Pago no encontrado</b>",
    
    no_messages: "⚠️ <b>Sin mensajes</b>\n\n/pay para más",
    messages_remaining: "\n\n⚠️ {count} mensaje(s) restante(s).",
    error: "Error. Intenta de nuevo.",
    
    current_settings: "⚙️ <b>Configuración</b>\n\n🌐 Idioma: {language}\n⚙️ Modo: {mode}",
    current_settings_direct: "⚙️ <b>Configuración</b>\n\n🌐 Idioma: {language}\n⚙️ Modo: Directo",
    current_settings_light: "⚙️ <b>Configuración</b>\n\n🌐 Idioma: {language}\n⚙️ Modo: Ligero",
    current_settings_ai_chat: "⚙️ <b>Configuración</b>\n\n🌐 Idioma: {language}\n⚙️ Modo: Chat IA"
  },

  fr: {
    name: "Français",
    flag: "🇫🇷",
    
    welcome: "🎙 <b>Bienvenue sur Voxly!</b>\n\nTransformez votre voix en texte.\n\nChoisissez votre langue:",
    language_set: "✅ Langue: Français",
    
    select_processing: "⚙️ <b>Comment traiter votre voix?</b>",
    processing_modes: {
      direct: "📝 Direct — Transcription seule",
      light: "✨ Léger — Corriger grammaire",
      enhanced: "🚀 Avancé — Formatage complet",
      ai_chat: "🤖 Chat IA — Poser des questions"
    },
    processing_set: "✅ Mode: ",
    
    select_output: "📝 <b>Quel format voulez-vous?</b>",
    output_types: {
      email: "📧 E-mail",
      summary: "📋 Résumé",
      notes: "📝 Notes",
      todo: "✅ Liste de tâches",
      message: "💬 Message",
      general: "📄 Texte général"
    },
    output_set: "✅ Format: ",
    
    select_tone: "🎨 <b>Ton de l'e-mail:</b>",
    tones: {
      professional: "👔 Professionnel",
      casual: "😊 Décontracté",
      friendly: "🤗 Amical",
      formal: "📜 Formel"
    },
    tone_set: "✅ Ton: ",
    
    setup_complete_direct: "🎉 <b>Prêt!</b>\n\nTranscription exacte.\n\n🎤 Envoyez un message vocal!",
    setup_complete_light: "🎉 <b>Prêt!</b>\n\nGrammaire corrigée.\n\n🎤 Envoyez un message vocal!",
    setup_complete_enhanced: "🎉 <b>Prêt!</b>\n\nVotre voix sera formatée en {output}.\n\n🎤 Envoyez un message vocal!",
    setup_complete_ai_chat: "🎉 <b>Prêt!</b>\n\nPosez vos questions.\n\n🎤 Envoyez un message vocal!",
    
    status_vip: "👑 <b>Statut VIP</b>\n\nAccès illimité!",
    status_premium: "📊 <b>Statut</b>\n\nPlan: Premium ✅\nRestants: {remaining}",
    status_trial: "📊 <b>Statut</b>\n\nPlan: Gratuit\nUtilisés: {used}/{total}",
    trial_ended: "\n\n⚠️ Essai terminé. /pay pour premium.",
    
    pay_instructions: "💳 <b>Premium</b>\n\nEnvoyez <b>{amount} USDT</b> à:\n\n<code>{wallet}</code>",
    verify_prompt: "❌ Fournissez votre adresse TRON.",
    verify_checking: "🔍 Vérification...",
    verify_success: "✅ <b>Paiement vérifié!</b>\n\n🎉 Vous avez {messages} messages!",
    verify_failed: "❌ <b>Paiement non trouvé</b>",
    
    no_messages: "⚠️ <b>Plus de messages</b>\n\n/pay pour plus",
    messages_remaining: "\n\n⚠️ {count} message(s) restant(s).",
    error: "Erreur. Réessayez.",
    
    current_settings: "⚙️ <b>Paramètres</b>\n\n🌐 Langue: {language}\n⚙️ Mode: {mode}",
    current_settings_direct: "⚙️ <b>Paramètres</b>\n\n🌐 Langue: {language}\n⚙️ Mode: Direct",
    current_settings_light: "⚙️ <b>Paramètres</b>\n\n🌐 Langue: {language}\n⚙️ Mode: Léger",
    current_settings_ai_chat: "⚙️ <b>Paramètres</b>\n\n🌐 Langue: {language}\n⚙️ Mode: Chat IA"
  },

  ar: {
    name: "العربية",
    flag: "🇸🇦",
    
    welcome: "🎙 <b>مرحباً بك في Voxly!</b>\n\nحوّل صوتك إلى نص.\n\nاختر لغتك:",
    language_set: "✅ تم تعيين اللغة: العربية",
    
    select_processing: "⚙️ <b>كيف أعالج صوتك؟</b>",
    processing_modes: {
      direct: "📝 مباشر — نسخ فقط",
      light: "✨ خفيف — تصحيح القواعد",
      enhanced: "🚀 متقدم — تنسيق كامل",
      ai_chat: "🤖 دردشة ذكية — اطرح أسئلة"
    },
    processing_set: "✅ الوضع: ",
    
    select_output: "📝 <b>ما التنسيق المطلوب؟</b>",
    output_types: {
      email: "📧 بريد إلكتروني",
      summary: "📋 ملخص",
      notes: "📝 ملاحظات",
      todo: "✅ قائمة مهام",
      message: "💬 رسالة",
      general: "📄 نص عام"
    },
    output_set: "✅ التنسيق: ",
    
    select_tone: "🎨 <b>نبرة البريد:</b>",
    tones: {
      professional: "👔 مهني",
      casual: "😊 عادي",
      friendly: "🤗 ودي",
      formal: "📜 رسمي"
    },
    tone_set: "✅ النبرة: ",
    
    setup_complete_direct: "🎉 <b>جاهز!</b>\n\nنسخ دقيق بدون تغيير.\n\n🎤 أرسل رسالة صوتية!",
    setup_complete_light: "🎉 <b>جاهز!</b>\n\nسيتم تصحيح القواعد.\n\n🎤 أرسل رسالة صوتية!",
    setup_complete_enhanced: "🎉 <b>جاهز!</b>\n\nسيتم تنسيق صوتك كـ {output}.\n\n🎤 أرسل رسالة صوتية!",
    setup_complete_ai_chat: "🎉 <b>جاهز!</b>\n\nاطرح أسئلتك.\n\n🎤 أرسل رسالة صوتية!",
    
    status_vip: "👑 <b>حالة VIP</b>\n\nوصول غير محدود!",
    status_premium: "📊 <b>الحالة</b>\n\nالخطة: بريميوم ✅\nالمتبقي: {remaining}",
    status_trial: "📊 <b>الحالة</b>\n\nالخطة: مجاني\nالمستخدم: {used}/{total}",
    trial_ended: "\n\n⚠️ انتهت الفترة المجانية. /pay للترقية.",
    
    pay_instructions: "💳 <b>بريميوم</b>\n\nأرسل <b>{amount} USDT</b> إلى:\n\n<code>{wallet}</code>",
    verify_prompt: "❌ أدخل عنوان محفظة TRON.",
    verify_checking: "🔍 جاري التحقق...",
    verify_success: "✅ <b>تم التحقق!</b>\n\n🎉 لديك {messages} رسالة!",
    verify_failed: "❌ <b>لم يتم العثور على الدفع</b>",
    
    no_messages: "⚠️ <b>لا رسائل متبقية</b>\n\n/pay للمزيد",
    messages_remaining: "\n\n⚠️ {count} رسالة متبقية.",
    error: "حدث خطأ. حاول مرة أخرى.",
    
    current_settings: "⚙️ <b>الإعدادات</b>\n\n🌐 اللغة: {language}\n⚙️ الوضع: {mode}",
    current_settings_direct: "⚙️ <b>الإعدادات</b>\n\n🌐 اللغة: {language}\n⚙️ الوضع: مباشر",
    current_settings_light: "⚙️ <b>الإعدادات</b>\n\n🌐 اللغة: {language}\n⚙️ الوضع: خفيف",
    current_settings_ai_chat: "⚙️ <b>الإعدادات</b>\n\n🌐 اللغة: {language}\n⚙️ الوضع: دردشة ذكية"
  },

  tr: {
    name: "Türkçe",
    flag: "🇹🇷",
    
    welcome: "🎙 <b>Voxly'ye Hoş Geldiniz!</b>\n\nSesinizi metne dönüştürün.\n\nDilinizi seçin:",
    language_set: "✅ Dil: Türkçe",
    
    select_processing: "⚙️ <b>Sesinizi nasıl işleyeyim?</b>",
    processing_modes: {
      direct: "📝 Doğrudan — Sadece transkript",
      light: "✨ Hafif — Gramer düzeltme",
      enhanced: "🚀 Gelişmiş — Tam biçimlendirme",
      ai_chat: "🤖 AI Sohbet — Soru sorun"
    },
    processing_set: "✅ Mod: ",
    
    select_output: "📝 <b>Hangi format?</b>",
    output_types: {
      email: "📧 E-posta",
      summary: "📋 Özet",
      notes: "📝 Notlar",
      todo: "✅ Yapılacaklar",
      message: "💬 Mesaj",
      general: "📄 Genel Metin"
    },
    output_set: "✅ Format: ",
    
    select_tone: "🎨 <b>E-posta tonu:</b>",
    tones: {
      professional: "👔 Profesyonel",
      casual: "😊 Rahat",
      friendly: "🤗 Dostça",
      formal: "📜 Resmi"
    },
    tone_set: "✅ Ton: ",
    
    setup_complete_direct: "🎉 <b>Hazır!</b>\n\nDeğişiklik olmadan tam transkript.\n\n🎤 Sesli mesaj gönderin!",
    setup_complete_light: "🎉 <b>Hazır!</b>\n\nGramer düzeltilecek.\n\n🎤 Sesli mesaj gönderin!",
    setup_complete_enhanced: "🎉 <b>Hazır!</b>\n\nSesiniz {output} olarak biçimlendirilecek.\n\n🎤 Sesli mesaj gönderin!",
    setup_complete_ai_chat: "🎉 <b>Hazır!</b>\n\nSorularınızı sorun.\n\n🎤 Sesli mesaj gönderin!",
    
    status_vip: "👑 <b>VIP Durum</b>\n\nSınırsız erişim!",
    status_premium: "📊 <b>Durum</b>\n\nPlan: Premium ✅\nKalan: {remaining}",
    status_trial: "📊 <b>Durum</b>\n\nPlan: Ücretsiz\nKullanılan: {used}/{total}",
    trial_ended: "\n\n⚠️ Deneme bitti. Premium için /pay.",
    
    pay_instructions: "💳 <b>Premium</b>\n\n<b>{amount} USDT</b> gönderin:\n\n<code>{wallet}</code>",
    verify_prompt: "❌ TRON cüzdan adresinizi girin.",
    verify_checking: "🔍 Kontrol ediliyor...",
    verify_success: "✅ <b>Ödeme doğrulandı!</b>\n\n🎉 {messages} mesajınız var!",
    verify_failed: "❌ <b>Ödeme bulunamadı</b>",
    
    no_messages: "⚠️ <b>Mesaj kalmadı</b>\n\nDaha fazlası için /pay",
    messages_remaining: "\n\n⚠️ {count} mesaj kaldı.",
    error: "Hata. Tekrar deneyin.",
    
    current_settings: "⚙️ <b>Ayarlar</b>\n\n🌐 Dil: {language}\n⚙️ Mod: {mode}",
    current_settings_direct: "⚙️ <b>Ayarlar</b>\n\n🌐 Dil: {language}\n⚙️ Mod: Doğrudan",
    current_settings_light: "⚙️ <b>Ayarlar</b>\n\n🌐 Dil: {language}\n⚙️ Mod: Hafif",
    current_settings_ai_chat: "⚙️ <b>Ayarlar</b>\n\n🌐 Dil: {language}\n⚙️ Mod: AI Sohbet"
  },

  ru: {
    name: "Русский",
    flag: "🇷🇺",
    
    welcome: "🎙 <b>Добро пожаловать в Voxly!</b>\n\nПревратите голос в текст.\n\nВыберите язык:",
    language_set: "✅ Язык: Русский",
    
    select_processing: "⚙️ <b>Как обработать голос?</b>",
    processing_modes: {
      direct: "📝 Прямой — Только транскрипция",
      light: "✨ Лёгкий — Исправить грамматику",
      enhanced: "🚀 Расширенный — Полное форматирование",
      ai_chat: "🤖 ИИ Чат — Задать вопросы"
    },
    processing_set: "✅ Режим: ",
    
    select_output: "📝 <b>Какой формат?</b>",
    output_types: {
      email: "📧 Email",
      summary: "📋 Резюме",
      notes: "📝 Заметки",
      todo: "✅ Список дел",
      message: "💬 Сообщение",
      general: "📄 Общий текст"
    },
    output_set: "✅ Формат: ",
    
    select_tone: "🎨 <b>Тон письма:</b>",
    tones: {
      professional: "👔 Профессиональный",
      casual: "😊 Неформальный",
      friendly: "🤗 Дружелюбный",
      formal: "📜 Официальный"
    },
    tone_set: "✅ Тон: ",
    
    setup_complete_direct: "🎉 <b>Готово!</b>\n\nТочная транскрипция без изменений.\n\n🎤 Отправьте голосовое сообщение!",
    setup_complete_light: "🎉 <b>Готово!</b>\n\nГрамматика будет исправлена.\n\n🎤 Отправьте голосовое сообщение!",
    setup_complete_enhanced: "🎉 <b>Готово!</b>\n\nВаш голос будет отформатирован как {output}.\n\n🎤 Отправьте голосовое сообщение!",
    setup_complete_ai_chat: "🎉 <b>Готово!</b>\n\nЗадавайте вопросы.\n\n🎤 Отправьте голосовое сообщение!",
    
    status_vip: "👑 <b>VIP Статус</b>\n\nБезлимитный доступ!",
    status_premium: "📊 <b>Статус</b>\n\nПлан: Премиум ✅\nОсталось: {remaining}",
    status_trial: "📊 <b>Статус</b>\n\nПлан: Бесплатный\nИспользовано: {used}/{total}",
    trial_ended: "\n\n⚠️ Пробный период закончился. /pay для премиума.",
    
    pay_instructions: "💳 <b>Премиум</b>\n\nОтправьте <b>{amount} USDT</b> на:\n\n<code>{wallet}</code>",
    verify_prompt: "❌ Укажите адрес TRON кошелька.",
    verify_checking: "🔍 Проверка...",
    verify_success: "✅ <b>Платёж подтверждён!</b>\n\n🎉 У вас {messages} сообщений!",
    verify_failed: "❌ <b>Платёж не найден</b>",
    
    no_messages: "⚠️ <b>Сообщения закончились</b>\n\n/pay для пополнения",
    messages_remaining: "\n\n⚠️ Осталось {count} сообщений.",
    error: "Ошибка. Попробуйте снова.",
    
    current_settings: "⚙️ <b>Настройки</b>\n\n🌐 Язык: {language}\n⚙️ Режим: {mode}",
    current_settings_direct: "⚙️ <b>Настройки</b>\n\n🌐 Язык: {language}\n⚙️ Режим: Прямой",
    current_settings_light: "⚙️ <b>Настройки</b>\n\n🌐 Язык: {language}\n⚙️ Режим: Лёгкий",
    current_settings_ai_chat: "⚙️ <b>Настройки</b>\n\n🌐 Язык: {language}\n⚙️ Режим: ИИ Чат"
  },

  zh: {
    name: "中文",
    flag: "🇨🇳",
    
    welcome: "🎙 <b>欢迎使用 Voxly!</b>\n\n将语音转换为文字。\n\n请选择语言:",
    language_set: "✅ 语言: 中文",
    
    select_processing: "⚙️ <b>如何处理您的语音?</b>",
    processing_modes: {
      direct: "📝 直接 — 仅转录",
      light: "✨ 轻度 — 修正语法",
      enhanced: "🚀 增强 — 完整格式化",
      ai_chat: "🤖 AI聊天 — 提问"
    },
    processing_set: "✅ 模式: ",
    
    select_output: "📝 <b>选择格式:</b>",
    output_types: {
      email: "📧 邮件",
      summary: "📋 摘要",
      notes: "📝 笔记",
      todo: "✅ 待办事项",
      message: "💬 消息",
      general: "📄 通用文本"
    },
    output_set: "✅ 格式: ",
    
    select_tone: "🎨 <b>邮件语气:</b>",
    tones: {
      professional: "👔 专业",
      casual: "😊 随意",
      friendly: "🤗 友好",
      formal: "📜 正式"
    },
    tone_set: "✅ 语气: ",
    
    setup_complete_direct: "🎉 <b>准备就绪!</b>\n\n精确转录，不做更改。\n\n🎤 发送语音消息!",
    setup_complete_light: "🎉 <b>准备就绪!</b>\n\n将修正语法。\n\n🎤 发送语音消息!",
    setup_complete_enhanced: "🎉 <b>准备就绪!</b>\n\n您的语音将被格式化为 {output}。\n\n🎤 发送语音消息!",
    setup_complete_ai_chat: "🎉 <b>准备就绪!</b>\n\n提出您的问题。\n\n🎤 发送语音消息!",
    
    status_vip: "👑 <b>VIP状态</b>\n\n无限访问!",
    status_premium: "📊 <b>状态</b>\n\n计划: 高级 ✅\n剩余: {remaining}",
    status_trial: "📊 <b>状态</b>\n\n计划: 免费\n已用: {used}/{total}",
    trial_ended: "\n\n⚠️ 试用结束。/pay 升级。",
    
    pay_instructions: "💳 <b>高级版</b>\n\n发送 <b>{amount} USDT</b> 到:\n\n<code>{wallet}</code>",
    verify_prompt: "❌ 请提供您的TRON钱包地址。",
    verify_checking: "🔍 验证中...",
    verify_success: "✅ <b>支付已验证!</b>\n\n🎉 您有 {messages} 条消息!",
    verify_failed: "❌ <b>未找到支付</b>",
    
    no_messages: "⚠️ <b>没有剩余消息</b>\n\n/pay 获取更多",
    messages_remaining: "\n\n⚠️ 剩余 {count} 条消息。",
    error: "错误。请重试。",
    
    current_settings: "⚙️ <b>设置</b>\n\n🌐 语言: {language}\n⚙️ 模式: {mode}",
    current_settings_direct: "⚙️ <b>设置</b>\n\n🌐 语言: {language}\n⚙️ 模式: 直接",
    current_settings_light: "⚙️ <b>设置</b>\n\n🌐 语言: {language}\n⚙️ 模式: 轻度",
    current_settings_ai_chat: "⚙️ <b>设置</b>\n\n🌐 语言: {language}\n⚙️ 模式: AI聊天"
  }
};

// Helper function to get translation
export function t(lang, key, vars = {}) {
  const keys = key.split('.');
  let value = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  if (!value) {
    value = translations.en;
    for (const k of keys) {
      value = value?.[k];
    }
  }
  
  if (typeof value === 'string') {
    return value.replace(/\{(\w+)\}/g, (match, varName) => vars[varName] ?? match);
  }
  
  return value || key;
}

export function getLanguageButtons() {
  return Object.entries(translations).map(([code, lang]) => ({
    code,
    name: lang.name,
    flag: lang.flag
  }));
}
