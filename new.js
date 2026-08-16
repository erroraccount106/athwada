// ===== DARAZ BOTTOM ANCHOR AD (UNSKIPPABLE) & ADSTERRA SLOT =====
(function() {
    'use strict';

    const DARAZ_LINK = 'https://s.daraz.lk/s.ZUl9X';
    const STORAGE_KEY = 'daraz_anchor_hidden_v1';

    // 1. Inject Professional CSS (Matches your site's dark theme)
    const css = `
        .dz-anchor-wrapper {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            z-index: 9999;
            background: linear-gradient(90deg, var(--bg-darker, #050202) 0%, var(--bg-card, #1a0a0a) 50%, var(--bg-darker, #050202) 100%);
            border-top: 2px solid #F85606; /* Daraz Orange */
            box-shadow: 0 -10px 35px rgba(0, 0, 0, 0.95);
            padding: 16px 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 25px;
            transform: translateY(100%);
            animation: dzSlideUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            animation-delay: 1.5s; /* Slides up after page loads */
        }
        .dz-anchor-wrapper.dz-hiding {
            animation: dzSlideDown 0.5s ease forwards;
        }
        @keyframes dzSlideUp { to { transform: translateY(0); } }
        @keyframes dzSlideDown { to { transform: translateY(100%); } }

        .dz-anchor-icon {
            font-size: 38px;
            color: #F85606;
            filter: drop-shadow(0 0 10px rgba(248, 86, 6, 0.5));
            animation: dzBounce 2s infinite ease-in-out;
        }
        @keyframes dzBounce {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(-5deg); }
        }

        .dz-anchor-text {
            flex: 1;
            color: var(--text-primary, #f5f5f5);
            font-size: 18px;
            font-weight: 600;
            line-height: 1.4;
            letter-spacing: 0.5px;
        }
        .dz-anchor-text span {
            color: #F85606;
            font-weight: 800;
            text-shadow: 0 0 8px rgba(248, 86, 6, 0.4);
        }

        .dz-anchor-btn {
            background: linear-gradient(135deg, #F85606 0%, #ff7b3a 100%);
            color: #fff;
            font-weight: 700;
            font-size: 16px;
            padding: 14px 32px;
            border-radius: 50px;
            border: none;
            cursor: pointer;
            white-space: nowrap;
            box-shadow: 0 6px 20px rgba(248, 86, 6, 0.4);
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            display: flex;
            align-items: center;
            gap: 10px;
            position: relative;
            overflow: hidden;
        }
        .dz-anchor-btn::before {
            content: '';
            position: absolute;
            top: 0; left: -100%;
            width: 100%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s ease;
        }
        .dz-anchor-btn:hover::before { left: 100%; }
        .dz-anchor-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 25px rgba(248, 86, 6, 0.6);
        }
        .dz-anchor-btn:active { transform: scale(0.98); }

        /* Adsterra Container Slot */
        .dz-adsterra-slot {
            width: 100%;
            text-align: center;
            margin-bottom: 10px;
            display: none; /* Hidden by default. Change to 'block' if you paste Adsterra code inside */
        }

        /* Push page content up so footer doesn't overlap your site content */
        body.has-dz-anchor {
            padding-bottom: 90px !important;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
            .dz-anchor-wrapper {
                flex-direction: column;
                gap: 12px;
                padding: 18px 20px;
                text-align: center;
            }
            .dz-anchor-icon { font-size: 32px; }
            .dz-anchor-text { font-size: 16px; }
            .dz-anchor-btn {
                width: 100%;
                justify-content: center;
                padding: 14px 20px;
            }
            body.has-dz-anchor {
                padding-bottom: 160px !important;
            }
        }
    `;

    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    // 2. Logic
    function init() {
        // Check if user already clicked (Never show again)
        if (localStorage.getItem(STORAGE_KEY) === 'true') return;

        document.body.classList.add('has-dz-anchor');

        const wrapper = document.createElement('div');
        wrapper.className = 'dz-anchor-wrapper';
        wrapper.innerHTML = `
            <!-- ============================================== -->
            <!-- PASTE YOUR ADSTERRA NATIVE/BANNER SCRIPT HERE  -->
            <!-- (It will show right above the Daraz button)    -->
            <!-- ============================================== -->
            <div class="dz-adsterra-slot">
                <!-- <script type="text/javascript" src="//your-adsterra-link.com"></script> -->
            </div>

            <div class="dz-anchor-icon">
                <i class="fa-solid fa-gift"></i>
            </div>
            <div class="dz-anchor-text">
                Daraz වෙතින් නොමිලේ <span>Gifts</span> දිනාගන්න!
            </div>
            <button class="dz-anchor-btn" id="dzAnchorBtn">
                <i class="fa-solid fa-hand-pointer"></i> Click Here
            </button>
        `;
        
        document.body.appendChild(wrapper);

        const btn = wrapper.querySelector('#dzAnchorBtn');
        
        // Unskippable: No close button. MUST click the main button to hide.
        btn.addEventListener('click', () => {
            window.open(DARAZ_LINK, '_blank');
            localStorage.setItem(STORAGE_KEY, 'true'); // Save to never show again
            
            wrapper.classList.add('dz-hiding');
            setTimeout(() => {
                wrapper.remove();
                document.body.classList.remove('has-dz-anchor');
            }, 500);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
