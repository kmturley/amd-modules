/*
    Carousel
    example module
*/

app.Carousel = function(id, options) {
    this.el = document.getElementById(id);
    this.options = options;
    this.init();
};

app.Carousel.prototype = {
    init: function() {
        console.log('Carousel.init', this);
        console.timeEnd('module');
    }
};