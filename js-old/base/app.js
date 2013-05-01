app = {
	/**
	 * Object to contain all initialised items from the DOM
	 */
	o : {},
	/**
	 * @public
	 * @param {String} id 
	 * @param {String} type - the object type 
	 * @param {Object} options - overriding options object
	 */
	reg: function( id, type, params ){
		if (!this.o[ type ]) {
		    this.o[ type ] = [];
		}
		this.o[ type ].push({
		    id: id,
		    params: params
		});
	},
		/**
     * <p>This function also supports a 3-argument call in which the subclass's constructor is
     * passed as an argument. In this form, the parameters are as follows:</p>
     * <div class="mdetail-params"><ul>
     * <li><code>subclass</code> : Function <div class="sub-desc">The subclass constructor.</div></li>
     * <li><code>superclass</code> : Function <div class="sub-desc">The constructor of class being extended</div></li>
     * <li><code>overrides</code> : Object <div class="sub-desc">A literal with members which are copied into the subclass's
     * prototype, and are therefore shared among all instances of the new class.</div></li>
     * </ul></div>
     *
     * @param {Function} superclass The constructor of class being extended.
     * @param {Object} overrides <p>A literal with members which are copied into the subclass's
     * prototype, and are therefore shared between all instances of the new class.</p>
     * <p>This may contain a special member named <tt><b>constructor</b></tt>. This is used
     * to define the constructor of the new class, and is returned. If this property is
     * <i>not</i> specified, a constructor is generated and returned which just calls the
     * superclass's constructor passing on its parameters.</p>
     * <p><b>It is essential that you call the superclass constructor in any provided constructor. See example code.</b></p>
     * @return {Function} The subclass constructor from the <code>overrides</code> parameter, or a generated one if not provided.
     */
     extend : function(){
        // inline overrides
        var io = function(o){
            for(var m in o){
                this[m] = o[m];
            }
        };
        var oc = Object.prototype.constructor;

        return function(sb, sp, overrides){
            if( !!sp && Object.prototype.toString.call(sp) === '[object Object]' ){
                overrides = sp;
                sp = sb;
                sb = overrides.constructor != oc ? overrides.constructor : function(){
					app.apply(this, arguments);
				};
            }
            var F = function(){},
                sbp,
                spp = sp.prototype;

            F.prototype = spp;
            sbp = sb.prototype = new F();
            sbp.constructor=sb;
            sb.superclass=spp;
            if(spp.constructor == oc){
                spp.constructor = sp;
            }
            sb.override = function(o){
                app.override(sb, o);
            };
            sbp.superclass = (function(){
                return spp;
            });
            sbp.override = io;
            app.override(sb, overrides);
            sb.extend = function(o){
			return app.extend(sb, o);
		};
            return sb;
        };
    }(),
    /**
     * Adds a list of functions to the prototype of an existing class, overwriting any existing methods with the same name.
     * Usage:<pre><code>
	  Ext.override(MyClass, {
	    newMethod1: function(){
	         // etc.
	     },
	     newMethod2: function(foo){
	         // etc.
	     }
	 });
	</code></pre>
     * @param {Object} origclass The class to override
     * @param {Object} overrides The list of functions to add to origClass.  This should be specified as an object literal
     * containing one or more methods.
     * @method override
     */
    override : function(origclass, overrides){
        if(overrides){
            var p = origclass.prototype;
			app.apply(p, overrides);
            if($.browser.msie && overrides.hasOwnProperty('toString')){
                p.toString = overrides.toString;
            }
        }
    },
	/**
	 * Copies all the properties of config to obj.
	 * @param {Object} obj The receiver of the properties
	 * @param {Object} config The source of the properties
	 * @param {Object} defaults A different object that will also be applied for default values
	 * @return {Object} returns obj
	 * @member Ext apply
	 */
	apply: function(o, c, defaults){
	    // no "this" reference for friendly out of scope calls
	    if(defaults){
	        app.apply(o, defaults);
	    }
	    if(o && c && typeof c == 'object'){
	        for(var p in c){
	            o[p] = c[p];
	        }
	    }
	    return o;
	},
	elems: {}, 
	get: function( id ){
		if( !app.elems[id] ) app.elems[id] = document.getElementById( id );
		return app.elems[id];
	},
	hide: function( id ){
		if(document.getElementById(id)) {
			document.getElementById(id).style.visibility = 'hidden';
		}
	},
	removeClass: function(elem, name){
		var remClass = elem.className;
		var re = new RegExp('(^| )' + name + '( |$)');
		remClass = remClass.replace(re, '$1');
		remClass = remClass.replace(/ $/, '');
		elem.className = remClass;
	},
                init: function() {
		for (var x in app.o) {
			//pass arrays of items in to the correct handlers
			app.loadItems( x, app.o[x] );
		}
	},
	/**
	 * Method passes an array of methods in to it's manager class
	 * @public
	 * @param {String} type 
	 * @param {Array} arr - an array of init objects
	 */
	loadItems: function( type, arr ){

		var fn = app[ type ];
		
		if( !fn ) return;
		
		//standard init methods
		if( fn.init ){
                    for (var i=0; i<arr.length; ++i) {
                        fn.init( arr[i].id, arr[i].params );
                    }	
		} else {
                    //protyped methods
                    for (var i=0; i<arr.length; ++i) {
                        new fn( arr[i].id, arr[i].params  );
                    }
		}
	},
	getVars: function( el ){
		if( typeof el  == 'string') el = app.get( el );
		if ( !el ) return [];
		
		var arr = el.className.split( "|" ); 

		return arr.splice( 0, arr.length - 1 );
	},
	getVar: function( el ){
		return app.getVars( el )[0];
	}
}