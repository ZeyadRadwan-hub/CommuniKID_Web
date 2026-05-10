// ==========================================
// 1. كود التبديل بين (ولي الأمر) و (الأخصائي)
// ==========================================
const btnParent = document.getElementById('btnParent');
const btnTherapist = document.getElementById('btnTherapist');
const parentFields = document.getElementById('parentFields');
const therapistFields = document.getElementById('therapistFields');

if (btnParent && btnTherapist) {
    btnParent.addEventListener('click', function() {
        btnParent.classList.add('active');
        btnTherapist.classList.remove('active');
        parentFields.style.display = 'block';
        therapistFields.style.display = 'none';
    });

    btnTherapist.addEventListener('click', function() {
        btnTherapist.classList.add('active');
        btnParent.classList.remove('active');
        therapistFields.style.display = 'block';
        parentFields.style.display = 'none';
    });
}

// دالة لتوليد كود الأخصائي
function generateDoctorCode() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "@#$%&*";
    
    let code = "";
    for (let i = 0; i < 4; i++) {
        code = code + letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 4; i++) {
        code = code + numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    code = code + symbols.charAt(Math.floor(Math.random() * symbols.length));
    return code;
}

// ==========================================
// 2. برمجة زر "إنشاء الحساب الآن" (Sign Up)
// ==========================================
const signupForm = document.getElementById('signupForm');

if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const isParent = btnParent.classList.contains('active');
        const role = isParent ? 'parent' : 'therapist';
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        let extraData = {};
        if (role === 'parent') {
            extraData.childAge = document.getElementById('childAge').value;
            extraData.childCondition = document.getElementById('childCondition').value;
            extraData.doctorCode = document.getElementById('doctorCode').value; // كود الطبيب الذي أدخله الأب
        } else {
            extraData.specialty = document.getElementById('specialty').value;
            extraData.myDoctorCode = generateDoctorCode(); // توليد كود خاص للطبيب
            alert("تم إنشاء حسابك بنجاح! كودك الخاص هو: " + extraData.myDoctorCode + "\nأعط هذا الكود للمرضى لربط حساباتهم بك.");
        }

        const userData = {
            name: name,
            email: email,
            password: password,
            role: role,
            points: 0,
            ...extraData
        };

        localStorage.setItem(email, JSON.stringify(userData));
        localStorage.setItem('currentUser', JSON.stringify(userData));

        if (role === 'parent') {
            window.location.href = 'parent-home.html';
        } else {
            window.location.href = 'therapist-home.html';
        }
    });
}

// ==========================================
// 3. برمجة زر "تسجيل الدخول السريع" (Login)
// ==========================================
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const savedUserString = localStorage.getItem(email);

        if (savedUserString) {
            const savedUser = JSON.parse(savedUserString);
            
            if (savedUser.password === password) {
                localStorage.setItem('currentUser', JSON.stringify(savedUser));
                
                if (savedUser.role === 'parent') {
                    window.location.href = 'parent-home.html';
                } else if (savedUser.role === 'therapist') {
                    window.location.href = 'therapist-home.html';
                }
            } else {
                alert("كلمة المرور غير صحيحة يا بطل!");
            }
        } else {
            alert("هذا الحساب غير موجود، جرب تنشئ حساب جديد.");
        }
    });
}