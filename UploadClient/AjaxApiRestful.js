
(function ($) {   
    
    var server = "https://localhost:7236/api/";    
 
    var settings = {
        authorization: false,
        token: null,
        control: null,
        data: null
    }

    $.ApiGET = function (options) {
        $.extend(settings, options);
        if (settings.authorization) {
            return $.ajax({
                type: "GET",
                async: true,
                url: server + settings.control,
                contentType: "application/json",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": "Bearer " + settings.token,
                },
                success: function (data) { },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });
        }
        else {
            return $.ajax({
                type: "GET",
                url: server + settings.control,
                contentType: "application/json",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "accept": "application/json",
                },
                async: true,
                success: function (data) { },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });

        }

    }
    $.ApiPOST = function (options) {
        $.extend(settings, options);
        if (settings.authorization) {
            return $.ajax({
                url: server + settings.control,
                contentType: 'application/json',
                type: 'POST',
                data: JSON.stringify(settings.data),
                async: true,
                dataType: 'json',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": "Bearer " + settings.token,
                },
                success: function (data) { },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });
        }
        else {
            return $.ajax({
                type: 'POST',
                url: server + settings.control,
                contentType: 'application/json',
                async: true,
                dataType: 'json',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "accept": "application/json",
                },
                data: JSON.stringify(settings.data),
                success: function (data) { },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });
        }
    }
    $.ApiDELETE = function (options) {
        $.extend(settings, options);
        if (settings.authorization) {
            return $.ajax({
                type: 'DELETE',
                url: server + settings.control,
                contentType: "application/json",
                async: true,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": "Bearer " + settings.token,
                },
                success: function (data) { },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });
        }
    }
    $.ApiPUT = function (options) {
        $.extend(settings, options);
        if (settings.authorization) {
            return $.ajax({
                url: server + settings.control,
                contentType: 'application/json',
                type: 'PUT',
                data: JSON.stringify(settings.data),
                async: true,
                dataType: 'json',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": "Bearer " + settings.token,
                },
                success: function (data) { },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });
        }
        else {
            return $.ajax({
                type: 'PUT',
                url: server + settings.control,
                contentType: 'application/json',
                async: true,
                dataType: 'json',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "accept": "application/json",
                },
                data: JSON.stringify(settings.data),
                success: function (data) { },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });
        }

    }  
    
})(jQuery);



