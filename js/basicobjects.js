/* global $ */
let basicObjects = (function(){
	let _b = {
		point: function(x, y, z){
			this.x = x;
			this.y = y;
			this.z = z;
		},
		vector: function(mx, my, mz){
			this.mx = mx;
			this.my = my;
			this.mz = mz;
		},
		lotation: function(lx, ly, lz){
			this.lx = lx;
			this.ly = ly;
			this.lz = lz;
			this.addLotation = function(lx, ly, lz){
				this.lx += lx;
				this.ly += ly;
				this.lz += lz;
			};
		},
		size: function(w, h, l){
			this.w = w;
			this.h = h;
			this.l = l;
		},
		movableObject: function(p, v, l, s){
			this.point = new _b.point();
			this.vector = new _b.vector();
			this.lotation = new _b.lotation();
			this.size = new _b.size();
			if(!p){
				if(p instanceof _b.point){
					this.point = $.extend({}, p);
				}
			}
			if(!v){
				if(v instanceof _b.vector){
					this.vector = $.extend({}, v);
				}
			}
			if(!l){
				if(l instanceof _b.lotation){
					this.lotation = $.extend({}, l);
				}
			}
			if(!s){
				if(s instanceof _b.size){
					this.size = $.extend({}, s);
				}
			}
		}
	};

	return _b;
})();