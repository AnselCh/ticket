// ==UserScript==
// @name         TicketPlus Auto Ticket Selector
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Automatically select ticket area, 1 ticket, and proceed to next step on TicketPlus with natural click events, with infinite refresh if no tickets are available
// @author       You
// @match        https://ticketplus.com.tw/order/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to simulate a natural click event
    function simulateClick(element) {
        if (element) {
            const clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            element.dispatchEvent(clickEvent);
            console.log('Simulated click on element:', element);
        } else {
            console.log('Element not found for click.');
        }
    }

    // Function to get element by XPath
    function getElementByXPath(xpath) {
        const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        return result.singleNodeValue;
    }

    // Function to check and interact with the ticket selection elements
    function checkAndSelectTickets() {
        console.log('Checking ticket availability at', new Date().toLocaleTimeString());

        // Step 1: Click the ticket area selection button
        const areaButton = getElementByXPath('//*[@id="app"]/div/div/div/main/div/div/div[2]/div[3]/div/div[2]/div[2]/div[2]/div/div[3]/div/div/div/div[1]/button');
        if (areaButton) {
            console.log('Found ticket area button, clicking...');
            simulateClick(areaButton);

            // Step 2: Check the plus button after a short delay
            setTimeout(() => {
                const plusButton = getElementByXPath('//*[@id="app"]/div/div/div/main/div/div/div[2]/div[3]/div/div[2]/div[2]/div[2]/div/div[3]/div/div/div/div[1]/div/div/div/div[2]/div/button[2]');
                if (plusButton && plusButton.hasAttribute('data-count')) {
                    const availableTickets = parseInt(plusButton.getAttribute('data-count')) || 0;
                    console.log('Available tickets:', availableTickets);

                    if (availableTickets > 0) {
                        console.log('Selecting 1 ticket...');
                        // Click the plus button to select 1 ticket
                        simulateClick(plusButton);

                        // Step 3: Click the Next button after a short delay
                        setTimeout(() => {
                            const nextButton = getElementByXPath('/html/body/div/div/div/div/main/div/div/div[2]/div[4]/div/div/div[3]/div/div[2]/button/span');
                            if (nextButton) {
                                console.log('Clicking Next button...');
                                simulateClick(nextButton.parentElement); // Click the parent button element
                                // Stop further execution since we clicked Next
                                return;
                            } else {
                                console.log('Next button not found.');
                            }
                        }, 500); // 500ms delay to ensure ticket selection
                    } else {
                        console.log('No tickets available, attempting to refresh...');
                        // Try to click the refresh button
                        const refreshButton = document.querySelector('button.float-btn.accent-blue');
                        if (refreshButton) {
                            console.log('Clicking refresh button...');
                            simulateClick(refreshButton);
                        } else {
                            console.log('Refresh button not found, reloading page...');
                            // Fallback: reload the page
                            window.location.reload();
                        }
                    }
                } else {
                    console.log('Plus button not found or no data-count attribute.');
                    // Try to refresh if plus button is not found
                    const refreshButton = document.querySelector('button.float-btn.accent-blue');
                    if (refreshButton) {
                        console.log('Clicking refresh button...');
                        simulateClick(refreshButton);
                    } else {
                        console.log('Refresh button not found, reloading page...');
                        window.location.reload();
                    }
                }
            }, 500); // 500ms delay to ensure area selection
        } else {
            console.log('Ticket area button not found, attempting to refresh...');
            // Try to click the refresh button
            const refreshButton = document.querySelector('button.float-btn.accent-blue');
            if (refreshButton) {
                console.log('Clicking refresh button...');
                simulateClick(refreshButton);
            } else {
                console.log('Refresh button not found, reloading page...');
                // Fallback: reload the page
                window.location.reload();
            }
        }
    }

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM fully loaded, starting ticket check...');
        // Run the check every 2 seconds
        setInterval(checkAndSelectTickets, 2000);
    });

    // Fallback: Start checking immediately in case DOMContentLoaded has already fired
    setTimeout(checkAndSelectTickets, 1000);
})();