<canvas resize="true" id="canvas"></canvas>

    <!-- I wrote the code in paperscript, but could not find a way to use in codepen, so the js code is up here. -->

    <script resize="true" type="text/paperscript" canvas="canvas">
    ////////////
    // CLASSES
    ////////////
    function Hex(start, end, angle, targetRadius, sides, color) {
        var subs = 1;
        this.end = end;
        this.start = start;
        //this.angle = angle;

        this.radius = targetRadius;
        this.sides = sides;
        this.paths = [];

        for (var i = 0; i < subs; i++) {
            if (this.sides > 0)
            {
                var h = new Path.RegularPolygon(start, this.sides, targetRadius);
            }
            else
            {
                var h = new Path.Circle(start, targetRadius);
            }

            if (i === 0) {
                h.strokeColor = color;
            }
            else {
                h.strokeColor = new Color({
                    hue:color.hue,
                    saturation:color.saturation,
                    lightness:randomRange(0.4, 0.6),
                    alpha:1
                });
            }

            h.strokeWidth = 16;
            h.shadowBlur = 64;
            h.shadowColor = h.strokeColor;

            this.paths.push(h);
        }

        this.color = this.paths[subs - 1].strokeColor;

        this.speed = 62.5;
    }
Hex.prototype = {
    animate:function() {
        var tl = new TimelineMax({
            onComplete:function() {
                this.paths.forEach(function(p) {
                    p.remove();
                });
            },
            onCompleteScope:this
        });

        var duration = this.radius / this.speed,
            offset = 0,
            ease = Power4.easeOut;

        this.paths.forEach(function(h) {
            var from, to;

            //if (this.sides > 0)
            //{
            for (var i = 0; i < h.segments.length; i++) {
                from = h.segments[i].point;
                to = h.segments[i].point+this.end;

                tl.to(from, duration*16, {x:to.x, y:to.y, ease:null}, offset);
                tl.to(h, duration*16, {strokeWidth:16, ease:null}, offset);
            }
            /*
            }
            else
            {
              from = this.start;
              to = this.start+this.end;
              //console.log(from);
              //console.log(to);
              console.log(h.position);
              tl.to(h.position, duration*16, {x:to.x, y:to.y, ease:null}, offset);
              tl.to(h, duration*16, {strokeWidth:16, ease:null}, offset);
            }
            */

            offset += 0.2;

        }, this);

        return tl;
    }
};

function createWarringShapes(start, angle, sides, up) {
    var tl = new TimelineMax();

    var startPoint = start,
        angle = angle,
        length = view.size.height * 0.5,
        size = randomRange(8, 8),
        color = getRandomColor();
    if (up)
    {
        var end = new Point(-view.size.width/4*3,-view.size.height);
    }
    else
    {
        var end = new Point(view.size.width/4*3,view.size.height);
    }

    var hex = new Hex(startPoint, end, angle, size, sides, color);

    tl.add(hex.animate(), 'trailDone');

    return tl;
}

////////////
// UPDATE
////////////

function onFrame(e) {
    if (e.count % 200 === 0) {
        //console.log(view.size.width,view.size.height);
        var start,
            possibleSides = [0,3,4],
            sides = randomIndex(possibleSides),
            angle = Math.atan2(view.size.height, view.size.width),
            indexer = 5,
            modifier = 75,
            begin = new Point(0, -modifier*5);
        //console.log(angle);
        //console.log(Math.sin(angle));
        for (var x = 0; x < indexer; x++)
        {
            for (var y = 0; y < indexer-x; y++)
            {
                // start = new Point(view.size.width/2 * Math.random()+view.size.width/4, -y*50);
                start = new Point(-x*modifier - modifier*y*Math.sin(Math.PI/2+angle), -y * modifier - modifier * Math.sin(-Math.PI/4+angle) * x);
                //start = new Point(-x*modifier, -y * modifier);
                //console.log(modifier*Math.sin(angle));
                createWarringShapes(start, angle, sides, false);
            }
        }

        var index = possibleSides.indexOf(sides);
        possibleSides.splice(index,1);
        sides = randomIndex(possibleSides);
        for (var x = 0; x < indexer; x++)
        {
            for (var y = 0; y < indexer-x; y++)
            {
                //start = new Point(view.size.width/2 * Math.random()+view.size.width/4, view.size.height + y*50);
                start = new Point(view.size.width + x*modifier+modifier*y*Math.sin(angle), view.size.height + y*modifier-modifier * Math.sin(angle) * x);
                createWarringShapes(start, angle, sides, true);
            }
        }
    }
}

////////////
// utils
////////////

function getRandomColor() {
    return new Color({
        hue:randomRange(0, 100),
        saturation:0.75,
        lightness:0.5
    })
}

function randomIndex(arr) {
    return arr[randomRange(0, arr.length, true)];
}

function randomRange(min, max, floor) {
    var v = min + Math.random() * (max - min);
    floor = floor || false;
    return floor ? (v | 0) : v;
}
</script>