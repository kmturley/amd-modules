/*
    Utils
    example utils module
*/

define('Utils', function() {
    return {
        elements: {},
        getEl: function(id) {
            if (typeof id === 'string') {
                if (this.elements[id]) { return this.elements[id]; }
                else { return this.elements[id] = document.getElementById(id); }
            }
            else { return id; }
        },
        clone: function(o) {
            var a = {};
            for (var i in o) { if (o.hasOwnProperty(i)) { a[i] = o[i]; } }
            return a;
        },
        extend: function(o, o2) {
            if (!o) { o = {}; }
            for (var p in o2) {
                    try { if (o2[p].constructor === Object) { o[p] = this.extend(o[p], o2[p]); } else { o[p] = o2[p]; } }
                    catch (e) { o[p] = o2[p]; }
            }
            return o;
        },
        create: function(obj, module) {
            var me = this,
                proto = this.extend(this.clone(obj, module));

            function Module(id, options) {
                this.el = me.getEl(id);
                this.options = me.extend(this.options, options);
                if (this.init) { this.init(); }
            }
            proto.superclass = obj;
            Module.prototype = proto;
            return Module;
        }
    };
});