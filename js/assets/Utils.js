/**
 * Utils
 * example utils module
*/

define('Utils', function() {
	return {
		elements: {},
		getEl: function(id) {
			if (typeof id === 'string') {
				if (this.elements[id]) {
					return this.elements[id];
				}
				else {
					this.elements[id] = document.getElementById(id);
					return this.elements[id];
				}
			}
			else {
				return id;
			}
		},
		clone: function(o) {
			var a = {};
			for (var i in o) {
				if (o.hasOwnProperty(i)) {
					a[i] = o[i];
				}
			}
			return a;
		},
		extend: function(o, o2) {
			if (!o) { o = {}; }
			for (var p in o2) {
				try {
					if (o2[p].constructor === Object) {
						o[p] = this.extend(o[p], o2[p]);
					} else {
						o[p] = o2[p];
					}
				}
				catch (e) {
					o[p] = o2[p];
				}
			}
			return o;
		},
		create: function(obj, module) {
			var me = this;
			if (arguments.length > 1) {
				module = this.extend(this.clone(obj), module);
				module.superclass = obj;
			}
			else {
				module = obj;
			}
			function Module(id, tmpl, options) {
				this.el = me.getEl(id);
				this.tmpl = tmpl ? tmpl : 'tmpl' + id.charAt(0).toUpperCase() + id.replace(/^([A-Za-z])([A-Za-z]+)\d$/, "$2");
				console.log(this.tmpl);
				this.options = me.extend(this.options, options);
				if (this.init) {
					this.init();
				}
			}
			Module.prototype = module;
			return Module;
		},
		render: function(id, data) {
			var tmpl = this.getEl(id).innerHTML;
			return twig({
				data: tmpl
			})
			.render({
				item: data,
				lang: {}
			});
		}
	};
});
