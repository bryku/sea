## Sprite Engine Animator

SEA is light weight canvas library for sprites and animations.

```
	<script src="./sea.js"></script>
	<canvas></canvas>
	<script>
	    let game = sea('canvas'); // querySelector
    	    game.render = (context)=>{
					
				context.fillStyle = '#81C9A2';
				context.fillRect(0,0,50,50);
						
    	    };
	</script>
```

## Draw

Draw has built in methods for rendering images.
Many of these methods support repeat and stretch, so you can easily fill the canvas.


```
    let game = sea('canvas');
        game.loadImage('./img/sky.png');
        game.render = (context, draw)=>{
        	
			draw.image({
				i: 'sky.png', 
				x: 0, y:   0, w: 112, h: 304, 
			});
			
        };
```


## Draw Image

**Stretch** will stretch the images width, height, or both.
If you use a negative number (-1) will stretch it to the edge (right / bottom) of the canvas.
This will automatically adjust if the user shinks to the window to save on memory or create a seemless experience if they enlarge the window.

```
    let game = sea('canvas');
        game.loadImage('./img/sky.png');
        game.render = (context, draw)=>{
        	
			draw.image({
				i: 'sky.png', 
				x: 0, y:   0, w: 112, h: 304, 
				stretch: {w: 224} // doubles image width
			});
			
        };
```

**Repeat** will repeat the image going right or down, allowing you to easily fill the background.
When using a negative number (-1) it will repeat to the edge (right / bottom) of the canvas.
This will automatically adjust if the user shinks to the window to save on memory or create a seemless experience if they enlarge the window.

```
    let game = sea('canvas');
        game.loadImage('./img/sky.png');
        game.render = (context, draw)=>{
        	
			draw.image({
				i: 'sky.png', 
				x: 0, y:   0, w: 112, h: 304, 
				repeat: {x: -1} // fill the canvas from left to right. 
			});
			
        };
```

## Draw Sprite

```
    draw.sprite({
		i: 'sprite-girl.png', // source image
		x: 32,	// x position on canvas
		y: 0,	// y position on canvas
		w: 32,	// width of sprite on sprite sheet
		h: 32,	// height of sprite on sprite sheet
		state: 'standing',	// defines which state or set of frames is being displayed
		states: {	// states
			standing: [	// frames
				{x: 0, y: 0},	// frame 1
				{x: 32, y: 0},	// frame 2
				{x: 64, y: 0},	// frame 3
				{x: 96, y: 0},	// frame 4
				{x: 128, y: 0},	// frame 5
				{x: 160, y: 0},	// frame 6
			],
		},
	});
```
draw.sprite() will automatically animate your frames if you update the sprite object.

```
    let character = {
		i: 'sprite-girl.png',	// source image
		x: 0,	// x position on canvas
		y: 0,	// y position on canvas
		w: 32, 	// width of sprite on sprite sheet
		h: 32,	// height of sprite on sprite sheet
		state: 'standing',	// defines which state or set of frames is being displayed
		stateSpeed: 20,
		states: {	// states
			standing: [	// frames
				{x: 0, y: 0},	// frame 1
				{x: 32, y: 0},	// frame 2
				{x: 64, y: 0},	// frame 3
				{x: 96, y: 0},	// frame 4
				{x: 128, y: 0},	// frame 5
				{x: 160, y: 0},	// frame 6
			],
		},
	};
	let game = sea('canvas');
		game.loadImages(
			'img/magic_cliffs/sprite-girl.png',
		);
		game.render = (context, draw, effect)=>{
			objects.character = draw.sprite(objects.character);
		};
```

## Effect

Effects are build in functions that modify the draw object.

```
	let objects = {
		clouds: {i: 'clouds.png', x: 0, y: 180, w: 544, h: 236, repeat: {x: -1}, paralax: 10},
	};	
		
	let game = sea('canvas');
		game.loadImages(
			'img/magic_cliffs/clouds.png',
		);
		game.render = (context, draw, effects)=>{
		
			draw.image(objects.sea);
			draw.image(objects.sky);
					
			// scrolling effect
			objects.clouds = effects.scrollLeft(object.clouds);
			draw.image(objects.clouds);
				
		};
```


