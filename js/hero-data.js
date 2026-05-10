// ==========================================
// إدارة صفحة بيانات البطل (Hero Data)
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // لو مفيش مستخدم، اطرده لصفحة الدخول
    if (currentUser === null || currentUser.role !== 'parent') {
        window.location.href = 'login.html';
        return;
    }

    // ربط الحقول
    const nameInput = document.getElementById('heroNameInput');
    const ageInput = document.getElementById('heroAgeInput');
    const conditionInput = document.getElementById('heroConditionInput');
    const doctorCodeInput = document.getElementById('heroDoctorCodeInput');
    const form = document.getElementById('heroDataForm');

    // تعبئة البيانات الحالية في الحقول
    if (nameInput !== null) nameInput.value = currentUser.name || '';
    if (ageInput !== null) ageInput.value = currentUser.childAge || '';
    if (doctorCodeInput !== null) doctorCodeInput.value = currentUser.doctorCode || '';
    
    if (conditionInput !== null && currentUser.childCondition !== undefined) {
        // البحث عن الخيار المطابق لضمان اختياره بشكل صحيح
        for (let i = 0; i < conditionInput.options.length; i++) {
            if (conditionInput.options[i].value === currentUser.childCondition) {
                conditionInput.selectedIndex = i;
                break;
            }
        }
    }

    // حفظ التعديلات عند الضغط على زر الحفظ
    if (form !== null) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // منع الصفحة من عمل Refresh

            // تحديث كائن المستخدم
            currentUser.name = nameInput.value;
            currentUser.childAge = ageInput.value;
            currentUser.childCondition = conditionInput.value;
            
            // حفظ كود الأخصائي (تحويل الحروف إلى كبيرة لتوحيد النسق)
            if (doctorCodeInput.value.trim() !== '') {
                currentUser.doctorCode = doctorCodeInput.value.trim().toUpperCase();
            } else {
                currentUser.doctorCode = "";
            }

            // حفظ في الـ LocalStorage (للمستخدم الحالي ولنسخته الاحتياطية)
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            localStorage.setItem(currentUser.email, JSON.stringify(currentUser));

            alert('تم حفظ بيانات البطل بنجاح! 🎉');
            window.location.href = 'settings.html'; // الرجوع للإعدادات
        });
    }
});