// ==UserScript==
// @id           wsop-script-gifts@pida42
// @name         WSOP Script Gifts
// @description  WSOP Script gifts colllector
// @namespace    https://github.com/pida42/wsop-script-gifts
// @homepageURL  http://github.com/pida42/gamehunters-auto-collect
// @updateURL    https://raw.githubusercontent.com/pida42/wsop-script-gifts/main/wsop-script-gifts.js
// @version      1.0.1
// @license      MIT
// @author       pida42
// @copyright    2020, pida42 (https://openuserjs.org/users/pida42)
// @icon         https://i.imgur.com/e7AOcvs.png
// @include      http://apps.facebook.com/poker_wsop/*
// @include      https://apps.facebook.com/poker_wsop/*
// @include      http://playwsop.com/*
// @include      https://playwsop.com/*
// @include      http://wsop-prod.wsop.playtika.com/externalparams*
// @include      https://wsop-prod.wsop.playtika.com/externalparams*
// @include      http://standalone-proxy-prod.wsop.playtika.com/*
// @include      https://standalone-proxy-prod.wsop.playtika.com/*
// @match        http://apps.facebook.com/poker_wsop/*
// @match        https://apps.facebook.com/poker_wsop/*
// @match        http://playwsop.com/*
// @match        https://playwsop.com/*
// @match        http://wsop-prod.wsop.playtika.com/externalparams*
// @match        https://wsop-prod.wsop.playtika.com/externalparams*
// @match        http://standalone-proxy-prod.wsop.playtika.com/*
// @match        https://standalone-proxy-prod.wsop.playtika.com/*
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @grant        GM_addStyle
// @grant        GM_xm
// ==/UserScript==

(function (jQuery, open) {
    'use strict';

    console.log('WSOP Script Gifts :: Initialize');

    var waitForElement = {
        _i: null,
        _c: 0,
        _m: 60,
        wait: function(elementSelector, callback) {
            if(null !== waitForElement._i) return false;
            callback = callback || function(){};
            clearInterval(waitForElement._i);
            waitForElement._i = null;
            waitForElement._i = window.setInterval(function() {
                waitForElement._c = waitForElement._c + 1;
                var waitElement = jQuery(elementSelector);
                if(waitElement.length) {
                    clearInterval(waitForElement._i);
                    waitForElement._i = null;
                    callback(waitElement);
                }
                if(waitForElement._c >= waitForElement._m) {
                    clearInterval(waitForElement._i);
                    waitForElement._i = null;
                    return false;
                }
            }, 1000);
        }
    };

    var inboxButtonSelector = '#lobby > div.lobbyBottom > div.lobbyBottomRightButtons > button.btn.btn-lobbySide.inbox.notification';
    var inboxSectionTitleSelector = '#inbox > div.scrollableArea > div:nth-child(1) > div > div.sections > div.inboxSection.gifts.hasNewItems.Master > div';
    var collectAllButtonSelector = '#inbox > div.scrollableArea.hasVerticallyScroll > div:nth-child(1) > div > div.sections > div.inboxSection.gifts.opened.hasNewItems.Master > div.titleContainer > button.btn.genericButton.blue.collectAll';

    waitForElement.wait(inboxButtonSelector, function(inboxButton) {

        console.log('WSOP Script Gifts :: waitForElement.callback -> inboxButton');

        if(typeof inboxButton[0] !== 'undefined' && jQuery(inboxButton[0]).length) {

            jQuery(inboxButton[0]).click();
            console.log('WSOP Script Gifts :: waitForElement.callback -> inboxButton -> click trigger done');

            waitForElement.wait(inboxSectionTitleSelector, function(inboxSectionTitle) {

                console.log('WSOP Script Gifts :: waitForElement.callback -> inboxSectionTitle');

                if(typeof inboxSectionTitle[0] !== 'undefined' && jQuery(inboxSectionTitle[0]).length) {

                    jQuery(inboxSectionTitle[0]).click();
                    console.log('WSOP Script Gifts :: waitForElement.callback -> inboxSectionTitle -> click trigger done');

                    waitForElement.wait(collectAllButtonSelector, function(collectAllButton) {

                        console.log('WSOP Script Gifts :: waitForElement.callback -> collectAllButton');

                        if(typeof collectAllButton[0] !== 'undefined' && jQuery(collectAllButton[0]).length) {

                            var giftsCount = jQuery(inboxButtonSelector).data('count');
                            console.log('WSOP Script Gifts :: waitForElement.callback -> GIFTS: ' + giftsCount);

                            if(parseInt(giftsCount)) {
                                jQuery(collectAllButton[0]).click();
                                console.log('WSOP Script Gifts :: waitForElement.callback -> collectAllButton -> CHIPS COLLECTED');
                            } else {
                                console.log('WSOP Script Gifts :: waitForElement.callback -> collectAllButton -> there is no gift waiting');
                            }
                        }

                    });
                }

            });
        }
    });

})(jQuery);
