/**
 * Singleton example
 */

define('Singleton', function() {
	return {
		init: function() {
			console.log('Singleton', this);
		}
	};
});
