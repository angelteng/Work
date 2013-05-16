/**
* Created with JetBrains WebStorm.
* User: Angel
* Date: 13-5-15
* To change this template use File | Settings | File Templates.
*/
(function () {
    var get = function (n) {
        var c = document.getElementById(n);
        return c;
    };
    var leftul = get("left");
    var leftli = leftul.getElementsByTagName("li");
    for (i = 0; i < leftli.length; i++) {
        leftli[i].style.top = i * 58 + "px";

    }

})();
function submit_Click() {
        window.location.href = "http://localhost:19505/Success.aspx";
    }