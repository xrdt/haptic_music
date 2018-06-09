<canvas resize="true" id="canvas"></canvas>

    <!-- I wrote the code in paperscript, but could not find a way to use in codepen, so the js code is up here. -->

    <script resize="true" type="text/paperscript" canvas="canvas">
    ////////////
    // CLASSES
    ////////////
    function Hex(start, end, targetRadius, color) {
        var subs = 1;
        this.end = end;

        this.radius = targetRadius;
        this.paths = [];

        for (var i = 0; i < subs; i++) {
            var h = new Path.Circle(start, targetRadius);

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

function createBomb(start) {
    var tl = new TimelineMax();

    var startPoint = start,
        angle = 270,
        length = view.size.height * 0.5,
        size = 8,
        color = getRandomColor();

    var end = new Point(0, view.size.height / 2);

    var hex = new Hex(startPoint, end, size, color);

    tl.add(hex.animate(), 'trailDone');

    return [tl, start+end];
}

////////////
// UPDATE
////////////

function Circle(start, radius, color) {
  var circle = new Path.Circle(start, radius);
  circle.fillColor = color;
  return circle;
}

function createRippleBomb(position) {
    var startPoint = position,
        color = getRandomColor();

    var ripple = new Shape.Circle(startPoint, 10);
    ripple.fillColor = color;

    var circumference = 100;
    var tl = new TimelineMax();
    tl.to(ripple, .5, {radius: '100'}, 0);
    return [tl, ripple];
}

function newRipple(a, b, c) {
  Circle(a, b, c);
}

function onFrame(e) {
    if (e.count % 120 === 0) {
      var start, possibleSides, sides;
          possibleSides = [0,3,4],
          sides = randomIndex(possibleSides);
      start = new Point(view.size.width / 2, 100);
      var timeline = createRippleBomb(start);
      setTimeout(function() {
        timeline[1].remove();
      }, timeline[0].duration()*1000 + 300);
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
