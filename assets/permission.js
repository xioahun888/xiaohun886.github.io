function getDocsRole() {
    var user = (localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))) || {};
    var userV = (user.v && JSON.parse(user.v)) || {}
    var userInfo = (userV && userV.user) || {}
    console.log(userInfo)
    if (userInfo.userType == 2) {
        console.log("是管理员");
        return "admin";
    } else if (userInfo.userType == 1 && !!userInfo.agent) {
        console.log("是代理");
        return "proxy";
    } else {
        console.log("是普通用户");
        return "member";
    }
}

function open() {
    let href = window.location.href;
    // 普通用户直接放行
    if (href.indexOf("docs/member") > 0) {
        return;
    }
    var docsRole = getDocsRole();
    var replaceValue = "docs/" + docsRole;
    if (href.indexOf(replaceValue) < 0) {
        window.location.href = href
            .replace("docs/admin", replaceValue)
            .replace("docs/proxy", replaceValue)
            .replace("docs/member", replaceValue);
    }
}
// open();
