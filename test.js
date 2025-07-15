// ==UserScript==
// @name         TicketPlus Test Script
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Test if Userscripts is working on TicketPlus page by showing an alert and adding a red border
// @author       You
// @match        https://ticketplus.com.tw/order/82410088f8dae3b61a0395f347944405/d21c86f5a0d5e854b24740de31acc0e5
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // Show an alert to confirm the script is running
    alert('Userscripts is working! This is a test script running on TicketPlus.');
    
    // Add a red border to the page body to visually confirm
    document.body.style.border = '5px solid red';
})();