// ==UserScript==
// @name         TicketPlus Auto Ticket Selector
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Automatically select 1 ticket and proceed to next step on TicketPlus, with infinite refresh if no tickets are available
// @author       You
// @match        https://ticketplus.com.tw/order/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to check and interact with the ticket selection element
    function checkAndSelectTickets() {
        console.log('Checking ticket availability...');

        // Target the plus button for ticket selection
        const plusButton = document.querySelector('button.v-btn--fab.light-primary-2[data-limit="true"]');
        const ticketCount = document.querySelector('div.count-button > div');

        if (plusButton && ticketCount) {
            console.log('Found plus button and ticket count element.');
            // Check if tickets are available (data-count > 0)
            const availableTickets = parseInt(plusButton.getAttribute('data-count')) || 0;
            console.log('Available tickets:', availableTickets);

            if (availableTickets > 0) {
                console.log('Selecting 1 ticket...');
                // Click the plus button to select 1 ticket
                plusButton.click();

                // Wait briefly to ensure ticket selection is registered
                setTimeout(() => {
                    // Find and click the "下一步" (Next) button
                    const nextButton = document.querySelector('button.accent-blue span.v-btn__content');
                    if (nextButton && nextButton.textContent.includes('下一步')) {
                        console.log('Clicking Next button...');
                        nextButton.click();
                        // Stop further execution since we clicked Next
                        return;
                    } else {
                        console.log('Next button not found or does not contain "下一步".');
                    }
                }, 500); // 500ms delay to ensure ticket selection
            } else {
                console.log('No tickets available, attempting to refresh...');
                // Try to click the refresh button
                const refreshButton = document.querySelector('button.float-btn.accent-blue');
                if (refreshButton) {
                    console.log('Clicking refresh button...');
                    refreshButton.click();
                } else {
                    console.log('Refresh button not found, reloading page...');
                    // Fallback: reload the page if refresh button is not found
                    window.location.reload();
                }
            }
        } else {
            console.log('Plus button or ticket count element not found.');
        }
    }

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM fully loaded, starting ticket check...');
        // Run the check every 2 seconds (increased from 1s to reduce server load)
        setInterval(checkAndSelectTickets, 2000);
    });

    // Fallback: Start checking immediately in case DOMContentLoaded has already fired
    setTimeout(checkAndSelectTickets, 1000);
})();