<canvas resize="true" id="canvas"></canvas>

    <!-- I wrote the code in paperscript, but could not find a way to use in codepen, so the js code is up here. -->

    <script resize="true" type="text/paperscript" canvas="canvas">
    ////////////
    // CLASSES
    ////////////
    function Hex(start, end, targetRadius, sides, color) {
        var subs = 1;
        this.end = end;

        this.radius = targetRadius;
        this.sides = sides;
        //this.targetHex = new Path.RegularPolygon(start, this.sides, targetRadius);
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

            for (var i = 0; i < h.segments.length; i++) {
                from = h.segments[i].point;
                to = h.segments[i].point+this.end;

                tl.to(from, duration*8, {x:to.x, y:to.y, ease:null}, offset);
                tl.to(h, duration*8, {strokeWidth:16, ease:null}, offset);
            }

            offset += 0.2;

        }, this);

        return tl;
    }
};

function createFirework(start, sides, up) {
    var tl = new TimelineMax();

    var startPoint = start,
        angle = 270,
        length = view.size.height * 0.5,
        size = randomRange(8, 8),
        color = getRandomColor();
    if (up)
    {
        var end = new Point(-200,-view.size.height);
    }
    else
    {
        var end = new Point(200,view.size.height);
    }

    var hex = new Hex(startPoint, end, size, sides, color);

    //tl.add(trail.animate());
    //tl.add('trailDone');

    tl.add(hex.animate(), 'trailDone');



    return tl;
}

////////////
// UPDATE
////////////

function onFrame(e) {
    if (e.count % 60 === 0) {
        var start, possibleSides, sides;
        possibleSides = [0,3,4],
            sides = randomIndex(possibleSides);
        for (var x = 0; x < 10; x++)
        {
            for (var y = 0; y < 3; y++)
            {
                start = new Point(view.size.width/2 * Math.random()+view.size.width/4, -y*50);
                createFirework(start, sides, false);
            }
        }

        var index = possibleSides.indexOf(sides);
        possibleSides.splice(index,1);
        sides = randomIndex(possibleSides);
        for (var x = 0; x < 10; x++)
        {
            for (var y = 0; y < 3; y++)
            {
                start = new Point(view.size.width/2 * Math.random()+view.size.width/4, view.size.height + y*50);
                createFirework(start, sides, true);
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