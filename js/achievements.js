document.addEventListener('DOMContentLoaded', () => {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) window.location.href = 'login.html';

    const points = user.points || 0;
    document.getElementById('achievePoints').textContent = points;

    const badges = [
        { title: 'أول كلمة', icon: '👶', req: 0 },
        { title: 'بطل مبتدئ', icon: '🥉', req: 50 },
        { title: 'متحدث رائع', icon: '🥈', req: 200 },
        { title: 'الأسطورة', icon: '🥇', req: 500 }
    ];

    const grid = document.getElementById('achievementsGrid');
    badges.forEach(b => {
        const isUnlocked = points >= b.req;
        grid.innerHTML += `
            <div class="grid-card ${isUnlocked ? '' : 'locked'}">
                <span class="badge-icon">${b.icon}</span>
                <h3 style="color:var(--text-color);">${b.title}</h3>
                <p style="color:#888;">${isUnlocked ? 'تم الفتح ✅' : `يفتح عند ${b.req}⭐`}</p>
            </div>`;
    });
});