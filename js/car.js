<canvas resize="true" id="canvas"></canvas>

    <!-- I wrote the code in paperscript, but could not find a way to use in codepen, so the js code is up here. -->

    <script resize="true" type="text/paperscript" canvas="canvas">
    ////////////
    // CLASSES
    ////////////
    function Car(position, targetRadius, color) {
        var subs = 1;

        this.radius = targetRadius;
        this.sides = randomIndex([4, 6, 8, 10, 12]);
        this.wheelLeft = new Path.Circle(position, targetRadius);
        this.wheelRight = new Path.Circle(position + new Point(100, 0), targetRadius);
        this.body = [];

        var p1 = position + new Point(-50, 0),
            p2 = position + new Point(150, 0),
            p3 = position + new Point(150, 20),
            p4 = position + new Point(100, 20),
            p5 = position + new Point(70, 30),
            p6 = position + new Point(30, 30),
            p7 = position + new Point(0, 20),
            p8 = position + new Point(-50, 20),
            this.paths = [new Path(p1, p2),
            new Path.Line(p2, p3),
            new Path.Line(p3, p4),
            new Path.Line(p4, p5),
            new Path.Line(p6, p6),
            new Path.Line(p7, p7),
            new Path.Line(p7, p8),
            new Path.Line(p8, p1)];

        for (var x = 0; x < this.paths.length; x++)
        {
            this.paths[x].strokeColor = color;

            this.paths[x].strokeWidth = 24;
            this.paths[x].shadowBlur = 64;
            this.paths[x].shadowColor = h.strokeColor;
        }

        this.color = this.paths[subs - 1].strokeColor;

        this.speed = 125;
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
            ease = Cubic.easeOut;

        this.paths.forEach(function(h) {
            var from, to;

            for (var i = 0; i < h.segments.length; i++) {
                from = h.segments[i].point;
                to = h.segments[i].point + new Point(50,0);

                tl.to(from, duration, {x:to.x, y:to.y, ease:ease}, offset);
                tl.to(h, duration, {strokeWidth:0, ease:ease}, offset);
            }

            offset += 0.2;

        }, this);

        return tl;
    }
};

function Line(start, angle, length, color) {
    this.start = start;
    this.end = new Point();

    this.end.setAngle(angle);
    this.end.setLength(length);
    this.end += this.start;

    this.path = new Path();
    this.path.add(this.start, this.end);
    this.color = this.path.strokeColor = color;
    this.path.visible = false;
    this.path.strokeWidth = 2;
    this.path.strokeCap = 'round';
    this.path.shadowBlur = 32;
    this.path.shadowColor = this.color;

    this.speed = 250;
}
Line.prototype = {
    animate:function() {
        var tl = new TimelineMax({
            onStart:function() {
                this.path.visible = true;
            },
            onStartScope:this,
            onComplete:function() {
                this.path.remove();
            },
            onCompleteScope:this
        });

        var start = this.path.segments[0].point,
            end = this.path.segments[1].point;

        var duration = this.path.length / this.speed,
            ease = Cubic;

        tl.from(end, duration, {x:start.x, y:start.y, ease:ease.easeInOut});
        tl.to(start, duration * 0.75, {x:end.x, y:end.y, ease:ease.easeOut}, '-=0.5');

        return tl;
    }
};

function createFirework() {
    var tl = new TimelineMax();

    var startPoint = new Point(view.size.width * Math.random(), view.size.height),
        angle = 270,
        length = view.size.height * 0.5,
        size = randomRange(64, 396),
        color = getRandomColor();

    var trail = new Line(startPoint, angle, length, color),
        hex = new Hex(trail.end, size, color);

    tl.add(trail.animate());
    tl.add('trailDone');

    tl.add(hex.animate(), 'trailDone');

    for (var i = 0; i < hex.sides; i++) {

        var point = hex.targetHex.segments[i].point,
            localPoint = point - hex.targetHex.position;

        var spark = new Line(trail.end, localPoint.angle, size * 2, color);

        tl.add(spark.animate(), 'trailDone');
    }

    return tl;
}

////////////
// UPDATE
////////////

function onFrame(e) {
    if (e.count % 60 === 0) {
        createFirework();
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