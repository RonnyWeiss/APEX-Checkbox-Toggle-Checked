function apexCheckboxToggle(pSelf, pIconSelectall, pTextSelecAll, pIconUnselectAll, pTextUnselectAll, pIconInvertSelection, pTextInvertSelection) {
    "use strict";
    var util = {
        featureDetails: {
            name: "APEX Checkbox toggle Checked",
            scriptVersion: "1.1",
            utilVersion: "1.5",
            url: "https://github.com/RonnyWeiss",
            license: "MIT"
        },
        isDefinedAndNotNull: function (pInput) {
            if (typeof pInput !== "undefined" && pInput !== null && pInput != "") {
                return true;
            } else {
                return false;
            }
        }
    };

    apex.debug.info({
        "fct": util.featureDetails.name + " - " + "apexCheckboxToggle",
        "arguments": {
            "pSelf": pSelf,
            "pIconSelectall": pIconSelectall,
            "pTextSelecAll": pTextSelecAll,
            "pIconUnselectAll": pIconUnselectAll,
            "pTextUnselectAll": pTextUnselectAll,
            "pIconInvertSelection": pIconInvertSelection,
            "pTextInvertSelection": pTextInvertSelection
        },
        "featureDetails": util.featureDetails
    });

    function addIcon(pParent, pIcon) {
        var sSpanIcon = $("<span></span>");
        sSpanIcon.css("line-height", "inherit");
        sSpanIcon.css("font-size", "inherit");
        sSpanIcon.css("margin-right", "3px");
        sSpanIcon.addClass("apex-checkbox-toggle-plug-in-icon");
        sSpanIcon.attr("aria-hidden", "true");
        sSpanIcon.addClass("fa");
        sSpanIcon.addClass(pIcon);
        $(pParent).prepend(sSpanIcon);
    }

    $.each($(pSelf.affectedElements), function (i, item) {

        // add only if it's a checkbox
        if ($(item).hasClass("apex-item-checkbox")) {
            var itemID = $(item).attr("id");

            // select all
            var sSpan = $("<span></span>");
            sSpan.css("margin-left", "20px");
            sSpan.css("user-select", "none");
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
                addIcon(sSpan, pIconSelectall);
            }

            $("#" + itemID + "_LABEL").append(sSpan);

            // select none
            var uSpan = $("<span></span>");
            uSpan.css("margin-left", "8px");
            uSpan.css("user-select", "none");
            uSpan.addClass("apex-checkbox-toggle-plug-in-label");
            uSpan.text(pTextUnselectAll);
            uSpan.on("click", function () {
                apex.item(itemID).setValue(null);
            });

            if (pIconSelectall) {
                addIcon(uSpan, pIconUnselectAll);
            }

            $("#" + itemID + "_LABEL").append(uSpan);

            // invert selection
            var iSpan = $("<span></span>");
            iSpan.css("margin-left", "8px");
            iSpan.css("user-select", "none");
            iSpan.addClass("apex-checkbox-toggle-plug-in-label");
            iSpan.text(pTextInvertSelection);
            iSpan.on("click", function () {
                var curVal = apex.item(itemID).getValue();
                var curValArr = [];

                if (util.isDefinedAndNotNull(curVal)) {

                    if (Array.isArray(curVal)) {
                        curValArr = curVal;
                    }

                    if (typeof curVal === "string") {
                        curValArr = curVal.split(":");
                    }
                }

                var arr = [];
                $.each($(item).find(":checkbox"), function (idx, el) {
                    arr.push($(el).attr("value"));
                });

                arr = arr.filter(function (arrEl) {
                    return curValArr.indexOf(arrEl) < 0;
                });

                apex.item(itemID).setValue(arr.join(":"));

            });

            if (pIconSelectall) {
                addIcon(iSpan, pIconInvertSelection);
            }

            $("#" + itemID + "_LABEL").append(iSpan);
        }
    });
}
