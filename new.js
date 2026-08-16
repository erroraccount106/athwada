// ===== DARAZ GIFT POPUP & ADSTERRA FOOTER AD INJECTOR =====
(function() {
    'use strict';

    const DARAZ_STORAGE_KEY = 'daraz_gift_popup_shown';
    const ADSTERRA_FOOTER_ID = 'adsterra-footer-wrapper';

    // 1. Inject CSS (Dynamically links to your existing style.css variables)
    const css = `
        .daraz-popup-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(8px);
            z-index: 6000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: dpFadeIn 0.5s ease;
            padding: 20px;
        }
        .daraz-popup-overlay.closing {
            animation: dpFadeOut 0.4s ease forwards;
        }
        @keyframes dpFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes dpFadeOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes dpShake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-10px); }
            40%, 80% { transform: translateX(10px); }
        }
        @keyframes dpSlideUp {
            from { transform: translateY(50px) scale(0.9); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes dpBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
        }

        .daraz-popup-content {
            background: linear-gradient(145deg, var(--bg-card, #1a0a0a), var(--bg-darker, #050202));
            border: 2px solid #F85606; /* Daraz Orange */
            border-radius: 20px;
            max-width: 420px;
            width: 100%;
            padding: 35px 25px;
            text-align: center;
            box-shadow: 0 15px 50px rgba(248, 86, 6, 0.3);
            position: relative;
            animation: dpSlideUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .dp-gift-icon {
            font-size: 65px;
            color: #F85606;
            margin-bottom: 15px;
            animation: dpBounce 2s infinite;
            display: inline-block;
        }

        .dp-title {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 32px;
            color: var(--text-primary, #fff);
            letter-spacing: 1.5px;
            margin-bottom: 12px;
            line-height: 1.2;
        }
        .dp-title span {
            color: #F85606;
        }

        .dp-subtitle {
            color: var(--text-secondary, #b8a8a8);
            font-size: 15px;
            margin-bottom: 30px;
            line-height: 1.6;
        }

        .dp-btn {
            display: inline-block;
            background: linear-gradient(135deg, #F85606, #ff7b3a);
            color: #fff;
            font-weight: 700;
            font-size: 18px;
            padding: 16px 40px;
            border-radius: 50px;
            text-decoration: none;
            box-shadow: 0 8px 20px rgba(248, 86, 6, 0.4);
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            width: 100%;
            text-transform: uppercase;
            letter-spacing: 1.5px;
        }
        .dp-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 25px rgba(248, 86, 6, 0.6);
            background: linear-gradient(135deg, #ff7b3a, #F85606);
        }
        .dp-btn:active {
            transform: translateY(0);
        }

        .dp-footer-note {
            margin-top: 20px;
            font-size: 11px;
            color: #666;
        }

        /* Adsterra Footer Ad Container */
        .adsterra-footer-wrapper {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            z-index: 5500;
            background: rgba(10, 5, 5, 0.95);
            border-top: 1px solid var(--border-color, #3a1515);
            padding: 10px 0;
            text-align: center;
            box-shadow: 0 -4px 15px rgba(0,0,0,0.5);
            backdrop-filter: blur(5px);
        }
        
        /* Ensure body has padding at bottom so footer ad doesn't overlap content */
        body.has-footer-ad {
            padding-bottom: 70px !important;
        }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = css;
    document.head.appendChild(styleSheet);

    // 2. Adsterra Footer Ad Injection
    function injectAdsterraFooter() {
        if (document.getElementById(ADSTERRA_FOOTER_ID)) return; // Prevent duplicates
        
        document.body.classList.add('has-footer-ad');
        const adWrapper = document.createElement('div');
        adWrapper.id = ADSTERRA_FOOTER_ID;
        adWrapper.className = 'adsterra-footer-wrapper';
        
        // ==========================================
        // PASTE YOUR ADSTERRA FOOTER AD SCRIPT HERE
        // ==========================================
        adWrapper.innerHTML = `
            <!-- Example Adsterra Script (Replace with your actual code) -->
            <!-- <script type="text/javascript" src="//www.highperformanceformat.com/your-script.js"></script> -->
            
            <!-- Placeholder (Remove this div when you paste your code) -->
            <div style="color: #888; font-size: 12px; padding: 5px; letter-spacing: 1px;">
                <i class="fa-solid fa-ad" style="margin-right: 5px; color: var(--accent, #ff2e4d);"></i> Adsterra Footer Ad Space
            </div>
        `;
        document.body.appendChild(adWrapper);
    }

    // 3. Daraz Popup Logic
    function showDarazPopup() {
        if (localStorage.getItem(DARAZ_STORAGE_KEY) === 'true') {
            return; // Already shown, do not show again
        }

        const overlay = document.createElement('div');
        overlay.className = 'daraz-popup-overlay';
        
        overlay.innerHTML = `
            <div class="daraz-popup-content">
                <div class="dp-gift-icon">
                    <i class="fa-solid fa-gift"></i>
                </div>
                <h2 class="dp-title">Daraz වෙතින් නොමිලේ <span>Gifts</span> දිනාගන්න!</h2>
                <p class="dp-subtitle">Click the button below to claim your free gifts now! Limited time offer.</p>
                <button class="dp-btn" id="darazClaimBtn">
                    <i class="fa-solid fa-hand-pointer" style="margin-right: 8px;"></i> Click Here
                </button>
                <div class="dp-footer-note">
                    <i class="fa-solid fa-shield-halved"></i> ads by Adsterra
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);

        const claimBtn = overlay.querySelector('#darazClaimBtn');
        const content = overlay.querySelector('.daraz-popup-content');
        
        // Button Click: Open Link -> Save to LocalStorage -> Auto Hide
        claimBtn.addEventListener('click', function() {
            window.open('https://s.daraz.lk/s.ZUlf9', '_blank');
            localStorage.setItem(DARAZ_STORAGE_KEY, 'true');
            
            overlay.classList.add('closing');
            setTimeout(() => {
                overlay.remove();
            }, 400); // Matches animation duration
        });

        // Prevent skipping by clicking outside (Triggers Shake animation instead)
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                content.style.animation = 'none';
                setTimeout(() => {
                    content.style.animation = 'dpShake 0.4s ease';
                }, 10);
            }
        });
    }

    // Initialize on Load
    function init() {
        injectAdsterraFooter();
        // Delay popup slightly for better UX and to ensure page is rendered
        setTimeout(showDarazPopup, 800);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
