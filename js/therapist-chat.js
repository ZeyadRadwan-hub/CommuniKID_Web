document.addEventListener('DOMContentLoaded', function() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser === null || currentUser.role !== 'therapist') {
        window.location.href = 'login.html';
        return;
    }

    const contactsList = document.getElementById('contactsList');
    const chatMessages = document.getElementById('chatMessages');
    const activeContactName = document.getElementById('activeContactName');
    const chatInputForm = document.getElementById('chatInputForm');
    const messageInput = document.getElementById('messageInput');

    let parents = [];
    let activeChatId = null;

    // جلب المرضى الحقيقيين
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.includes('@')) {
            let user = JSON.parse(localStorage.getItem(key));
            if (user.role === 'parent') {
                if (user.doctorCode === currentUser.myDoctorCode) {
                    parents.push(user);
                }
            }
        }
    }

    contactsList.innerHTML = '';
    
    if (parents.length === 0) {
        contactsList.innerHTML = '<p style="padding:15px; color:#888; text-align:center;">لا يوجد مرضى حالياً</p>';
    } else {
        parents.forEach(function(parent) {
            let avatar = parent.gender === 'female' ? "👩" : "👨";
            const div = document.createElement('div');
            div.className = 'contact-item';
            div.innerHTML = `<span>${avatar}</span> <strong>${parent.name}</strong>`;
            
            div.onclick = function(event) {
                activeChatId = parent.email;
                activeContactName.textContent = `محادثة مع: ${parent.name}`;
                chatInputForm.style.display = 'flex';
                
                let allItems = document.querySelectorAll('.contact-item');
                for (let j = 0; j < allItems.length; j++) {
                    allItems[j].classList.remove('active');
                }
                event.currentTarget.classList.add('active');

                loadMessages();
            };
            contactsList.appendChild(div);
        });
    }

    function loadMessages() {
        let historyString = localStorage.getItem('chat_history');
        let allMessages = {};
        if (historyString !== null) {
            allMessages = JSON.parse(historyString);
        }

        // إنشاء معرف محادثة فريد يجمع بين الطبيب والمريض
        let chatKey = currentUser.email + "_" + activeChatId;
        
        let messages = [];
        if (allMessages[chatKey] !== undefined) {
            messages = allMessages[chatKey];
        }

        chatMessages.innerHTML = '';
        if (messages.length === 0) {
            chatMessages.innerHTML = '<div class="empty-chat">لا توجد رسائل سابقة. ابدأ المحادثة الآن.</div>';
        } else {
            messages.forEach(function(msg) {
                const msgDiv = document.createElement('div');
                msgDiv.className = `message ${msg.sender}`;
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

        let chatKey = currentUser.email + "_" + activeChatId;

        if (allMessages[chatKey] === undefined) {
            allMessages[chatKey] = [];
        }

        allMessages[chatKey].push({ sender: 'sent', text: text, time: new Date().toLocaleTimeString() });
        localStorage.setItem('chat_history', JSON.stringify(allMessages));

        messageInput.value = '';
        loadMessages();
    });
});