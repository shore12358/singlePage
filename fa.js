let fa = {};

// 主容器
fa.container = document.getElementById('content');

// 生成模块的函数空间;
fa.module = {};

fa.router = (function () {
    let hashMap = {},
        currentModule, newModule, setHashMap, changeHash;

    setHashMap = function (obj) {
        for (key in obj) {
            hashMap[key] = obj[key];
        }
    };

    changeHash = function (str) {
        if (str.indexOf('#') === 0) {
            newModule = hashMap[str];
            fa.module[newModule]();
            location.hash = str;
        }
    };

    if ('onhashchange' in window) {
        document.body.onhashchange = function () {
            currentModule && fa[currentModule].destoryModule();
            fa[newModule].initModule(fa.container);
            currentModule = newModule;
            newModule = null;
        };
    } else {
        fa.container.innerHTML = '浏览器不支持hash监听';
    }

    return {
        setHashMap: setHashMap,
        changeHash: changeHash
    }

}());

// 全局事件添加和移除
fa.Event = (function () {
    let eventMap = {},
        addEvent, removeEvent;

    addEvent = function (namespace, event) {
        eventMap[namespace] || (eventMap[namespace] = []);
        eventMap[namespace].push(event);
    };
    removeEvent = function (namespace) {
        if (!eventMap[namespace]) {
            return;
        }
        eventMap[namespace].forEach((item) => {
            delete window[item];
        });
        delete eventMap[namespace];
    };

    return  {
        addEvent: addEvent,
        removeEvent: removeEvent
    }

}());

