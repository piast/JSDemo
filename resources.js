
(function(){    
    var resourceCache = {};
    var callbacks = []; 
    function load(imgs) {
        imgs = Object.prototype.toString.apply(imgs) === '[object Array]' ? imgs : [imgs];
        var loaded = 0;     
        function inc() {
            loaded += 1;
            if (loaded === imgs.length) {
                callbacks.forEach(function(func) {func();});
            } else {
                document.getElementById("preload").innerHTML = "Загрузка: " + Math.round((100/imgs.length)*loaded)+" %";    
            }
        };

        for ( var i = 0; i < imgs.length; i++ ) {
            resourceCache[imgs[i]] = new Image();
            resourceCache[imgs[i]].onabort = inc;
            resourceCache[imgs[i]].onerror = inc;
            resourceCache[imgs[i]].onload = inc;
            resourceCache[imgs[i]].src = imgs[i];
        }
    } 

    function get(url) {
        return resourceCache[url];
    }

    function onReady(func) {
        callbacks.push(func);
    }

    window.resources = { 
        load: load,
        get: get,
        onReady: onReady
    };
})();