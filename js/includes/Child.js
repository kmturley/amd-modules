/*global define, document, console, Class, plate*/
/*jslint nomen:true*/
/**
 * Child
 * example module
*/

define('Child', ['plate'], function (plate) {
    'use strict';
    return Class.extend({
        name: 'Child',
        init: function (id, options) {
            this.el = document.getElementById(id);
            this.tmpl = document.getElementById('tmpl' + this.name).innerHTML;
            this.options = options;
        },
        render: function () {
            var me = this;
            new plate.Template(this.tmpl).render(this.options, function (e, html) {
                me.el.innerHTML = html;
            });
        },
        childMethod: function () {
            return true;
        }
    });
});