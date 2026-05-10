document.addEventListener('DOMContentLoaded', function() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser === null || currentUser.role !== 'parent') {
        window.location.href = 'login.html';
        return;
    }

    const chatMessages = document.getElementById('chatMessages');
    const activeContactName = document.getElementById('activeContactName');
    const chatInputForm = document.getElementById('chatInputForm');
    const messageInput = document.getElementById('messageInput');

    let doctorEmail = null;

    // البحث عن الأخصائي الخاص بهذا المستخدم بناءً على كود الأخصائي
    if (currentUser.doctorCode !== undefined && currentUser.doctorCode !== "") {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.includes('@')) {
                let user = JSON.parse(localStorage.getItem(key));
                if (user.role === 'therapist' && user.myDoctorCode === currentUser.doctorCode) {
                    doctorEmail = user.email;
                    activeContactName.textContent = `محادثة مع د. ${user.name}`;
                }
            }
        }
    }

    if (doctorEmail === null) {
        activeContactName.textContent = "لا يوجد أخصائي مرتبط";
        chatMessages.innerHTML = '<div class="empty-chat">يرجى التأكد من إدخال كود الأخصائي الصحيح في إعدادات الحساب للبدء بالمحادثة.</div>';
        chatInputForm.style.display = 'none';
        return;
    }

    function loadMessages() {
        let historyString = localStorage.getItem('chat_history');
        let allMessages = {};
        if (historyString !== null) {
            allMessages = JSON.parse(historyString);
        }

        // نفس المعرف المستخدم عند الطبيب
        let chatKey = doctorEmail + "_" + currentUser.email;
        
        let messages = [];
        if (allMessages[chatKey] !== undefined) {
            messages = allMessages[chatKey];
        }

        chatMessages.innerHTML = '';
        if (messages.length === 0) {
            chatMessages.innerHTML = '<div class="empty-chat">ابدأ المحادثة مع الأخصائي الآن.</div>';
        } else {
            messages.forEach(function(msg) {
                const msgDiv = document.createElement('div');
                // عكسنا المرسل والمستقبل لأننا الآن من جهة ولي الأمر
                let senderClass = msg.sender === 'sent' ? 'received' : 'sent'; 
                msgDiv.className = `message ${senderClass}`;
                msgDiv.textContent = msg.text;
                chatMessages.appendChild(msgDiv);
            });
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    chatInputForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const text = messageInput.value.trim();
        if (text === '') return;

        let historyString = localStorage.getItem('chat_history');
        let allMessages = {};
        if (historyString !== null) {
            allMessages = JSON.parse(historyString);
        }

        let chatKey = doctorEmail + "_" + currentUser.email;

        if (allMessages[chatKey] === undefined) {
            allMessages[chatKey] = [];
        }

        // من جهة ولي الأمر، تعتبر الرسالة مُستقبلة (received) بالنسبة للطبيب
        allMessages[chatKey].push({ sender: 'received', text: text, time: new Date().toLocaleTimeString() });
        localStorage.setItem('chat_history', JSON.stringify(allMessages));

        messageInput.value = '';
        loadMessages();
    });

    loadMessages();
});