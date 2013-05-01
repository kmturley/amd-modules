/*
    Carousel
    example module
*/

define('Carousel', ['Utils', 'Child'], function(Utils, Child) {
    return Utils.create(Child, {
        init: function() {
            console.log('Carousel', this);
        },
        carouselfunc: function() {
            console.log('Carouselfunc', this);
        }
    });
    
});