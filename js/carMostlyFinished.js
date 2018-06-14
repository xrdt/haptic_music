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

        this.path = new Path({closed:true});

        this.paths = [new Path.Line(p1, p2),
            new Path.Line(p2, p3),
            new Path.Line(p3, p4),
            new Path.Line(p4, p5),
            new Path.Line(p5, p6),
            new Path.Line(p6, p7),
            new Path.Line(p7, p8),
            new Path.Line(p8, p1),
            new Path.Circle(position, targetRadius),
            new Path.Line(p9, p10),
            new Path.Circle(position + new Point(100, 0), targetRadius),
            new Path.Line(p10, p1)];

        for (var x = 0; x < this.paths.length; x++)
        {
            this.path.addSegments(this.paths[x].segments);
        }
        /*
        this.all = [];
        this.all.push(this.path);
        this.all.push(this.wheelLeft);
        this.all.push(this.wheelRight);
        //var mod = new Point(100, -200);
        //this.paths2 = [];
        */
        this.path.strokeColor = color;

        this.path.strokeCap = 'round';
        this.path.strokeWidth = 10;
        this.path.shadowBlur = 64;
        this.path.shadowColor = color;

        /*
        for (var x = 0; x < this.paths.length; x++)
        {
            this.paths[x].strokeColor = color;

            this.paths[x].strokeCap = 'round';
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
        }
        */

        //this.color = this.paths[subs - 1].strokeColor;

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

        tl.from(this.path, duration*1, {rotation:-45, ease:ease}, offset);
        tl.to(this.path, duration*4, {rotation:0, ease:ease}, offset);

        for (var x = 0; x < this.path.segments.length; x++)
        {
            var from, to, to2;
            var h = this.path.segments[x];

            from = h.point;
            to = h.point + new Point(150, -50);
            to2 = h.point + new Point(300, 0);

            tl.to(from, duration*4, {x:to.x, y:to.y, ease:ease}, offset);
            //tl.to(to, duration*4, {x:to2.x, y:to2.y, ease:ease}, duration*4);
        }



        //tl.to(this, 5, {bezier:{type:"cubic", values:[{x:100, y:250}, {x:150, y:100}, {x:300, y:500}, {x:500, y:400}], autoRotate:["x","y","rotation", 0, true]}, ease:Power1.easeInOut});


        return tl;
    }
};
//function move()

function createFirework() {
    var tl = new TimelineMax();

    var startPoint = new Point(view.size.width /2, view.size.height/4*3),
        size = 15,
        color = getRandomColor();

    var hex = new Car(startPoint, size, color);


    tl.add(hex.animate(), 'trailDone');

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