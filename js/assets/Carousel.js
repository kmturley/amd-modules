/*
    Carousel
    example module
*/

define('Carousel', function() {

    var Module = function(id, options) {
        this.el = document.getElementById(id);
        this.options = options;
        this.init();
    }

    Module.prototype = {
        init: function() {
            console.log('Carousel.init', this);
            console.timeEnd('module');
        }
    }

    return Module;
});