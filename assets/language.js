// Language switching functionality
let currentLanguage = 'en'; // Default to English

// Cookie functions
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === (lang === 'zh' ? '中文' : 'EN')) {
            btn.classList.add('active');
        }
    });
    
    // Update all elements with language data
    document.querySelectorAll('[data-zh][data-en]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update placeholder text for form inputs
    document.querySelectorAll('input[data-zh-placeholder][data-en-placeholder], textarea[data-zh-placeholder][data-en-placeholder]').forEach(input => {
        const placeholder = input.getAttribute(`data-${lang}-placeholder`);
        if (placeholder) {
            input.placeholder = placeholder;
        }
    });
    
    // Update title
    const title = document.querySelector('title');
    if (title.hasAttribute(`data-${lang}`)) {
        title.textContent = title.getAttribute(`data-${lang}`);
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';
    
    // Save language preference in both cookie and localStorage
    setCookie('preferredLanguage', lang, 365);
    localStorage.setItem('preferredLanguage', lang);
}

function loadLanguage() {
    // Try to get language from cookie first, then localStorage, then default to English
    const savedLang = getCookie('preferredLanguage') || localStorage.getItem('preferredLanguage') || 'en';
    
    if (savedLang !== 'en') {
        switchLanguage(savedLang);
    } else {
        // Set default language to English
        switchLanguage('en');
    }
}

// Load saved language preference when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadLanguage();
});
