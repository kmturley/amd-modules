/*global define, window, document*/
/*jslint nomen:true*/

/**
 * Child
 * example module
*/

define('Child', ['Class'], function (Class) {
    'use strict';
    
    return Class.extend({
        name: 'Child',
        init: function (id, options) {
            this.el = document.getElementById(id);
            this.options = options;
            this.render();
        },
        render: function () {
            this.el.innerHTML = this.name + ' = ' + JSON.stringify(this.options);
        },
        childMethod: function () {
            return true;
        }
    });
});