// ===== DARAZ UNSKIPPABLE POPUP & ADSTERRA FOOTER POPUP =====
(function() {
    'use strict';

    const DARAZ_LINK = 'https://s.daraz.lk/s.ZUlf9';
    const DARAZ_STORAGE_KEY = 'daraz_gift_popup_hidden';
    
    // 1. Inject Professional CSS (Uses your existing style.css variables)
    const styles = `
        /* --- DARAZ POPUP STYLES --- */
        .dz-overlay {
            position: fixed;
            inset: 0;
            background: rgba(5, 2, 2, 0.92);
            backdrop-filter: blur(12px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: dzFadeIn 0.5s ease forwards;
            padding: 20px;
        }
        .dz-overlay.dz-closing { animation: dzFadeOut 0.5s ease forwards; }
        @keyframes dzFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes dzFadeOut { from { opacity: 1; } to { opacity: 0; } }

        .dz-box {
            background: linear-gradient(160deg, var(--bg-card, #1a0a0a) 0%, var(--bg-darker, #050202) 100%);
            border: 2px solid #F85606; /* Daraz Orange */
            border-radius: 24px;
            max-width: 420px;
            width: 100%;
            padding: 40px 30px;
            text-align: center;
            position: relative;
            box-shadow: 0 20px 60px rgba(248, 86, 6, 0.25), 0 0 0 1px rgba(255,255,255,0.05) inset;
            animation: dzPopIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            overflow: hidden;
        }
        .dz-box.dz-shake { animation: dzShake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes dzPopIn {
            0% { transform: scale(0.8) translateY(30px); opacity: 0; }
            100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes dzShake {
            10%, 90% { transform: translate3d(-2px, 0, 0); }
            20%, 80% { transform: translate3d(4px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-8px, 0, 0); }
            40%, 60% { transform: translate3d(8px, 0, 0); }
        }

        .dz-glow {
            position: absolute;
            top: -50%; left: -50%;
            width: 200%; height: 200%;
            background: radial-gradient(circle, rgba(248, 86, 6, 0.15) 0%, transparent 60%);
            pointer-events: none;
            animation: dzRotateGlow 10s linear infinite;
        }
        @keyframes dzRotateGlow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        .dz-icon {
            font-size: 64px;
            color: #F85606;
            margin-bottom: 20px;
            display: inline-block;
            filter: drop-shadow(0 5px 15px rgba(248, 86, 6, 0.4));
            animation: dzBounce 2s infinite ease-in-out;
            position: relative;
            z-index: 2;
        }
        @keyframes dzBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }

        .dz-title {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 32px;
            color: var(--text-primary, #f5f5f5);
            letter-spacing: 1.5px;
            line-height: 1.2;
            margin-bottom: 15px;
            position: relative;
            z-index: 2;
        }
        .dz-title span { color: #F85606; text-shadow: 0 0 10px rgba(248, 86, 6, 0.5); }

        .dz-desc {
            color: var(--text-secondary, #b8a8a8);
            font-size: 14px;
            line-height: 1.6;
            margin-bottom: 30px;
            position: relative;
            z-index: 2;
        }

        .dz-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            background: linear-gradient(135deg, #F85606 0%, #ff7b3a 100%);
            color: #fff;
            font-weight: 700;
            font-size: 18px;
            padding: 16px 45px;
            border-radius: 50px;
            border: none;
            cursor: pointer;
            width: 100%;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            box-shadow: 0 10px 25px rgba(248, 86, 6, 0.4);
            transition: all 0.3s ease;
            position: relative;
            z-index: 2;
            overflow: hidden;
        }
        .dz-btn::before {
            content: '';
            position: absolute;
            top: 0; left: -100%;
            width: 100%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s ease;
        }
        .dz-btn:hover::before { left: 100%; }
        .dz-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(248, 86, 6, 0.6); }
        .dz-btn:active { transform: translateY(1px); }

        /* --- ADSTERRA FOOTER POPUP STYLES --- */
        .adsterra-footer-popup {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            z-index: 8000; /* Sits below Daraz Popup but above page content */
            background: linear-gradient(180deg, var(--bg-card, #1a0a0a) 0%, var(--bg-darker, #050202) 100%);
            border-top: 2px solid var(--accent, #ff2e4d);
            box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.8);
            padding: 15px 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: translateY(100%);
            animation: slideUpFooter 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            animation-delay: 1.5s; /* Slides up slightly after page load */
        }
        @keyframes slideUpFooter { to { transform: translateY(0); } }

        .adsterra-close-btn {
            position: absolute;
            top: -18px;
            right: 15px;
            background: var(--red-primary, #8b0000);
            color: white;
            border: 2px solid var(--bg-dark, #0a0505);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 16px;
            z-index: 10;
            box-shadow: 0 4px 15px rgba(0,0,0,0.6);
            transition: all 0.2s ease;
        }
        .adsterra-close-btn:hover {
            background: var(--red-bright, #c41e3a);
            transform: scale(1.1) rotate(90deg);
        }

        .adsterra-ad-container {
            width: 100%;
            max-width: 800px;
            min-height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        body.has-footer-ad-popup { padding-bottom: 90px !important; }
    `;

    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    // 2. Daraz Popup Logic (Unskippable)
    function initDarazPopup() {
        if (localStorage.getItem(DARAZ_STORAGE_KEY) === 'true') return;

        const overlay = document.createElement('div');
        overlay.className = 'dz-overlay';
        overlay.innerHTML = `
            <div class="dz-box">
                <div class="dz-glow"></div>
                <div class="dz-icon"><i class="fa-solid fa-gift"></i></div>
                <h2 class="dz-title">Daraz වෙතින් නොමිලේ <span>Gifts</span> දිනාගන්න!</h2>
                <p class="dz-desc">ඔබේ නොමිලේ තෑගි දැන්ම ලබාගන්න. මෙය නැවත ලබා නොදේ!</p>
                <button class="dz-btn" id="dzClaimBtn">
                    <i class="fa-solid fa-hand-pointer"></i> Click Here
                </button>
            </div>
        `;
        document.body.appendChild(overlay);

        const box = overlay.querySelector('.dz-box');
        const btn = overlay.querySelector('#dzClaimBtn');

        // Prevent skipping: Clicking outside shakes the box instead of closing
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                box.classList.add('dz-shake');
                setTimeout(() => box.classList.remove('dz-shake'), 500);
            }
        });

        // Button Click: Open Link -> Save to LocalStorage -> Auto Hide Forever
        btn.addEventListener('click', () => {
            window.open(DARAZ_LINK, '_blank');
            localStorage.setItem(DARAZ_STORAGE_KEY, 'true');
            
            overlay.classList.add('dz-closing');
            setTimeout(() => overlay.remove(), 500);
        });
    }

    // 3. Adsterra Footer Popup Logic
    function initAdsterraFooter() {
        document.body.classList.add('has-footer-ad-popup');
        
        const footerAd = document.createElement('div');
        footerAd.className = 'adsterra-footer-popup';
        footerAd.innerHTML = `
            <button class="adsterra-close-btn" id="closeFooterAd" title="Close Ad">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="adsterra-ad-container">
                <!-- ============================================== -->
                <!-- PASTE YOUR ADSTERRA FOOTER/BANNER SCRIPT HERE  -->
                <!-- ============================================== -->
                
                <!-- Placeholder (Remove this when you paste your code) -->
                <div style="color: var(--text-secondary); font-size: 12px; letter-spacing: 2px; text-transform: uppercase; border: 1px dashed var(--border-color); padding: 15px 30px; border-radius: 8px; width: 100%; text-align: center;">
                    <i class="fa-solid fa-rectangle-ad" style="margin-right: 8px; color: var(--accent);"></i> Adsterra Footer Ad Space
                </div>
            </div>
        `;
        document.body.appendChild(footerAd);

        // Close button logic for the footer ad
        document.getElementById('closeFooterAd').addEventListener('click', () => {
            footerAd.style.transform = 'translateY(100%)';
            footerAd.style.transition = 'transform 0.4s ease';
            setTimeout(() => {
                footerAd.remove();
                document.body.classList.remove('has-footer-ad-popup');
            }, 400);
        });
    }

    // 4. Initialize Everything
    window.addEventListener('DOMContentLoaded', () => {
        initDarazPopup();
        initAdsterraFooter();
    });

})();
