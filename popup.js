// ===== FIRST TIME GUIDE POPUP WITH TYPING ANIMATION =====
(function() {
    'use strict';

    const GUIDE_STORAGE_KEY = 'aluth_ewa_guide_shown';

    // Check if guide was already shown
    if (localStorage.getItem(GUIDE_STORAGE_KEY) === 'true') {
        return; // Exit - don't show again
    }

    const steps = [
        {
            number: '1',
            text: 'අවශ්‍ය category එකට ගොස් අවශ්‍ය වීඩීයෝ එක ක්ලික් කරන්න.'
        },
        {
            number: '2',
            text: 'ඉන් පසු පැමිනෙන ඇඩ් 2 නරබන්න.'
        },
        {
            number: '3',
            text: 'නැවත watch now ලබා දෙන්න.'
        },
        {
            number: '4',
            text: 'ඉන්පසු Telegram Bot මගින් ඔබට අවශ්‍ය වීඩියෝව ලබාගත හැකිය.'
        }
    ];

    const warningText = 'සැලකිය යුතුයි : ඇඩ් එක ස්කීප් කලහොත් අවශ්‍ය වීඩියෝව ලබාගත නොහැක.';

    // Build popup HTML
    const popup = document.createElement('div');
    popup.className = 'guide-popup';
    popup.innerHTML = `
        <div class="guide-popup-overlay"></div>
        <div class="guide-popup-content">
            <div class="guide-popup-header">
                <i class="fa-solid fa-circle-info"></i>
                <h2>වෙබ්සයිට් එක භාවිතා කරන ආකාරය</h2>
                <p>How to use this website</p>
            </div>
            <div class="guide-popup-body">
                <div class="guide-steps">
                    ${steps.map((step, i) => `
                        <div class="guide-step" data-step="${i}">
                            <div class="step-number">${step.number}</div>
                            <div class="step-text"></div>
                        </div>
                    `).join('')}
                </div>
                <div class="guide-warning">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <span class="warning-text"></span>
                </div>
            </div>
            <div class="guide-popup-footer">
                <button class="guide-got-it-btn" disabled>
                    <i class="fa-solid fa-check"></i> තේරුණා (Got it)
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(popup);

    const gotItBtn = popup.querySelector('.guide-got-it-btn');
    const overlay = popup.querySelector('.guide-popup-overlay');

    // Typing animation function
    function typeText(element, text, speed = 30) {
        return new Promise((resolve) => {
            let i = 0;
            element.classList.add('typing');
            const interval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(interval);
                    element.classList.remove('typing');
                    resolve();
                }
            }, speed);
        });
    }

    // Run typing animation sequentially
    async function runGuideAnimation() {
        // Small initial delay
        await new Promise(r => setTimeout(r, 400));

        // Type each step one by one
        for (let i = 0; i < steps.length; i++) {
            const stepEl = popup.querySelector(`.guide-step[data-step="${i}"] .step-text`);
            await typeText(stepEl, steps[i].text, 25);
            await new Promise(r => setTimeout(r, 300)); // Pause between steps
        }

        // Type warning text
        const warningEl = popup.querySelector('.warning-text');
        await typeText(warningEl, warningText, 20);

        // Enable the button after all typing is done
        await new Promise(r => setTimeout(r, 400));
        gotItBtn.disabled = false;
        gotItBtn.classList.add('ready');
    }

    // Close popup handler
    function closeGuide() {
        popup.classList.add('closing');
        setTimeout(() => {
            localStorage.setItem(GUIDE_STORAGE_KEY, 'true');
            popup.remove();
        }, 300);
    }

    // Button click
    gotItBtn.addEventListener('click', () => {
        if (!gotItBtn.disabled) {
            closeGuide();
        }
    });

    // Prevent closing by clicking overlay while typing
    overlay.addEventListener('click', () => {
        if (!gotItBtn.disabled) {
            closeGuide();
        }
    });

    // Start animation
    runGuideAnimation();
})();
