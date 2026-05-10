// ==========================================
// قاموس الترجمة الشامل لكل صفحات التطبيق
// ==========================================
const translations = {
    ar: {
        // نصوص Login
        welcome_title_login: "كوميوني-كيد 🚀", welcome_subtitle_login: "مرحباً بعودتك يا بطل!", login_btn: "تسجيل الدخول السريع", new_user: "أول مرة هنا؟", create_account_link: "أنشئ حساباً جديداً",
        // نصوص Signup
        welcome_title_signup: "انضم لعالمنا 🌟", welcome_subtitle_signup: "اختر نوع حسابك لنبدأ الرحلة", role_parent: "👨‍👩‍👦 ولي أمر", role_therapist: "👨‍⚕️ أخصائي", fullname_label: "الاسم بالكامل", fullname_placeholder: "أدخل اسمك", child_age_label: "سن الطفل", child_age_placeholder: "عمر الطفل بالسنوات", child_condition_label: "حالة البطل", cond_speech: "تأخر في النطق", cond_autism: "طيف توحد", specialty_label: "التخصص الدقيق", specialty_placeholder: "مثال: أخصائي تخاطب، تعديل سلوك", gender_label: "النوع", gender_male: "ذكر", gender_female: "أنثى", signup_btn: "إنشاء الحساب الآن", have_account: "لديك حساب بالفعل؟", login_link: "تسجيل الدخول", email_label: "البريد الإلكتروني", email_placeholder: "أدخل بريدك الإلكتروني", password_label: "كلمة المرور", password_placeholder: "أدخل كلمة المرور",
        // Navbar & General
        back: "⬅️ رجوع", home_back: "⬅️ العودة للرئيسية", logout: "تسجيل الخروج 🚪", points: "نقطة", market: "🛒 الماركت", settings: "⚙️ الإعدادات", add_word: "➕ إضافة كلمة",
        // Parent Home
        welcome: "أهلاً بك يا", hero_title: "اختار التصنيف 📚", sentence_placeholder: "اضغط على الكروت لتكوين جملة...", play_btn: "🔊 انطق الجملة", mic_btn: "🎤 جرب بصوتك", clear_btn: "🗑️ مسح",
        // Settings Page
        settings_title: "إعدادات العظمة ✨⚙️", settings_sub: "إدارة حسابك الشخصي وبيانات الأبطال", edit_profile: "تعديل الملف الشخصي ✏️", power_points: "نقطة قوة", days_streak: "يوم متواصل", logout_safe: "تسجيل الخروج الآمن 🚪",
        card_hero: "بيانات البطل", desc_hero: "تحرير اسم، عمر، وحالة طفلك الصحية", card_notify: "نظام التنبيهات", desc_notify: "إدارة إشعارات الجلسات والتقدم اليومي", card_privacy: "الخصوصية والأمان", desc_privacy: "حماية حسابك وتغيير كلمة المرور السرية", card_fav: "المفضلة", desc_fav: "الوصول السريع للكلمات التي يحبها بطلنا", card_achieve: "الإنجازات", desc_achieve: "استعراض كل الأوسمة التي حصل عليها البطل", card_premium: "الاشتراك المميز", desc_premium: "إدارة خطة الدفع والوصول للمحتوى الحصري",
        // Market
        market_title: "خزانة ملابس البطل 🦸‍♂️", shirts: "التيشيرتات 👕", hats: "القبعات 👑", glasses: "النظارات 😎", buy: "شراء", owned: "تم الشراء ✅", equipped: "ملبوس ✔️", balance: "⭐ رصيدك:", rotate_hint: "(اسحب الشخصية بالماوس عشان تلفها! 🔄)",
        
        // --- الإضافات الجديدة الخاصة بلوحة الأخصائي وولي الأمر (تم توليدها بالذكاء الاصطناعي) ---
        // القوائم
        nav_home: "الرئيسية", nav_patients: "مرضاي", nav_tasks: "المهام", nav_messages: "الرسائل", nav_appointments: "المواعيد",
        // لوحة الأخصائي الرئيسية
        therapist_welcome: "أهلاً د.", therapist_sub: "إليك ملخص سريع لنشاط عيادتك اليوم.",
        total_cases: "إجمالي الحالات", today_sessions: "جلسات اليوم", unread_msgs: "رسائل غير مقروءة",
        latest_activity: "أحدث نشاط للأبطال 📈", hero_name_th: "اسم البطل", earned_points: "النقاط المكتسبة", completed_tasks: "المهام المنجزة", improvement_index: "مؤشر التحسن", view_all_cases: "عرض كل الحالات",
        // إدارة المرضى
        heroes_list: "قائمة الأبطال 👦👧", heroes_list_sub: "متابعة أداء الأطفال وإدارة ملفاتهم الطبية", add_new_hero: "➕ إضافة بطل جديد",
        total_points: "إجمالي النقاط", email_th: "البريد", open_reports: "فتح التقارير 📈", send_task: "إرسال مهمة ➕",
        // المهام
        assign_tasks: "إسناد مهام جديدة 📝", assign_tasks_sub: "حدد التدريبات المطلوبة من الأبطال لتنفيذها في المنزل.",
        select_hero: "اختار البطل", task_type: "نوع المهمة", task_content: "محتوى المهمة", send_task_now: "إرسال المهمة الآن 🚀",
        current_tasks: "المهام الحالية 📋", task_completed: "تم الإنجاز ✅", task_pending: "قيد الانتظار ⏳", delete_btn: "حذف 🗑️",
        // المواعيد
        appointments_agenda: "أجندة المواعيد 📅", book_appointment: "➕ حجز موعد جديد", upcoming_sessions: "الجلسات القادمة",
        date_label: "التاريخ", time_label: "الوقت", session_type: "نوع الجلسة", confirm_booking: "تأكيد الحجز ✅",
        in_clinic: "في العيادة 🏥", online_session: "أونلاين 💻",
        // مهام ولي الأمر
        hero_tasks_title: "مهام البطل 🎯", required_tasks: "المهام المطلوبة ⏳", completed_tasks_sec: "المهام المنجزة ✅",
        manual_complete: "إنجاز يدوياً 🎯", speech_train: "تدريب نطق 🎤",
        // الرسائل
        contact_therapist: "التواصل مع الأخصائي 💬", chats_title: "المحادثات 💬", type_message: "اكتب رسالتك هنا...", send_btn: "إرسال 🚀",
        // إعدادات الأخصائي
        prof_name: "الاسم المهني", specialty_th: "التخصص", new_pass: "كلمة المرور الجديدة", save_changes: "حفظ التغييرات ✅",
        therapist_code: "🔑 كود الأخصائي الخاص بك", copy_code: "نسخ الكود"
    },
    en: {
        // Login Texts
        welcome_title_login: "CommuniKID 🚀", welcome_subtitle_login: "Welcome back, Hero!", login_btn: "Quick Login", new_user: "First time here?", create_account_link: "Create a new account",
        // Signup Texts
        welcome_title_signup: "Join Our World 🌟", welcome_subtitle_signup: "Choose your account type to start", role_parent: "👨‍👩‍👦 Parent", role_therapist: "👨‍⚕️ Therapist", fullname_label: "Full Name", fullname_placeholder: "Enter your name", child_age_label: "Child's Age", child_age_placeholder: "Age in years", child_condition_label: "Hero's Condition", cond_speech: "Speech Delay", cond_autism: "Autism Spectrum", specialty_label: "Specialty", specialty_placeholder: "e.g., Speech Therapist", gender_label: "Gender", gender_male: "Male", gender_female: "Female", signup_btn: "Create Account Now", have_account: "Already have an account?", login_link: "Login", email_label: "Email Address", email_placeholder: "Enter your email", password_label: "Password", password_placeholder: "Enter your password",
        // Navbar & General
        back: "⬅️ Back", home_back: "⬅️ Back Home", logout: "Logout 🚪", points: "Points", market: "🛒 Market", settings: "⚙️ Settings", add_word: "➕ Add Word",
        // Parent Home
        welcome: "Welcome, ", hero_title: "Choose Category 📚", sentence_placeholder: "Click cards to build a sentence...", play_btn: "🔊 Play Sentence", mic_btn: "🎤 Use Mic", clear_btn: "🗑️ Clear",
        // Settings Page
        settings_title: "Greatness Settings ✨⚙️", settings_sub: "Manage your personal account and heroes' data", edit_profile: "Edit Profile ✏️", power_points: "Power Points", days_streak: "Days Streak", logout_safe: "Safe Logout 🚪",
        card_hero: "Hero Data", desc_hero: "Edit your child's name, age, and health status", card_notify: "Notification System", desc_notify: "Manage session alerts and daily progress", card_privacy: "Privacy & Security", desc_privacy: "Protect your account and change your password", card_fav: "Favorites", desc_fav: "Quick access to the words our hero loves", card_achieve: "Achievements", desc_achieve: "Review all the medals the hero has earned", card_premium: "Premium Subscription", desc_premium: "Manage your payment plan and exclusive content",
        // Market
        market_title: "Hero Wardrobe 🦸‍♂️", shirts: "Shirts 👕", hats: "Hats 👑", glasses: "Glasses 😎", buy: "Buy", owned: "Owned ✅", equipped: "Equipped ✔️", balance: "⭐ Balance:", rotate_hint: "(Drag the character to rotate! 🔄)",

        // --- NEW ADDITIONS FOR THERAPIST & PARENT DASHBOARDS ---
        // Navigation
        nav_home: "Home", nav_patients: "My Patients", nav_tasks: "Tasks", nav_messages: "Messages", nav_appointments: "Appointments",
        // Therapist Home
        therapist_welcome: "Welcome Dr.", therapist_sub: "Here is a quick summary of your clinic's activity today.",
        total_cases: "Total Cases", today_sessions: "Today's Sessions", unread_msgs: "Unread Messages",
        latest_activity: "Heroes' Latest Activity 📈", hero_name_th: "Hero Name", earned_points: "Earned Points", completed_tasks: "Completed Tasks", improvement_index: "Improvement", view_all_cases: "View All Cases",
        // Patients
        heroes_list: "Heroes List 👦👧", heroes_list_sub: "Monitor children's performance and manage medical files", add_new_hero: "➕ Add New Hero",
        total_points: "Total Points", email_th: "Email", open_reports: "Open Reports 📈", send_task: "Send Task ➕",
        // Tasks
        assign_tasks: "Assign New Tasks 📝", assign_tasks_sub: "Select exercises for heroes to perform at home.",
        select_hero: "Select Hero", task_type: "Task Type", task_content: "Task Content", send_task_now: "Send Task Now 🚀",
        current_tasks: "Current Tasks 📋", task_completed: "Completed ✅", task_pending: "Pending ⏳", delete_btn: "Delete 🗑️",
        // Appointments
        appointments_agenda: "Appointments Agenda 📅", book_appointment: "➕ Book Appointment", upcoming_sessions: "Upcoming Sessions",
        date_label: "Date", time_label: "Time", session_type: "Session Type", confirm_booking: "Confirm Booking ✅",
        in_clinic: "In Clinic 🏥", online_session: "Online 💻",
        // Parent Tasks
        hero_tasks_title: "Hero's Tasks 🎯", required_tasks: "Required Tasks ⏳", completed_tasks_sec: "Completed Tasks ✅",
        manual_complete: "Complete Manually 🎯", speech_train: "Speech Training 🎤",
        // Chat
        contact_therapist: "Contact Therapist 💬", chats_title: "Chats 💬", type_message: "Type your message here...", send_btn: "Send 🚀",
        // Settings
        prof_name: "Professional Name", specialty_th: "Specialty", new_pass: "New Password", save_changes: "Save Changes ✅",
        therapist_code: "🔑 Your Therapist Code", copy_code: "Copy Code"
    }
};

// التحكم في اللغة
const langToggleBtn = document.getElementById('langToggle');
let currentLang = localStorage.getItem('app_lang') || 'ar';

function applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    if(langToggleBtn) langToggleBtn.textContent = lang === 'ar' ? 'EN' : 'عربي';

    // تطبيق الترجمة على النصوص
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // تطبيق الترجمة على الـ Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    localStorage.setItem('app_lang', lang);
    if(window.renderParentHome) renderParentHome(); 
    if(window.renderShop) renderShop(); 
}

if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        applyLanguage(currentLang);
    });
}

// التحكم في الدارك مود
const themeToggleBtn = document.getElementById('themeToggle');
let currentTheme = localStorage.getItem('app_theme') || 'light';

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        if(themeToggleBtn) themeToggleBtn.textContent = '☀️';
    } else {
        document.body.removeAttribute('data-theme');
        if(themeToggleBtn) themeToggleBtn.textContent = '🌙';
    }
    localStorage.setItem('app_theme', theme);
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(currentTheme);
    });
}

// تشغيل الإعدادات فوراً
applyLanguage(currentLang);
applyTheme(currentTheme);