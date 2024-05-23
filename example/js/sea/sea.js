let seaEffects = {
	scrollLeft: function(object, speed){
		object.x -= (speed || 1);
		let w = object.w;
		if(object.stretch && object.stretch.w){
			w = object.stretch.w
		}
		if(object.x < (0 - w)){
			object.x = 0
		}
		return object
	},
	animateSprite: function(object){
		if(!object.stateIndex){object.stateIndex = 0}
		if(!object.stateCounter){object.stateCounter = 0}
		if(!object.stateSpeed){object.stateSpeed = 100}
		object.stateCounter++;
		if(object.stateCounter >= object.stateSpeed){
			object.stateCounter = 0;
			object.stateIndex++;
			if(object.stateIndex > object.states[object.state].length){
				object.stateIndex = 0;
			}
		}
		return object
	},
};
let seaDraw = {
	sheet: function(object){
		let o = JSON.parse(JSON.stringify(object));
		object.sheet.forEach((layer, layerIndex)=>{
			layer.forEach((row, rowIndex)=>{
				row.forEach((col, colIndex)=>{
					if(col != 0){
						o.x = object.x + (colIndex * object.w);
						o.y = object.y + (rowIndex * object.h);
						o.sy = Math.floor(col / object.c) * object.h;
						o.sx = (Math.floor(col % object.c) - 1) * object.w;
						this.image(o);
					}
				})	
			})
		});
	},
	sprite: function(object){
		if(!object.stateIndex){object.stateIndex = 0}
		if(!object.stateCounter){object.stateCounter = 0}
		if(!object.stateSpeed){object.stateSpeed = 20}
		object.stateCounter++;
		if(object.stateCounter >= object.stateSpeed){
			object.stateCounter = 0;
			object.stateIndex++;
			if(object.stateIndex >= object.states[object.state].length){
				object.stateIndex = 0;
			}
		}
		
		object.sx = object.states[object.state][object.stateIndex].x || 0;
		object.sy = object.states[object.state][object.stateIndex].y || 0;

		this.image(object);
		return object
	},
	image: function(object){
		if(!object.stretch){object.stretch = {}}
		if(!object.stretch.w){object.stretch.w = 0}
		if(object.stretch.w < 0){
			object.stretch.w = Math.ceil(window.innerWidth / object.w) + 1;
		}
		if(!object.stretch.h){object.stretch.h = 0}
		if(object.stretch.h < 0){
			object.stretch.h = Math.ceil(window.innerHeight / object.h) + 1;
		}
		if(!object.repeat){object.repeat = {}}
		if(!object.repeat.x){object.repeat.x = 0}
		if(object.repeat.x < 0){
			object.repeat.x = Math.ceil(window.innerWidth / object.w) + 1;
		}
		if(!object.repeat.y){object.repeat.y = 0}
		if(object.repeat.y < 0){
			object.repeat.y = Math.ceil(window.innerHeight / object.h) + 1;
		}
		
		
		let image = this.assets[object.i || object.image];
		if(image.title == 'loaded'){

			for(let rx = 0; rx < object.repeat.x + 1; rx++){
				for(let ry = 0; ry < object.repeat.y + 1; ry++){
					this.context.drawImage(
						image, 
						Math.floor(object.sx || 0),
						Math.floor(object.sy || 0),
						Math.floor(object.sw || object.w),
						Math.floor(object.sh || object.h),
						Math.floor(object.x + (rx * (object.stretch.w || object.w))),
						Math.floor(object.y + (ry * (object.stretch.h || object.h))),
						Math.floor(object.stretch.w || object.w),
						Math.floor(object.stretch.h || object.h)
					)
				
				}
			}
		}
	}
};
let seaPlugins = {};
function sea(query){
	let _ = {
		settings: {
			pause: false,
			fps: 0,
			fpsCounter: 0,
			fpsSecond: 0,
			rendering: false
		}
	};
	// init canvas
	_.canvas = query.tagName == 'CANVAS'
		? query
		: document.querySelector(query);
		
	_.canvas.width = _.canvas.offsetWidth;
	_.canvas.style.width = _.canvas.offsetWidth + 'px';
	_.canvas.height = _.canvas.offsetHeight;
	_.canvas.style.height = _.canvas.offsetHeight + 'px';
	// init canvas
	_.context = _.canvas.getContext('2d', {alpha: true});
	_.context.webkitImageSmoothingEnable = false;
	_.context.mozImageSmoothingEnabled = false;
	_.context.imageSmoothingEnabled = false;

	_.assets = {};
	_.loadImages = function(...urls){
		urls.forEach((url)=>{
			let name = url.split('/').pop();
			_.assets[name] = new Image();
			_.assets[name].onload = function(){
				_.assets[name].title = 'loaded'
			}
			_.assets[name].src = url;	
		})
	}

	_.interval = setInterval(()=>{
		// Calculate FPS
		_.settings.fpsCounter += 1;
		let fpsSecond = new Date().getSeconds();
		if(fpsSecond != _.settings.fpsSecond){
			_.settings.fps = _.settings.fpsCounter;
			_.settings.fpsCounter = 0;
			_.settings.fpsSecond = fpsSecond;
		}
			
			// Check if Paused and Not Rendering
		if(!_.pause && !_.settings.render && _.render){
			_.settings.render = true;
			_.context.clearRect(0, 0, _.canvas.width, _.canvas.height);
			_.render(_.context, _.draw, _.effect)
			_.settings.render = false;
		}
	}, 1000 / 60);

	// set up variables for plugins
	_.draw = seaDraw;
	_.draw.context = _.context;
	_.draw.assets = _.assets;
	_.draw.settings = _.settings;

	_.effect = seaEffects;
	_.effect.context = _.context;
	_.effect.assets = _.assets;
	_.effect.settings = _.settings;
	
	// resize
	window.addEventListener('resize',()=>{
		_.canvas.width = _.canvas.offsetWidth;
		_.canvas.style.width = _.canvas.offsetWidth + 'px';
		_.canvas.height = _.canvas.offsetHeight;
		_.canvas.style.height = _.canvas.offsetHeight + 'px';
	})
	
	return _
}

