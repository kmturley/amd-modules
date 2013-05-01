/*
    Child
    example module
*/

define('Child', function() {
    return {
        childfunc: function() {
            console.log('Child', this);
        },
        childfunc2: function() {
            console.log('Child2', this);
        }
    };
});