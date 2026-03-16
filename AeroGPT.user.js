// ==UserScript==
// @name         AeroGPT
// @namespace    http://tampermonkey.net/
// @version      2.2
// @match        https://chatgpt.com/*
// @grant        GM_info
// ==/UserScript==


(function() {
    'use strict';

    // Elements to be BLURRED
    const blurTargets = [
        '/html/body/div[2]/div/div[1]/div/div/div/main/div/div/div[2]/div[2]/div/div/div/div[2]/form/div[2]/div', // search bar
        '/html/body/div[2]/div[1]/div/div[2]/div/main/div/div/div[2]/div[1]/div/button',
        '//*[@id="page-header"]',
        '/html/body/div[5]/div/div/div/div/div',
        '/html/body/div[6]',
        '//*[@id="radix-_r_g_"]',
        '/html/body/div[2]/div/div[1]/div/div[1]/div/div[2]/nav/div[8]', // profile bottom left
        '//*[@id="radix-_r_c_"]',
        '//*[@id="radix-_r_11u_"]',
        '//*[@id="radix-_r_i_"]',
        '//*[@id="radix-_r_nm_"]',
        '/html/body/div[2]/div[1]/div/div[2]/div/main/div/div/div[2]/div[2]/div/div/div[2]/div',
        '//*[@id="thread-bottom"]/div/div/div[2]/form/div[2]/div',
        '//*[@id="stage-slideover-sidebar"]/div/div[2]/nav/aside'
    ];

    // Elements to be INVISIBLE
    const opacityTargets = [
       // '//*[@id="stage-slideover-sidebar"]/div/div[2]/nav/div[8]/div'
    ];

    // Elements to be DELETED
    const deleteXPathTargets = [
        '/html/body/div[2]/div[1]/div/div[2]/div/main/div/div/div[2]/div[3]/div/div/div',
        '/html/body/div[2]/div[1]/div/div[2]/div/main/div/div/div[2]/div[2]/div/div/div[2]/div',
        '//*[@id="stage-slideover-sidebar"]/div/div[2]/nav/aside/div'
    ];

    const blurAlpha = 0.1;
    const blurPx = 10;

    function applyStyles() {
        // Blur
        blurTargets.forEach(path => {
            const el = document.evaluate(path, document, null, 9, null).singleNodeValue;
            if (el && !el.dataset.blurred) {
                el.style.backgroundColor = `rgba(0,0,0,${blurAlpha})`;
                el.style.backdropFilter = `blur(${blurPx}px)`;
                el.style.WebkitBackdropFilter = `blur(${blurPx}px)`;
                el.dataset.blurred = 'true';
            }
        });

        // Invisible
        opacityTargets.forEach(path => {
            const el = document.evaluate(path, document, null, 9, null).singleNodeValue;
            if (el && !el.dataset.hidden) {
                el.style.opacity = '0';
                el.style.pointerEvents = 'none';
                el.setAttribute('aria-hidden', 'true');
                el.dataset.hidden = 'true';
            }
        });

        // Delete
        deleteXPathTargets.forEach(path => {
            const el = document.evaluate(path, document, null, 9, null).singleNodeValue;
            if (el) {
                el.remove();
            }
        });

        // Bottom bar tweaks
        const bottomBar = document.querySelector('.sticky.bottom-0.z-30');
        if (bottomBar) {
            bottomBar.style.marginRight = '15px';
            bottomBar.style.marginLeft = '15px';
            bottomBar.style.bottom = '15px';
            bottomBar.style.borderRadius = '8px';
        }

        const newChat = document.evaluate(
            '//*[@id="stage-slideover-sidebar"]/div/div[2]/nav/aside',
            document, null, 9, null
        ).singleNodeValue;

        if (newChat) {
            newChat.style.borderRadius = '20px';
        }

        // Theme vars
        document.documentElement.style.setProperty('--bg-primary', 'rgba(0,0,0,0)');
        document.documentElement.style.setProperty('--main-surface-tertiary', 'rgba(0,0,0,0.2)');
        document.documentElement.style.setProperty('--message-surface', 'rgba(0,0,0,0.2)');
    }

    const buttonSelector = '.btn.border-token-interactive-border-secondary-default.bg-token-bg-primary';

    function updateButton() {
        const version = GM_info?.script?.version || 'unknown';
        const btn = document.querySelector(buttonSelector);
        if (btn && !btn.dataset.modified) {
            btn.textContent = `AeroGPT v${version}`;
            btn.disabled = true;
            btn.style.pointerEvents = 'none';
            btn.dataset.modified = 'true';
        }
    }

    function repositionHeader() {
        const header = document.getElementById('page-header');
        if (!header) return;

        header.style.position = 'sticky';
        header.style.marginLeft = '10px';
        header.style.borderRadius = '12px';
        header.style.width = 'calc(100% - 30px)';
        header.style.top = '10px';
    }
    window.addEventListener('load', () => {
        setTimeout(delayedExecution, 1000);
    });

    //======================
    // EXCECUTION
    //======================

    applyStyles();
    updateButton();

    const observer = new MutationObserver(() => {
        applyStyles();
        updateButton();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    //======================
    // DELAYED EXCECUTION
    //======================
    function delayedExecution() {
        repositionHeader();
        const weirdLine = document.querySelector('.align-end.pointer-events-none.sticky.z-40.flex.shrink-0.flex-col.justify-end'); //weird line in the bottom left
        weirdLine.style.opacity = '0';
        // '//*[@id="stage-slideover-sidebar"]/div/div[2]/nav/div[8]'
    }
})();