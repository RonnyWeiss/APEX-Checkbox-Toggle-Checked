function apexCheckboxToggle(pSelf, pIconSelectall, pTextSelecAll, pIconUnselectAll, pTextUnselectAll) {
    "use strict";
    var scriptVersion = "1.0";

    $.each($(pSelf.affectedElements), function (i, item) {

        // add only if it's a checkbox
        if ($(item).hasClass("apex-item-checkbox")) {
            var itemID = $(item).attr("id");

            // select all
            var sSpan = $("<span></span>");
            sSpan.css("margin-left", "20px");
            sSpan.addClass("apex-checkbox-toggle-plug-in-label");
            sSpan.text(pTextSelecAll);
            sSpan.on("click", function () {
                var arr = [];
                $.each($(item).find(":checkbox"), function (idx, el) {
                    arr.push($(el).attr("value"));
                });
                apex.item(itemID).setValue(arr.join(":"));
            });

            if (pIconSelectall) {
                var sSpanIcon = $("<span></span>");
                sSpanIcon.css("line-height", "inherit");
                sSpanIcon.css("font-size", "inherit");
                sSpanIcon.css("margin-right", "3px");
                sSpanIcon.addClass("apex-checkbox-toggle-plug-in-icon");
                sSpanIcon.attr("aria-hidden", "true");
                sSpanIcon.addClass("fa");
                sSpanIcon.addClass(pIconSelectall);
                $(sSpan).prepend(sSpanIcon);
            }

            $("#" + itemID + "_LABEL").append(sSpan);

            // unselect all
            var uSpan = $("<span></span>");
            uSpan.css("margin-left", "8px");
            uSpan.addClass("apex-checkbox-toggle-plug-in-label");
            uSpan.text(pTextUnselectAll);
            uSpan.on("click", function () {
                apex.item(itemID).setValue(null);
            });

            if (pIconSelectall) {
                var uSpanIcon = $("<span></span>");
                uSpanIcon.css("line-height", "inherit");
                uSpanIcon.css("font-size", "inherit");
                uSpanIcon.css("margin-right", "3px");
                uSpanIcon.addClass("apex-checkbox-toggle-plug-in-icon");
                uSpanIcon.attr("aria-hidden", "true");
                uSpanIcon.addClass("fa");
                uSpanIcon.addClass(pIconUnselectAll);
                $(uSpan).prepend(uSpanIcon);
            }

            $("#" + itemID + "_LABEL").append(uSpan);
        }
    });
}
