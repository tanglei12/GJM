;(function ($) {

    // 按钮权限
    var type_button = 2;
    // 查询权限
    var type_query = 3;

    /**
     * 获取权限
     *
     * @param url
     * @param type
     * @param callback
     */
    $.power = function (url, type, callback) {
        url = url || window.location.pathname;
        type = type || 2;

        $.ajax({
            type: "POST",
            url: "/user/userJurisdiction",
            data: {
                url: url,
                ucps_type: type
            },
            dataType: "json",
        }).done(function (result) {
            result = result || "";
            var menus = result.menuLists || "";
            if (typeof callback === "function") callback(menus);
        }).fail(function () {
            if (typeof callback === "function") callback([]);
        });
    };

    /**
     * 获取按钮权限
     *
     * @param callback
     */
    $.power.getButton = function (callback) {
        $.power(null, type_button, callback);
    };

    /**
     * 获取查询权限
     *
     * @param callback
     */
    $.power.getQuery = function (callback) {
        $.power(null, type_query, callback);
    };

})(jQuery);