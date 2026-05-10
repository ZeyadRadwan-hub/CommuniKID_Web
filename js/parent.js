// ==========================================
// 1. حماية الصفحة وجلب بيانات البطل
// ==========================================
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser || currentUser.role !== 'parent') {
    window.location.href = 'login.html';
}

// ==========================================
// 2. بناء الصفحة الرئيسية (الكروت واللغة)
// ==========================================
function renderParentHome() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    const heroNameEl = document.getElementById('heroName');
    const heroPointsEl = document.getElementById('heroPoints');

    if (!categoriesGrid) return;

    const currentLang = localStorage.getItem('app_lang') || 'ar';
    const welcomeText = currentLang === 'ar' ? `أهلاً بك يا ${currentUser.name}! 🌟` : `Welcome, ${currentUser.name}! 🌟`;

    if (heroNameEl) heroNameEl.textContent = welcomeText;
    if (heroPointsEl) heroPointsEl.textContent = currentUser.points || 0;

    categoriesGrid.innerHTML = '';

    if (typeof appData !== 'undefined' && appData.categories) {
        for (const catId in appData.categories) {
            const cat = appData.categories[catId];
            const title = currentLang === 'ar' ? cat.title_ar : cat.title_en;
            const coverImage = cat.thumbnail; 

            const cardLink = document.createElement('a');
            cardLink.href = `category.html?id=${catId}`;
            cardLink.style.textDecoration = 'none';
            
            cardLink.innerHTML = `
                <div class="category-card">
                    <div class="cat-image" style="background-image: url('${coverImage}');"></div>
                    <h3>${title}</h3>
                </div>
            `;
            categoriesGrid.appendChild(cardLink);
        }
    }
}

document.addEventListener('DOMContentLoaded', renderParentHome);

const toggleBtnHome = document.getElementById('langToggle');
if (toggleBtnHome) {
    toggleBtnHome.addEventListener('click', () => {
        setTimeout(renderParentHome, 50); 
    });
}

// ==========================================
// 3. برمجة زر تسجيل الخروج
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }
});

// ==========================================
// 4. برمجة إضافة كلمة جديدة (Modal Logic)
// ==========================================
const modal = document.getElementById('addWordModal');
const openModalBtn = document.getElementById('openAddWordModal');
const closeModalBtn = document.querySelector('.close-modal');
const addWordForm = document.getElementById('addWordForm');

if (openModalBtn) {
    openModalBtn.onclick = () => modal.style.display = 'flex';
}

if (closeModalBtn) {
    closeModalBtn.onclick = () => modal.style.display = 'none';
}

window.onclick = (e) => {
    if (e.target == modal) modal.style.display = 'none';
};

if (addWordForm) {
    addWordForm.onsubmit = (e) => {
        e.preventDefault();
        
        const cat = document.getElementById('wordCategory').value;
        const ar = document.getElementById('wordAr').value;
        const en = document.getElementById('wordEn').value;
        const img = document.getElementById('wordImage').value;

        appData.categories[cat].words.push({ ar: ar, en: en, image: img });
        saveAppDataToStorage();

        alert('تمت إضافة الكلمة بنجاح! 🎉 جرب تدخل التصنيف وتشوفها.');
        modal.style.display = 'none';
        addWordForm.reset();
    };
}