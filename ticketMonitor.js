(function() {
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
    const interval = setInterval(checkAndSelectTickets, 1000);

    // Stop the interval after 5 minutes (300,000 ms) to prevent infinite running
    setTimeout(() => {
        clearInterval(interval);
        console.log('Ticket monitoring stopped after 5 minutes.');
    }, 300000);
})();