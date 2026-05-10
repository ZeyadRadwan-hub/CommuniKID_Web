document.addEventListener('DOMContentLoaded', function() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser === null || currentUser.role !== 'therapist') {
        window.location.href = 'login.html';
        return;
    }

    const grid = document.getElementById('patientsGrid');
    
    // عناصر Modal إضافة المريض
    const addPatientModal = document.getElementById('addPatientModal');
    const openAddPatientModalBtn = document.getElementById('openAddPatientModalBtn');
    const closePatientModal = document.getElementById('closePatientModal');
    const addPatientForm = document.getElementById('addPatientForm');

    // فتح وإغلاق الـ Modal
    if(openAddPatientModalBtn) openAddPatientModalBtn.onclick = () => addPatientModal.style.display = 'flex';
    if(closePatientModal) closePatientModal.onclick = () => addPatientModal.style.display = 'none';
    window.addEventListener('click', (e) => { if (e.target == addPatientModal) addPatientModal.style.display = 'none'; });

    // إضافة مريض جديد
    if(addPatientForm) {
        addPatientForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('newPatEmail').value;
            
            // التأكد إن الإيميل مش موجود قبل كده
            if(localStorage.getItem(email)) {
                alert("هذا البريد الإلكتروني مسجل مسبقاً في النظام!");
                return;
            }

            const newPatientData = {
                name: document.getElementById('newPatName').value,
                email: email,
                password: document.getElementById('newPatPass').value,
                childAge: document.getElementById('newPatAge').value,
                childCondition: document.getElementById('newPatCond').value,
                gender: document.getElementById('newPatGender').value,
                role: 'parent',
                points: 0,
                doctorCode: currentUser.myDoctorCode // الربط التلقائي!
            };

            // الحفظ في قاعدة البيانات
            localStorage.setItem(email, JSON.stringify(newPatientData));
            
            alert('تم إنشاء حساب المريض وربطه بعيادتك بنجاح! 🎉\nيمكن للمريض الآن تسجيل الدخول ببريده وكلمة المرور.');
            addPatientForm.reset();
            addPatientModal.style.display = 'none';
            loadPatients(); // إعادة تحميل القائمة
        });
    }

    function loadPatients() {
        let patients = [];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.includes('@')) {
                let userString = localStorage.getItem(key);
                let userObj = JSON.parse(userString);
                if (userObj.role === 'parent' && userObj.doctorCode === currentUser.myDoctorCode) {
                    patients.push(userObj);
                }
            }
        }

        grid.innerHTML = '';

        if (patients.length === 0) {
            grid.innerHTML = '<p style="text-align:center; color:#888; grid-column: 1 / -1;">لا يوجد أبطال مرتبطين بكودك حتى الآن. قم بإضافة مريض جديد أو أعطهم كودك: ' + currentUser.myDoctorCode + '</p>';
        } else {
            patients.forEach(function(p) {
                let avatar = p.gender === 'female' ? "👧" : "👦";
                let points = p.points || 0;
                let conditionText = "غير محدد";
                if(p.childCondition === 'autism') conditionText = 'طيف توحد';
                else if(p.childCondition === 'speech_delay') conditionText = 'تأخر نطق';
                else if(p.childCondition === 'down_syndrome') conditionText = 'متلازمة داون';
                else conditionText = 'أخرى';
                
                grid.innerHTML += `
                    <div class="patient-card">
                        <div class="p-card-top">
                            <div class="p-avatar">${avatar}</div>
                            <div class="p-info">
                                <h3>${p.name}</h3>
                                <p>${conditionText} - ${p.childAge} سنوات</p>
                            </div>
                        </div>
                        <div class="p-stats">
                            <div class="p-stat-item">
                                <span>إجمالي النقاط</span>
                                <strong>⭐ ${points}</strong>
                            </div>
                            <div class="p-stat-item">
                                <span>البريد</span>
                                <strong style="font-size:0.7rem;">${p.email}</strong>
                            </div>
                        </div>
                        <div class="p-actions">
                            <button class="p-btn btn-task" onclick="window.location.href='therapist-tasks.html'">إرسال مهمة ➕</button>
                        </div>
                    </div>
                `;
            });
        }
    }

    loadPatients(); // التحميل الأولي

    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
});