<canvas resize="true" id="canvas"></canvas>

    <!-- I wrote the code in paperscript, but could not find a way to use in codepen, so the js code is up here. -->

    <script resize="true" type="text/paperscript" canvas="canvas">
    function Car(position, targetRadius, color) {
        var subs = 1;

        this.radius = targetRadius;
        this.sides = randomIndex([4, 6, 8, 10, 12]);
        this.wheelLeft = new Path.Circle({
            center:position,
            radius:targetRadius,
            closed:true
        });
        this.wheelRight = new Path.Circle({
            center:position + new Point(100, 0),
            radius:targetRadius,
            closed:true
        });
        this.body = [];
        var angle = 0 * Math.PI/180;

        var p1 = position + new Point(-50, 0),
            p2 = position + new Point(150, 0),
            p3 = position + new Point(150, -20),
            p4 = position + new Point(100, -30),
            p5 = position + new Point(70, -45),
            p6 = position + new Point(30, -45),
            p7 = position + new Point(0, -30),
            p8 = position + new Point(-50, -20),
            p9 = position + new Point(-15, 0),
            p10 = position + new Point(85, 0),
            centerOfMass = position + new Point(50, 0);

        this.centerOfMass = centerOfMass;

        this.paths = [new Path.Line(p1, p2),
            new Path.Line(p2, p3),
            new Path.Line(p3, p4),
            new Path.Line(p4, p5),
            new Path.Line(p5, p6),
            new Path.Line(p6, p7),
            new Path.Line(p7, p8),
            new Path.Line(p8, p1),
            new Path.Circle(position, targetRadius),
            new Path.Circle(position + new Point(100, 0), targetRadius)
            ];

        this.path = new CompoundPath({children: this.paths, strokeColor:color, strokeCap:'round', strokeWidth: 5, shadowBlur: 64, shadowColor: color});

        this.speed = 62.5;
    }

Car.prototype = {
    animate:function() {
        var tl = new TimelineMax({
            onComplete:function() {
                this.path.remove();
            },
            onCompleteScope:this
        });

        var duration = this.radius / this.speed,
            offset = 0,
            ease = Cubic.easeOut;

        tl.to(this.path, duration*4, {rotation:0, ease:ease}, offset);

        return tl;
    }
};

function createFirework() {
    var tl = new TimelineMax();

    var startPoint = new Point(view.size.width /2, view.size.height/4*3),
        size = 15,
        color = getRandomColor();

    var hex = new Car(startPoint, size, color);


    tl.add(hex.animate(), 'trailDone');

    return tl;
}


function onFrame(e) {
    if (e.count % 120 === 0) {
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
