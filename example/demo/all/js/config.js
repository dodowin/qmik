(function ($) {
    $.sun.config({
        alias: {
            "api/user": "./js/api/user.js?${version}",
            "api/shop": "./js/api/shop.js?${version}"
        },
        vars: {
            version: function () {
                return 1;
            }
        }
    });
})(Qmik);