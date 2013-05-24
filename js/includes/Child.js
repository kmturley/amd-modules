/*global define, document, console, Class, plate*/
/*jslint nomen:true*/
/**
 * Child
 * example module
*/

define('Child', function () {
    'use strict';
    return Class.extend({
        name: 'Child',
        init: function (id, options) {
            this.el = document.getElementById(id);
            this.options = options;
        },
        render: function () {
            this.el.innerHTML = this.name + ' = ' + JSON.stringify(this.options);
        },
        childMethod: function () {
            return true;
        }
    });
});