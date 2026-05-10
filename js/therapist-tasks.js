document.addEventListener('DOMContentLoaded', function() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser === null || currentUser.role !== 'therapist') {
        window.location.href = 'login.html';
        return;
    }

    const taskForm = document.getElementById('sendTaskForm');
    const tasksContainer = document.getElementById('tasksContainer');
    const targetPatientSelect = document.getElementById('targetPatient');

    // تعبئة قائمة المرضى الحقيقيين
    targetPatientSelect.innerHTML = '';
    let hasPatients = false;

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.includes('@')) {
            let user = JSON.parse(localStorage.getItem(key));
            if (user.role === 'parent') {
                if (user.doctorCode === currentUser.myDoctorCode) {
                    let option = document.createElement('option');
                    option.value = user.email; // نستخدم الإيميل كمعرف فريد
                    option.textContent = user.name;
                    targetPatientSelect.appendChild(option);
                    hasPatients = true;
                }
            }
        }
    }

    if (hasPatients === false) {
        let option = document.createElement('option');
        option.textContent = "لا يوجد مرضى مضافين بعد";
        targetPatientSelect.appendChild(option);
        targetPatientSelect.disabled = true;
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('all_tasks'));
        let validTasks = [];
        if (tasks !== null) {
            validTasks = tasks;
        }

        tasksContainer.innerHTML = '';

        // تصفية المهام لعرض المهام الخاصة بمرضى هذا الطبيب فقط
        let myTasks = [];
        for (let i = 0; i < validTasks.length; i++) {
            if (validTasks[i].doctorEmail === currentUser.email) {
                myTasks.push({ task: validTasks[i], originalIndex: i });
            }
        }

        if (myTasks.length === 0) {
            tasksContainer.innerHTML = `<p style="text-align:center; color:#888;">لا توجد مهام مرسلة حتى الآن.</p>`;
            return;
        }

        myTasks.forEach(function(item) {
            let statusText = item.task.done ? 'تم الإنجاز ✅' : 'قيد الانتظار ⏳';
            let statusClass = item.task.done ? 'status-completed' : 'status-pending';
            
            tasksContainer.innerHTML = tasksContainer.innerHTML + `
                <div class="task-list-item">
                    <div>
                        <h3 style="color: var(--text-color);">${item.task.content}</h3>
                        <p style="font-size: 0.9rem; color: #888;">موجهة إلى: <strong>${item.task.patientName}</strong> | ${item.task.type}</p>
                    </div>
                    <div style="text-align: center;">
                        <span class="task-status ${statusClass}">
                            ${statusText}
                        </span>
                        <button onclick="deleteTask(${item.originalIndex})" style="background:none; border:none; color:#e74c3c; cursor:pointer; display:block; margin-top:10px; width:100%;">حذف 🗑️</button>
                    </div>
                </div>
            `;
        });
    }

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (hasPatients === false) {
            alert('يجب أن يكون لديك مرضى أولاً لإرسال المهام.');
            return;
        }

        let selectEl = document.getElementById('targetPatient');
        let selectedPatientName = selectEl.options[selectEl.selectedIndex].text;

        const newTask = {
            patientEmail: selectEl.value,
            patientName: selectedPatientName,
            doctorEmail: currentUser.email,
            type: document.getElementById('taskType').value,
            content: document.getElementById('taskContent').value,
            done: false,
            date: new Date().toLocaleDateString()
        };

        const tasksString = localStorage.getItem('all_tasks');
        let tasks = [];
        if (tasksString !== null) {
            tasks = JSON.parse(tasksString);
        }
        
        tasks.unshift(newTask);
        localStorage.setItem('all_tasks', JSON.stringify(tasks));
        
        alert('تم إرسال المهمة للبطل بنجاح! 🚀');
        taskForm.reset();
        loadTasks();
    });

    window.deleteTask = function(index) {
        if(confirm('هل أنت متأكد من حذف هذه المهمة؟')) {
            let tasks = JSON.parse(localStorage.getItem('all_tasks'));
            tasks.splice(index, 1);
            localStorage.setItem('all_tasks', JSON.stringify(tasks));
            loadTasks();
        }
    };

    loadTasks();
});