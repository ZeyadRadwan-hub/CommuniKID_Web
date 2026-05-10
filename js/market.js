// ==========================================
// نظام متجر الأبطال (Roblox Style - 3D Integration)
// ==========================================

let currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) window.location.href = 'login.html';

const shopItems = {
    hats: [
        { id: 'h1', icon: '👑', name: 'تاج الملك', price: 100, type: 'hat' },
        { id: 'h2', icon: '🧢', name: 'كاب أزرق', price: 50, type: 'hat' }
    ],
    faces: [
        { id: 'f1', icon: '🕶️', name: 'نضارة شمس', price: 40, type: 'face' }
    ],
    shirts: [
        { id: 's1', color: '#e74c3c', name: 'تيشيرت أحمر', price: 20, type: 'shirt' },
        { id: 's2', color: '#2ecc71', name: 'تيشيرت أخضر', price: 20, type: 'shirt' },
        { id: 's3', color: '#8e44ad', name: 'تيشيرت بنفسجي', price: 50, type: 'shirt' },
        { id: 's4', color: '#f1c40f', name: 'تيشيرت ذهبي', price: 150, type: 'shirt' },
        { id: 's5', color: '#3498db', name: 'تيشيرت أزرق', price: 0, type: 'shirt' }
    ]
};

function updateUI() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) return;

    const pointsEl = document.getElementById('marketPoints');
    if (pointsEl) pointsEl.textContent = user.points || 0;

    let needsSave = false;
    if (!user.inventory) { user.inventory = ['s5']; needsSave = true; }
    if (!user.avatar) { user.avatar = { hat: '', face: '', shirt: '#3498db', gender: 'boy' }; needsSave = true; }
    if (!user.avatar.gender) { user.avatar.gender = 'boy'; needsSave = true; }
    
    if (needsSave) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem(user.email, JSON.stringify(user));
    }

    // تظبيط أزرار النوع
    document.getElementById('btnBoy').classList.toggle('active', user.avatar.gender === 'boy');
    document.getElementById('btnGirl').classList.toggle('active', user.avatar.gender === 'girl');

    // تحديث الـ 3D (اللبس، النوع، والإكسسوارات)
    if (window.update3DAvatar) window.update3DAvatar(user.avatar.shirt);
    if (window.switchGender3D) window.switchGender3D(user.avatar.gender);
    if (window.updateAccessories3D) window.updateAccessories3D(user.avatar.hat, user.avatar.face);

    renderShop();
}

function renderShop() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) return;
    
    const renderCategory = (items, gridId) => {
        const grid = document.getElementById(gridId);
        if (!grid) return;
        
        grid.innerHTML = '';
        
        items.forEach(item => {
            const isOwned = user.inventory.includes(item.id);
            // التأكد من حالة "ملبوس" بناءً على النوع
            let isEquipped = false;
            if (item.type === 'shirt') isEquipped = (user.avatar.shirt === item.color);
            if (item.type === 'hat') isEquipped = (user.avatar.hat === item.id);
            if (item.type === 'face') isEquipped = (user.avatar.face === item.id);

            const card = document.createElement('div');
            card.className = 'shop-item';
            
            const display = item.type === 'shirt' 
                ? `<div class="item-color" style="background:${item.color}"></div>` 
                : `<div class="item-icon">${item.icon}</div>`;

            let btnHtml = '';
            if (isEquipped) {
                // زر الخلع للإكسسوارات
                const clearValue = '';
                btnHtml = item.type === 'shirt' 
                    ? `<button class="buy-btn equipped">ملبوس ✔️</button>`
                    : `<button class="buy-btn equipped" onclick="equipItem('', '${item.type}', '')">خلع ❌</button>`;
            } else if (isOwned) {
                const equipValue = item.type === 'shirt' ? item.color : item.id;
                btnHtml = `<button class="buy-btn" onclick="equipItem('${item.id}', '${item.type}', '${equipValue}')">إلبس 👕</button>`;
            } else {
                const currentPoints = user.points || 0;
                const canAfford = currentPoints >= item.price;
                btnHtml = `<button class="buy-btn ${canAfford ? '' : 'locked'}" onclick="buyItem('${item.id}', ${item.price})">شراء (${item.price} ⭐)</button>`;
            }

            card.innerHTML = `
                ${display}
                <div class="item-name">${item.name}</div>
                ${!isOwned ? `<div class="item-price">⭐ ${item.price}</div>` : '<div class="item-price" style="color:#2ecc71;">تم الشراء ✅</div>'}
                ${btnHtml}
            `;
            grid.appendChild(card);
        });
    };

    renderCategory(shopItems.shirts, 'shirtsGrid');
    renderCategory(shopItems.hats, 'hatsGrid');
    renderCategory(shopItems.faces, 'facesGrid');
}

window.buyItem = function(itemId, price) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let currentPoints = user.points || 0;

    if (currentPoints < price) {
        alert("معكش نقط كفاية يا بطل! 🎤");
        return;
    }

    if (confirm(`هتشتري العنصر ده بـ ${price} نقطة؟`)) {
        user.points = currentPoints - price;
        user.inventory.push(itemId);
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem(user.email, JSON.stringify(user));
        updateUI(); 
    }
};

window.equipItem = function(itemId, type, value) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (type === 'hat') user.avatar.hat = value;
    if (type === 'face') user.avatar.face = value;
    if (type === 'shirt') user.avatar.shirt = value;

    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem(user.email, JSON.stringify(user));
    updateUI(); 
};

window.setGender = function(gender) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    user.avatar.gender = gender;
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem(user.email, JSON.stringify(user));
    updateUI();
};

setTimeout(updateUI, 100);