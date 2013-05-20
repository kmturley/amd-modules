/**
 * Carousel
 * example module
 */

define('Carousel', ['Utils', 'Child'], function(Utils, Child) {
	return Utils.create(Child, {
		init: function() {
			console.log('Carousel', this);
		},
		render: function(params) {
			this.el.innerHTML = Utils.render(this.tmpl, params);
		}
	});
});
