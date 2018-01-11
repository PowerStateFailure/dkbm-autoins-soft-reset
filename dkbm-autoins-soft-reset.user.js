// ==UserScript==
// @name dkbm-autoins: soft reset fields
// @description Не стираем значения полей по нажатию кнопки "Сбросить"
// @author PowerStateFailure
// @version 1
// @include https://dkbm-web.autoins.ru/dkbm-web-1.0/kbm.htm
// @match https://dkbm-web.autoins.ru/dkbm-web-1.0/kbm.htm
// ==/UserScript==

(function (window) {

    console.debug("Entering userscript...");

    var fakeResetStub = function () {
        console.debug("Entering underlying func...");
        
        var allButtons = $("input[type=button]");
        
        var resetButtoms = $.grep(allButtons, function (elem) {
            return elem.value === "Сбросить";
        });
    
        console.debug("Got bottoms: ", resetButtoms);
    
        resetButtoms[0].onclick = function fakeReset() {
            var elemDict = {}
            $("input[type=text]").each(function () {
                elemDict[this.id] = $(this).val();
            });
            reloadInput();
            $("input[type=text]").each(function () {
                $(this).val(elemDict[this.id]);
            });
        };
    
        console.debug("Hack applied");
    };

    // Хак с SO: внедряем скрипт как элемент страницы
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.textContent = '(' + fakeResetStub.toString() + ')();';
    document.body.appendChild(script);

})(window);
