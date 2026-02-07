// ==UserScript==
// @name         AeroGPT
// @namespace    http://tampermonkey.net/
// @version      2.0
// @match        https://chatgpt.com/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    // Blur targets
    const blurTargets = [
        '/html/body/div[2]/div[1]/div/div[2]/div/main/div/div/div[2]/div[2]/div/div/div[2]/form/div[2]/div',
        '/html/body/div[2]/div[1]/div/div[2]/div/main/div/div/div[2]/div[1]/div/button',
        '//*[@id="page-header"]',
        '/html/body/div[5]/div/div/div/div/div', // settings menu
        '/html/body/div[6]', // key shortcuts
        '//*[@id="radix-_r_g_"]', // header options menu
        '/html/body/div[2]/div[1]/div/div[1]/div/div[2]/nav/div[9]', //profile
        '//*[@id="radix-_r_c_"]', //profile click menu
        '//*[@id="radix-_r_11u_"]', //profile click help menu
        '//*[@id="radix-_r_i_"]', //attatchments menu
        '//*[@id="radix-_r_nm_"]', //attatchments more menu
        '/html/body/div[2]/div[1]/div/div[2]/div/main/div/div/div[2]/div[2]/div/div/div[2]/div' //"You‘re using a less powerful model..." blurred in case it shows up somehow
    ];

    // Delete targets
    const deleteXPathTargets = [
        '/html/body/div[2]/div[1]/div/div[2]/div/main/div/div/div[2]/div[3]/div/div/div',
        '/html/body/div[2]/div[1]/div/div[2]/div/main/div/div/div[2]/div[2]/div/div/div[2]/div' //"You‘re using a less powerful model..."
    ];

    const blurAlpha = 0.1;
    const blurPx = 10;

    function applyStyles() {
        // Blur targets
        blurTargets.forEach(path => {
            const el = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (el && !el.dataset.blurred) {
                el.style.backgroundColor = `rgba(0,0,0,${blurAlpha})`;
                el.style.backdropFilter = `blur(${blurPx}px)`;
                el.style.WebkitBackdropFilter = `blur(${blurPx}px)`; // Safari
                el.dataset.blurred = 'true';
                console.log('Blur applied to element:', el);
            }
        });

        // Delete targets
        deleteXPathTargets.forEach(path => {
            const el = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (el) {
                el.remove();
                console.log('Deleted element:', el);
            }
        });
        // other shit
        const bottomBar = document.querySelector('.sticky.bottom-0.z-30');
        if (bottomBar) {
            // Make it extend more to the right
            //bottomBar.style.width = 'calc(100% + 30px)'; // add 30px extra width
            bottomBar.style.marginRight = '17px'; // shift it right so it doesn't overflow the container
            bottomBar.style.marginLeft = '20px';
            bottomBar.style.bottom = '15px';
            bottomBar.style.borderRadius = '8px';
            console.log('Bottom bar widened to the right!');
        }

        // Dark theme adjustments
        document.documentElement.style.setProperty('--bg-primary', 'rgba(0,0,0,0)');
        document.documentElement.style.setProperty('--main-surface-tertiary', 'rgba(0,0,0,0.2)');
        document.documentElement.style.setProperty('--message-surface', 'rgba(0,0,0,0.2)');
    }

    // Button modification
    const buttonSelector = '.btn.border-token-interactive-border-secondary-default.bg-token-bg-primary';

    function updateButton() {
        const version = GM_info?.script?.version || 'unknown';
        const btn = document.querySelector(buttonSelector);
        if (btn && !btn.dataset.modified) {
            btn.textContent = `AeroGPT v${version}`;
            btn.disabled = true;
            btn.style.pointerEvents = 'none';
            btn.dataset.modified = 'true';
            console.log('Button text updated and disabled:', btn);
        }
    }
    // Initial runs
    applyStyles();
    updateButton();

    // Observe dynamic DOM changes
    const observer = new MutationObserver(() => {
        applyStyles();
        updateButton();
    });
    observer.observe(document.body, { childList: true, subtree: true });

})();


// ==========================
// Header reposition script (completely separate)
// ==========================
(function() {
    'use strict';

    function repositionHeader() {
        const header = document.getElementById('page-header');
        if (!header) return;

        header.style.position = 'sticky';
        header.style.marginLeft = '4px';
        header.style.borderRadius = '12px';
        header.style.width = 'calc(100% - 30px)';
        header.style.top = '10px';

        console.log('Header repositioned');
    }

    // Delay to wait for page JS
    window.addEventListener('load', () => {
        setTimeout(repositionHeader, 1000);
    });
})();