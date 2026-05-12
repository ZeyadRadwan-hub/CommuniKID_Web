document.addEventListener('DOMContentLoaded', function() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser === null || currentUser.role !== 'parent') {
        window.location.href = 'login.html';
        return;
    }

    const pointsEl = document.getElementById('heroPoints');
    if (pointsEl !== null) {
        pointsEl.textContent = currentUser.points || 0;
    }

    const pendingContainer = document.getElementById('pendingTasksContainer');
    const completedContainer = document.getElementById('completedTasksContainer');

    // دالة نطق الجملة
    window.playTaskSound = function(text) {
        const currentLang = localStorage.getItem('app_lang') || 'ar';
        const targetLangCode = currentLang === 'ar' ? 'ar' : 'en';

        const executeSpeech = () => {
            const voices = speechSynthesis.getVoices();
            let selectedVoice = null;

            if (targetLangCode === 'ar') {
                selectedVoice = voices.find(voice => voice.lang.includes('ar'));
            } else {
                selectedVoice = voices.find(voice => voice.lang.includes('en'));
            }

            if (selectedVoice) {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.voice = selectedVoice;
                utterance.lang = selectedVoice.lang;
                speechSynthesis.speak(utterance);
            } else {
                // Fallback to Cloud TTS API if local voice not found
                const fallbackUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${targetLangCode}&q=${encodeURIComponent(text)}`;
                const audio = new Audio(fallbackUrl);
                audio.play().catch(e => console.error("Fallback TTS failed:", e));
            }
        };

        if (speechSynthesis.getVoices().length === 0) {
            const voicesChangedHandler = () => {
                speechSynthesis.removeEventListener('voiceschanged', voicesChangedHandler);
                executeSpeech();
            };
            speechSynthesis.addEventListener('voiceschanged', voicesChangedHandler);
            
            setTimeout(() => {
                speechSynthesis.removeEventListener('voiceschanged', voicesChangedHandler);
                executeSpeech();
            }, 1000);
        } else {
            executeSpeech();
        }
    };

    async function loadParentTasks() {
        let tasksString = localStorage.getItem('all_tasks');
        let allTasks = [];
        if (tasksString !== null) {
            allTasks = JSON.parse(tasksString);
        }
        
        pendingContainer.innerHTML = '';
        completedContainer.innerHTML = '';

        let hasPending = false;
        let hasCompleted = false;

        for (let index = 0; index < allTasks.length; index++) {
            const task = allTasks[index];
            if (task.patientEmail === currentUser.email) {
                let displayContent = task.content;
                let displayType = task.type || '';

                let completedClass = task.done ? 'completed' : '';
                let actionHtml = "";
                
                if (task.done) {
                    actionHtml = `<span class="task-done-badge" data-dynamic-translate>تم الإنجاز ✅</span>`;
                } else {
                    // الزراير المربعة الجديدة (صوت + مايك) بدون إنجاز يدوياً
                    actionHtml = `
                        <div style="display: flex; gap: 12px; align-items: center;">
                            <button onclick="playTaskSound('${task.content}')" style="background-color: #4CAF50; color: white; border: none; border-radius: 12px; width: 45px; height: 45px; display: flex; justify-content: center; align-items: center; cursor: pointer; font-size: 1.3rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.3s;" title="استمع للكلمة">🔊</button>
                            
                            <button onclick="startMicTest('${task.content}', 'micBtn_${index}', ${index})" id="micBtn_${index}" style="background-color: #e74c3c; color: white; border: none; border-radius: 12px; width: 45px; height: 45px; display: flex; justify-content: center; align-items: center; cursor: pointer; font-size: 1.3rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.3s;" title="انطق بصوتك">🎤</button>
                        </div>
                    `;
                }

                const cardHTML = `
                    <div class="parent-task-card ${completedClass}">
                        <div class="task-info">
                            <h3 data-dynamic-translate data-translate-safe="true">${displayContent}</h3>
                            <p><span data-i18n="task_type">نوع التدريب</span>: <span data-dynamic-translate data-translate-safe="true">${displayType}</span> | <span data-i18n="date_label">تاريخ الإرسال</span>: ${task.date || ''}</p>
                        </div>
                        <div>
                            ${actionHtml}
                        </div>
                    </div>
                `;

                if (task.done) {
                    completedContainer.innerHTML = completedContainer.innerHTML + cardHTML;
                    hasCompleted = true;
                } else {
                    pendingContainer.innerHTML = pendingContainer.innerHTML + cardHTML;
                    hasPending = true;
                }
            }
        }

        if (hasPending === false) {
            pendingContainer.innerHTML = '<p style="text-align:center; color:#888;" data-dynamic-translate data-translate-safe="true">أنت بطل! لا توجد مهام معلقة حالياً 🌟</p>';
        }
        if (hasCompleted === false) {
            completedContainer.innerHTML = '<p style="text-align:center; color:#888;" data-dynamic-translate data-translate-safe="true">لم تنجز أي مهام بعد، هيا نبدأ! 💪</p>';
        }
    }

    function calculateAccuracy(s1, s2) {
        let longer = s1.length >= s2.length ? s1 : s2;
        let shorter = s1.length < s2.length ? s1 : s2;
        if (longer.length === 0) return 100;
        
        let costs = new Array();
        for (let i = 0; i <= longer.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= shorter.length; j++) {
                if (i === 0) {
                    costs[j] = j;
                } else {
                    if (j > 0) {
                        let newValue = costs[j - 1];
                        if (longer.charAt(i - 1) !== shorter.charAt(j - 1)) {
                            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                        }
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0) {
                costs[shorter.length] = lastValue;
            }
        }
        return Math.round(((longer.length - costs[shorter.length]) / parseFloat(longer.length)) * 100);
    }

    window.startMicTest = function(targetText, btnId, taskIndex) {
        const currentLang = localStorage.getItem('app_lang') || 'ar';
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (SpeechRecognition === undefined) {
            alert(currentLang === 'ar' ? "متصفحك مش بيدعم المايك، جرب جوجل كروم!" : "Mic not supported, try Chrome!");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = currentLang === 'ar' ? 'ar-EG' : 'en-US'; 
        recognition.interimResults = true; 

        const btn = document.getElementById(btnId);
        const originalHtml = btn.innerHTML;
        btn.innerHTML = "🎙️";
        btn.style.opacity = "0.7";

        const liveBox = document.getElementById('favLiveCaptionBox');
        liveBox.style.display = 'block';
        liveBox.style.borderColor = 'var(--border-color)';
        liveBox.innerHTML = currentLang === 'ar' ? '<span style="color:#888;">أنا أسمعك...</span>' : '<span style="color:#888;">Listening...</span>';
        
        window.scrollTo({ top: 0, behavior: 'smooth' });

        recognition.start();

        recognition.onresult = function(event) {
            let interimTranscript = '';
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript = finalTranscript + event.results[i][0].transcript;
                } else {
                    interimTranscript = interimTranscript + event.results[i][0].transcript;
                }
            }
            liveBox.innerHTML = finalTranscript + '<span style="color:#888;">' + interimTranscript + '</span>';

            if (finalTranscript !== '') {
                function cleanText(text) {
                    return text.toLowerCase().replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/[^\w\s\u0600-\u06FF]/g, '').trim();
                }
                const spokenClean = cleanText(finalTranscript);
                const targetClean = cleanText(targetText);
                const accuracy = calculateAccuracy(spokenClean, targetClean);

                if (accuracy >= 70 || spokenClean.includes(targetClean)) {
                    liveBox.style.borderColor = '#4CAF50'; 
                    liveBox.innerHTML = `✅ ${finalTranscript} <br><span style="color:#4CAF50; font-size:1rem; display:block; margin-top:5px;">(دقة النطق: ${accuracy}% - ممتاز! تم إنجاز المهمة بنجاح)</span>`;
                    
                    setTimeout(function() {
                        markTaskDone(taskIndex);
                        liveBox.style.display = 'none';
                    }, 2000);
                } else {
                    liveBox.style.borderColor = '#e74c3c'; 
                    liveBox.innerHTML = `❌ ${finalTranscript} <br><span style="color:#e74c3c; font-size:1rem; display:block; margin-top:5px;">(دقة النطق: ${accuracy}% - المطلوب: ${targetText}) حاول تاني!</span>`;
                }
            }
        };

        recognition.onend = function() {
            btn.innerHTML = originalHtml;
            btn.style.opacity = "1";
        };
    };

    window.markTaskDone = function(index) {
        let tasksString = localStorage.getItem('all_tasks');
        let allTasks = [];
        if (tasksString !== null) {
            allTasks = JSON.parse(tasksString);
        }
        
        if (allTasks[index] !== undefined) {
            allTasks[index].done = true;
            localStorage.setItem('all_tasks', JSON.stringify(allTasks));

            currentUser.points = (currentUser.points || 0) + 50;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            localStorage.setItem(currentUser.email, JSON.stringify(currentUser));
            
            if (pointsEl !== null) {
                pointsEl.textContent = currentUser.points;
            }
            
            alert('عمل رائع يا بطل! حصلت على 50 نقطة إضافية 🎉');
            loadParentTasks();
        }
    };

    loadParentTasks();
});