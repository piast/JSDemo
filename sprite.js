
(function(){
    function Sprite(url, spritepos, size, speed, frames, once) {
        this.position = spritepos;
        this.size = size;
        this.speed = typeof speed === 'number' ? speed : 0;
        this.frames = frames;
        this._index = 0;
        this.url = url;
        this.once = once;
    };

    Sprite.prototype = {
        update: function(dt) {
            this._index += this.speed*dt;
        },

        render: function(ctx, canvasX, canvasY) {
            var frame;
            if(this.speed > 0) {
                var max = this.frames.length;
                var idx = Math.floor(this._index);
                frame = this.frames[idx % max];

                if(this.once && idx >= max) {
                    this.done = true;
                    return;
                }
            }
            else {
                frame = 0;
            }

            var spiteX = this.position[0];
            var spiteY = this.position[1];
            spiteX += frame * this.size[0];    

            ctx.drawImage(resources.get(this.url), spiteX, spiteY, this.size[0], this.size[1], canvasX, canvasY, this.size[0], this.size[1]);  
        }
    };

    window.Sprite = Sprite;
})();