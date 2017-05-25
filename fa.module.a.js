fa.module.a = function () {
    let module = 'a';

    fa[module] = (function (module, ev, rt) {
        let cache = {},
            num   = 0,
            initDOMToken, initModule, destoryModule, updateModule;

        initDOMToken = function () {
            return `<h1>Hello! the total number is ${num}.</h1>
                <button onclick = 'updateModule()'>update</button>
                <button onclick = 'goIntroPage()'>to intro page.</button>
                `;
        };

        window.updateModule = updateModule = (function(){
            ev.addEvent(module, 'updateModule');

            return function () {
                num = 11;
                initModule(cache.container);

            };
        }());

        window.goIntroPage = (function(){
            ev.addEvent(module, 'goIntroPage');

            return function () {
                rt.changeHash('#/intro');
            }
        }());

        initModule = function (container) {
            cache.container = container;
            container.innerHTML = initDOMToken();
        };

        destoryModule = function () {
            cache.container.innerHTML = '';
            fa[module] = null;
            fa.Event.removeEvent(module);
        }

        return {
            initModule: initModule,
            destoryModule: destoryModule
        }
    }(module, fa.Event, fa.router));
};