function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}
$(document).ready(function () {
    $("#shorten").click(function () {
        $("#section").empty();
        const url = $("#input").val();
        $.post("https://rel.ink/api/links/",
            {
                url: url
            },
            function (data, status) {
                const shortUrl = 'https://rel.ink/' + data.hashid;
                $("#section").append(`<p>Your shortened URL is &rarr;  <a id="shorturl" target='_blank' href='${shortUrl}'>${shortUrl}</a></p>`);
                $("#section").append(`&nbsp; <a href="#"><img onclick="copyToClipboard('#shorturl');" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABOklEQVQ4jWNkwANSZl+axMrKxIlL/sP33wLLMw1DkcUY8RnYsfX+/XBreQVc8m3rrv//8/vv1fnperowMSZ8BhIC8mK8jNb68trxMy9fhbswZdaF6dqyvB7YNPxnYJB5/v4XCwcbM0OSiwqG/NIjTxiMNGQYnr35/P/wxUfXF6brarNwsDJxFngo4fTWgkNPGGTEeBlm7brNkOamiiL37O0XBubbzxgYGBgYOdmZNcMnn13PQozXVCT5GBgYGDAMLfXXQFIlxdi+5spHosNQRZKPwUlXnGHWrtt41RF0oZ4sL8Ouc4/h/D9//1JmoJEiP4ORIj+cv+DQE7zqKUo2owaOVAOJynrI4OvP33/WHn/0AJvczz//vpNsIBMD45MSTwVV3PJUBizff/3dkL3gEgexGn7++fcDnzwA5+tg+adEK0gAAAAASUVORK5CYII="></a>`);
            });
    });

    $("#expand").click(function () {
        $("#section").empty();
        var str = $("#input").val();
        var id = str;
        if (str.includes('rel.ink')) {
            var res = str.split("/");
            id = res[res.length-1];
        }
        $.get("https://rel.ink/api/links/" + id, function (data, status) {
            const expandedUrl = data.url;
            $("#section").append(`<p>Your expanded URL is &rarr;  <a id="expandedurl" target='_blank' href='${expandedUrl}'>${expandedUrl}</a></p>`);
        });
    });

});