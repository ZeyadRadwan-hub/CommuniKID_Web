document.addEventListener('DOMContentLoaded', () => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'therapist') {
        window.location.href = 'login.html';
        return;
    }

    const form = document.getElementById('doctorSettingsForm');
    
    // تعبئة البيانات الحالية
    document.getElementById('docName').value = currentUser.name || '';
    document.getElementById('docSpecialty').value = currentUser.specialty || '';
    document.getElementById('docEmail').value = currentUser.email || '';
    
    // عرض كود الأخصائي
    const codeDisplay = document.getElementById('docCodeDisplay');
    if(codeDisplay) {
        codeDisplay.value = currentUser.myDoctorCode || 'غير متوفر';
    }

    // برمجة زر نسخ الكود
    const copyBtn = document.getElementById('copyCodeBtn');
    if(copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(currentUser.myDoctorCode).then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'تم النسخ ✅';
                copyBtn.style.backgroundColor = '#2ecc71';
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.style.backgroundColor = '#3498db';
                }, 2000);
            });
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newName = document.getElementById('docName').value;
        const newSpecialty = document.getElementById('docSpecialty').value;
        const newPass = document.getElementById('docPass').value;

        currentUser.name = newName;
        currentUser.specialty = newSpecialty;
        if (newPass.trim() !== "") {
            currentUser.password = newPass;
        }

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem(currentUser.email, JSON.stringify(currentUser));

        alert('تم تحديث بياناتك بنجاح! ✨');
        window.location.reload();
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
});