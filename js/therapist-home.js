// ==========================================
// منطق لوحة التحكم الرئيسية للأخصائي (Real Data)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser || currentUser.role !== 'therapist') {
        alert("عذراً، هذه الصفحة مخصصة للأخصائيين فقط! 🛑");
        window.location.href = 'login.html';
        return;
    }

    // عرض اسم الدكتور
    const docNameEl = document.getElementById('doctorName');
    if (docNameEl) docNameEl.textContent = currentUser.name || '';

    // ==========================================
    // 1. جلب عدد الحالات ونشاطهم
    // ==========================================
    let myPatients = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.includes('@')) {
            let u = JSON.parse(localStorage.getItem(key));
            if (u.role === 'parent' && u.doctorCode === currentUser.myDoctorCode) {
                myPatients.push(u);
            }
        }
    }
    
    // تحديث إحصائية عدد الحالات
    document.getElementById('statPatients').textContent = myPatients.length;

    // تحديث جدول نشاط الأبطال
    const tableBody = document.getElementById('recentActivityTable');
    if (tableBody) {
        tableBody.innerHTML = '';
        if(myPatients.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#888;">لا يوجد نشاط مسجل حتى الآن.</td></tr>`;
        } else {
            myPatients.forEach(p => {
                let pts = p.points || 0;
                let status = pts > 200 ? "ممتاز" : (pts > 50 ? "جيد" : "يحتاج متابعة");
                let statusClass = pts > 200 ? "status-good" : (pts > 50 ? "status-warning" : "status-danger");
                
                tableBody.innerHTML += `
                    <tr>
                        <td style="font-weight: bold;">${p.name}</td>
                        <td style="color: #f1c40f; font-weight: bold;">⭐ ${pts}</td>
                        <td style="color:#888;">جاري التتبع</td>
                        <td><span class="status-badge ${statusClass}">${status}</span></td>
                    </tr>
                `;
            });
        }
    }

    // ==========================================
    // 2. جلب مواعيد اليوم
    // ==========================================
    const allApps = JSON.parse(localStorage.getItem('therapist_appointments')) || [];
    let myApps = allApps.filter(a => a.doctorEmail === currentUser.email);
    
    // الحصول على تاريخ اليوم بصيغة YYYY-MM-DD
    let today = new Date().toISOString().split('T')[0]; 
    let todayApps = myApps.filter(a => a.date === today);

    // تحديث إحصائية مواعيد اليوم
    document.getElementById('statSessions').textContent = todayApps.length;

    const sessionsList = document.getElementById('todaySessionsList');
    if (sessionsList) {
        sessionsList.innerHTML = '';
        if (todayApps.length === 0) {
            sessionsList.innerHTML = `<p style="color: #888; text-align: center;">لا توجد جلسات مسجلة لتاريخ اليوم.</p>`;
        } else {
            todayApps.forEach(session => {
                let color = session.type.includes('أونلاين') ? '#8e44ad' : '#2ecc71';
                sessionsList.innerHTML += `
                    <div style="background: var(--bg-color); border: 1px solid var(--border-color); padding: 15px; border-radius: 12px; border-right: 4px solid ${color};">
                        <h4 style="margin: 0 0 5px 0; color: var(--text-color);">${session.patient}</h4>
                        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: #888;">
                            <span>🕒 ${session.time}</span>
                            <span style="color: ${color}; font-weight:bold;">${session.type}</span>
                        </div>
                    </div>
                `;
            });
        }
    }

    // ==========================================
    // 3. جلب الرسائل (Dynamic Messages Count)
    // ==========================================
    const statMessagesEl = document.getElementById('statMessages');
    if (statMessagesEl) {
        let receivedMessagesCount = 0;
        let historyString = localStorage.getItem('chat_history');
        
        if (historyString) {
            let allMessages = JSON.parse(historyString);
            
            // نلف على كل المحادثات في الداتا بيز
            for (let chatKey in allMessages) {
                // لو مفتاح المحادثة بيبدأ بإيميل الدكتور ده
                if (chatKey.startsWith(currentUser.email + "_")) {
                    let messages = allMessages[chatKey];
                    // نعد الرسائل اللي استقبلها الدكتور ('received')
                    messages.forEach(msg => {
                        if (msg.sender === 'received') {
                            receivedMessagesCount++;
                        }
                    });
                }
            }
        }
        // تحديث الرقم في الشاشة (لو مفيش رسايل هيبقي 0 بدل العبط بتاع الـ 5)
        statMessagesEl.textContent = receivedMessagesCount;
    }

    // برمجة زر تسجيل الخروج
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }
});