// ==========================================
// منطق صفحة المواعيد الخاصة بولي الأمر
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'parent') {
        window.location.href = 'login.html';
        return;
    }

    const appointmentsContainer = document.getElementById('parentAppointmentsContainer');

    function loadParentAppointments() {
        const allAppointments = JSON.parse(localStorage.getItem('therapist_appointments')) || [];
        
        appointmentsContainer.innerHTML = '';
        let hasAppointments = false;

        allAppointments.forEach(app => {
            // المطابقة باستخدام الإيميل (الطريقة الدقيقة) أو الاسم (للبيانات القديمة)
            if (app.patientEmail === currentUser.email || app.patient.trim() === currentUser.name.trim()) {
                hasAppointments = true;
                
                let typeColor = app.type.includes('أونلاين') ? '#8e44ad' : '#3498db';

                appointmentsContainer.innerHTML += `
                    <div class="parent-task-card" style="border-right-color: ${typeColor};">
                        <div class="task-info">
                            <h3 style="color: ${typeColor};">${app.type}</h3>
                            <p style="font-size: 1.1rem; margin-top: 5px; color: var(--text-color);">
                                <strong>التاريخ:</strong> ${app.date} <br>
                                <strong>الوقت:</strong> ${app.time}
                            </p>
                        </div>
                        <div style="font-size: 3rem; opacity: 0.2;">
                            ${app.type.includes('أونلاين') ? '💻' : '🏥'}
                        </div>
                    </div>
                `;
            }
        });

        if (!hasAppointments) {
            appointmentsContainer.innerHTML = `
                <div style="text-align: center; padding: 30px;">
                    <p style="font-size: 1.2rem; color: #888;">لا توجد جلسات مجدولة لك حالياً.</p>
                    <p style="font-size: 0.9rem; color: #aaa;">تأكد من أن الأخصائي قام بتحديد موعدك في الأجندة.</p>
                </div>
            `;
        }
    }

    loadParentAppointments();
});