fa.module.b = function () {
    let module = 'b';

    fa[module] = (function (module, ev, rt) {
        let cache = {},
            num   = 0,
            initDOMToken, initModule, destoryModule, updateModule;

        initDOMToken = function () {
            return `<h1>Hello! Nice to meet you.</h1>
                    <button onclick = 'goCountPage()'>to count page.</button>
                    `;
        };

        window.goCountPage = (function(){
            ev.addEvent(module, 'goCountPage');

            return function () {
                rt.changeHash('#/count');
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