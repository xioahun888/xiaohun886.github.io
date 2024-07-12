const DEFAULT_LOCALE = "zh-cn";
const DOMAIN = window.location.protocol + '//' + window.location.host;
const BASE_PATH = "";
const INDEX_PATH = "/index.html";
const BASE_INDEX = BASE_PATH + INDEX_PATH;
const BASE_URL = DOMAIN + BASE_PATH;
const Utils = {
    getUrlParam: function getUrlParam(key) {
        let params = new URL(document.location).searchParams;
        return params.get(key);
    },
    getLocale: function getLocale() {
        // return localStorage.getItem("docs/locale");
        return this.getUrlParam("locale");
    },
    getLocaleOnDefault: function getLocaleOnDefault() {
        let locale = this.getLocale();
        // console.log(locale ? locale : DEFAULT_LOCALE)
        return locale ? locale : DEFAULT_LOCALE;
    },
    getLocaleUrl: function getLocaleUrl(locale) {
        let inputUrl = new URL(window.location.href);
        let inputParams = new URLSearchParams(inputUrl.search);
        inputParams.set('locale', locale);
        inputUrl.search = inputParams.toString();
        // console.log(inputUrl.hash)
        let hash = '#/docs/' + locale;
        let hashSplit = inputUrl.hash.split('/');
        for (let i = 3; i < hashSplit.length; i++) {
            hash += "/" + hashSplit[i];
        }
        // console.log(hash)
        inputUrl.hash = hash;
        // console.log(inputUrl.toString())
        return inputUrl.toString();
    }
}
const CURRENT_LOCALE = Utils.getLocaleOnDefault();
const Permission = {
    getDocsRole: function getDocsRole() {
        var user = (localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))) || {};
        var userV = (user.v && JSON.parse(user.v)) || {}
        var userInfo = (userV && userV.user) || {}
        // console.log(userInfo)
        if (userInfo.userType == 2) {
            // console.log("是管理员");
            return "admin";
        } else if (userInfo.userType == 1 && !!userInfo.agent) {
            // console.log("是代理");
            return "proxy";
        } else {
            // console.log("是普通用户");
            return "member";
        }
    },
    currentRole: "",
}
Permission.currentRole = Permission.getDocsRole();

const HOME_PAGE = '/docs/' + CURRENT_LOCALE + '/welcome/welcomepage.md';
const localeDocsify = {
    'zh-cn': {
        search: {
            placeholder: '搜索',
            noData: '没有结果!',
            maxAge: 86400000, // 过期时间，单位毫秒，默认一天
            paths: 'auto', // or 'auto'
            // 搜索标题的最大层级, 1 - 6
            depth: 6,
            // hideOtherSidebarContent: false, // 是否隐藏其他侧边栏内容
            // 避免搜索索引冲突
            // 同一域下的多个网站之间
            namespace: CURRENT_LOCALE + '/' + Permission.currentRole,
        },
        toc: {
            scope: '.markdown-section',
            headings: 'h1, h2, h3, h4, h5, h6',
            title: 'Table of Contents',
        },
    },
    'en': {
        search: {
            placeholder: 'Type to search',
            noData: 'No Results!',
            maxAge: 86400000, // 过期时间，单位毫秒，默认一天
            paths: 'auto', // or 'auto'
            // 搜索标题的最大层级, 1 - 6
            // depth: 6,
            hideOtherSidebarContent: false, // 是否隐藏其他侧边栏内容
            // 避免搜索索引冲突
            // 同一域下的多个网站之间
            namespace: CURRENT_LOCALE + '/' + Permission.currentRole,
        },
        toc: {
            scope: '.markdown-section',
            headings: 'h1, h2, h3, h4, h5, h6',
            title: 'Table of Contents',
        },
    },
}
const defaltDocsify = {
    name: '<div style="height: 36px;display: flex;align-items: center; justify-content: center">\n' +
        '    <img alt="QOIBest" src="' + BASE_PATH + '/assets/logo1.png" style="width: 36px;height: 36px;">\n' +
        '    <span style="margin-left: 10px">QOIBest</span>\n' +
        '</div>',
    // name: 'QOIBest',
    // nameLink: BASE_PATH + '/index.html?locale=' + CURRENT_LOCALE,
    // nameLink: {
    //     '/docs/zh-cn': BASE_PATH + '/index.html?locale=' + CURRENT_LOCALE,
    //     '/docs/en': BASE_PATH + '/index.html?locale=' + CURRENT_LOCALE
    // },
    // basePath: BASE_PATH,
    loadSidebar: true,
    alias: {
        '/.*/_sidebar.md': 'components/' + Permission.currentRole + '/_sidebar_' + CURRENT_LOCALE + '.md',
        '/_sidebar.md': 'components/' + Permission.currentRole + '/_sidebar_' + CURRENT_LOCALE + '.md',
    },
    // loadNavbar: true,
    homepage: INDEX_PATH,
    // auto2top: true,
    hideSidebar: false,
    // logo: '../assets/logo.png',
    // relativePath: true,
    // routerMode: 'history',
    // 完整配置参数
}
defaltDocsify.nameLink = {}
for (let locale in localeDocsify) {
    let linkKey = BASE_PATH + '/' + locale;
    defaltDocsify.nameLink[linkKey] = BASE_INDEX + '?locale=' + locale;
}




