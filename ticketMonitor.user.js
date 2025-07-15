// ==UserScript==
// @name         TicketPlus Auto Ticket Selector
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically select 1 ticket and proceed to next step on TicketPlus, with infinite refresh if no tickets are available
// @author       You
// @match        https://ticketplus.com.tw/order/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to check and interact with the ticket selection element
    function checkAndSelectTickets() {
        // Target the plus button for ticket selection
        const plusButton = document.querySelector('button.v-btn--fab.light-primary-2[data-limit="true"]');
        const ticketCount = document.querySelector('div.count-button > div');
        
        if (plusButton && ticketCount) {
            // Check if tickets are available (data-count > 0)
            const availableTickets = parseInt(plusButton.getAttribute('data-count')) || 0;
            if (availableTickets > 0) {
                // Click the plus button to select 1 ticket
                plusButton.click();
                
                // Find and click the "下一步" (Next) button
                const nextButton = document.querySelector('button.accent-blue span.v-btn__content');
                if (nextButton && nextButton.textContent.includes('下一步')) {
                    nextButton.click();
                    // Stop further execution since we clicked Next
                    return;
                }
            } else {
                // If no tickets are available, click the refresh button
                const refreshButton = document.querySelector('button.float-btn.accent-blue');
                if (refreshButton) {
                    refreshButton.click();
                }
            }
        }
    }

    // Run the check every 1 second
    setInterval(checkAndSelectTickets, 1000);
})();