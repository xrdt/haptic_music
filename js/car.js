
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
        var angle = -30 * Math.PI/180;

        /*
        this.rotMatrix = [[Math.cos(angle), -Math.sin(angle)],
                         [Math.sin(angle), Math.cos(angle)]];
        */

        var p1 = position + new Point(-50, 0),
            p2 = position + new Point(150, 0),
            p3 = position + new Point(150, -20),
            p4 = position + new Point(100, -30),
            p5 = position + new Point(70, -45),
            p6 = position + new Point(30, -45),
            p7 = position + new Point(0, -30),
            p8 = position + new Point(-50, -20),
            centerOfMass = position + new Point(50, -15);

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
            new Path.Circle(position + new Point(100, 0), targetRadius)];
        var mod = new Point(100, -200);
        this.paths2 = [];
        /*
        this.paths2 = [new Path.Line(p1+mod, p2+mod),
            new Path.Line(p2+mod, p3+mod),
            new Path.Line(p3+mod, p4+mod),
            new Path.Line(p4+mod, p5+mod),
            new Path.Line(p5+mod, p6+mod),
            new Path.Line(p6+mod, p7+mod),
            new Path.Line(p7+mod, p8+mod),
            new Path.Line(p8+mod, p1+mod),
            new Path.Circle(position+mod, targetRadius),
            new Path.Circle(position +mod+ new Point(100, 0), targetRadius)];
        */
        //console.log(p1);

        for (var x = 0; x < this.paths.length; x++)
        {
            this.paths[x].strokeColor = color;

            this.paths[x].strokeWidth = 10;
            this.paths[x].shadowBlur = 64;
            this.paths[x].shadowColor = color;
        }

        for (var x = 0; x < this.paths.length; x++)
        {
            var path = this.paths[x];
            for (var y = 0; y < path.segments.length; y++)
            {
                //
                var coordCenter = path.segments[y].point-centerOfMass;
                var xCoord = coordCenter.x,
                    yCoord = coordCenter.y;

                xCoord = Math.cos(angle)*xCoord - Math.sin(angle)*yCoord;
                yCoord = Math.sin(angle)*xCoord + Math.cos(angle)*yCoord;
                path.segments[y].point = new Point(xCoord, yCoord) + centerOfMass;
            }
            this.paths2.push(path);
        }


        for (var x = 0; x < this.paths2.length; x++)
        {
            var path = this.paths2[x];
            for (var y = 0; y < path.segments.length; y++)
            {
                //
                var coordCenter = path.segments[y].point - centerOfMass;
                var xCoord = coordCenter.x,
                    yCoord = coordCenter.y;

                xCoord = Math.cos(angle)*xCoord - Math.sin(angle)*yCoord;
                yCoord = Math.sin(angle)*xCoord + Math.cos(angle)*yCoord;
                path.segments[y].point = new Point(xCoord, yCoord) + centerOfMass + mod;
            }
        }

        this.color = this.paths[subs - 1].strokeColor;

        this.speed = 62.5;
    }
Car.prototype = {
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

        for (var x = 0; x < this.paths.length; x++)
        {
            var from, to, final, from2;
            var h = this.paths[x];
            var l = this.paths2[x];

            for (var i = 0; i < h.segments.length; i++) {
                from = h.segments[i].point;
                to = h.segments[i].point -this.centerOfMass;
                from2 = l.segments[i].point;

                var xCoord = to.x,
                    yCoord = to.y,
                    angle = 30 * Math.PI/180;

                xCoord = Math.cos(angle)*xCoord - Math.sin(angle)*yCoord;
                yCoord = Math.sin(angle)*xCoord + Math.cos(angle)*yCoord;
                to = new Point(xCoord, yCoord) + new Point(100,-200) + this.centerOfMass;


                tl.to(from, duration*4, {x:to.x, y:to.y, ease:ease}, offset);
                var dur = duration*4;
                final = to-this.centerOfMass-new Point(100,-200);

                xCoord = final.x,
                    yCoord = final.y,
                    angle = 60 * Math.PI/180;

                xCoord = Math.cos(angle)*xCoord - Math.sin(angle)*yCoord;
                yCoord = Math.sin(angle)*xCoord + Math.cos(angle)*yCoord;
                final = new Point(xCoord, yCoord) + new Point(300, -500) + this.centerOfMass;
                tl.to(from2, duration*4, {x:final.x, y:to.y, ease:ease}, dur);
            }
        }

        /*
        this.paths.forEach(function(h) {
            var from, to, final;

            for (var i = 0; i < h.segments.length; i++) {
                from = h.segments[i].point;
                to = h.segments[i].point + new Point(100,-200)-this.centerOfMass;

                var xCoord = to.x,
                    yCoord = to.y,
                    angle = 30 * Math.PI/180;

                xCoord = Math.cos(angle)*xCoord - Math.sin(angle)*yCoord;
                yCoord = Math.sin(angle)*xCoord + Math.cos(angle)*yCoord;
                to = new Point(xCoord, yCoord) + this.centerOfMass;


                tl.to(from, duration*4, {x:to.x, y:to.y, ease:ease}, offset);
                var dur = tl.duration();
                final = to + new Point(100,-100)-this.centerOfMass;

                xCoord = final.x,
                    yCoord = final.y,
                    angle = 60 * Math.PI/180;

                xCoord = Math.cos(angle)*xCoord - Math.sin(angle)*yCoord;
                yCoord = Math.sin(angle)*xCoord + Math.cos(angle)*yCoord;
                final = new Point(xCoord, yCoord) + this.centerOfMass;





                //tl.to(from, duration*4, {x:to.x, y:to.y, ease:ease}, offset);

                //console.log(to1.x);
                //console.log(final.x);

                //tl.to(h, duration*8, {strokeWidth:0, ease:ease}, offset);
            }

            offset += 0;

        }, this);
        */




        //tl.to(points, 5, {bezier:{type:"cubic", values:[{x:100, y:250}, {x:150, y:100}, {x:300, y:500}, {x:500, y:400}], autoRotate:["x","y","rotation", 0, true]}, ease:Power1.easeInOut});


        return tl;
    }
};

function createFirework() {
    var tl = new TimelineMax();

    var startPoint = new Point(view.size.width /2, view.size.height/4*3),
        size = 15,
        color = getRandomColor();

    var hex = new Car(startPoint, size, color);

    //tl.add(trail.animate());
    //tl.add('trailDone');

    tl.add(hex.animate(), 'trailDone');

    /*
    for (var i = 0; i < hex.sides; i++) {

        var point = hex.targetHex.segments[i].point,
            localPoint = point - hex.targetHex.position;

        var spark = new Line(trail.end, localPoint.angle, size * 2, color);

        tl.add(spark.animate(), 'trailDone');
    }
    */

    return tl;
}

////////////
// UPDATE
////////////

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