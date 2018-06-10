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
          /*
          if (x < this.paths.length - 2)
          {
            var coordCenter1 = this.paths[x].segments[0].point-centerOfMass;
            var coordCenter2 = this.paths[x].segments[1].point-centerOfMass;
            var xCoord1 = coordCenter1.x,
                yCoord1 = coordCenter1.y,
                xCoord2 = coordCenter2.x,
                yCoord2 = coordCenter2.y;
            
            xCoord1 = Math.cos(angle)*xCoord1 - Math.sin(angle)*yCoord1;
            yCoord1 = Math.sin(angle)*xCoord1 + Math.cos(angle)*yCoord1;
            xCoord2 = Math.cos(angle)*xCoord2 - Math.sin(angle)*yCoord2;
            yCoord2 = Math.sin(angle)*xCoord2 + Math.cos(angle)*yCoord2;
            this.paths[x].segments[0].point = new Point(xCoord1, yCoord1) + centerOfMass;
            this.paths[x].segments[1].point = new Point(xCoord2, yCoord2) + centerOfMass;
          }
          else
          {
            //
            console.log(this.paths[x].segments);
          }
          */
        }
        
        //console.log(this.paths[0].segments[0].point);
        
        //this.paths[this.paths.length-1].fillColor = color;
        //this.paths[this.paths.length-2].fillColor = color;

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

        this.paths.forEach(function(h) {
            var from, to, final;

            for (var i = 0; i < h.segments.length; i++) {
                //from = h.segments[i].point;
                from = h.segments[i].point;
                to = from + new Point(100,-100)-this.centerOfMass;
                final = from + new Point(200,0)-this.centerOfMass;
                var xCoord = to.x,
                    yCoord = to.y,
                    angle = 30 * Math.PI/180;
                
                xCoord = Math.cos(angle)*xCoord - Math.sin(angle)*yCoord;
                yCoord = Math.sin(angle)*xCoord + Math.cos(angle)*yCoord;
                to = new Point(xCoord, yCoord) + this.centerOfMass;

                
                tl.to(from, duration*4, {x:to.x, y:to.y, ease:ease}, offset);
                var dur = tl.duration();
                
                var xCoord1 = final.x,
                    yCoord1 = final.y,
                    angle1 = 60 * Math.PI/180;
                
                xCoord1 = Math.cos(angle1)*xCoord1 - Math.sin(angle1)*yCoord1;
                yCoord1 = Math.sin(angle1)*xCoord1 + Math.cos(angle1)*yCoord1;
                //console.log("********");
                //console.log(to);
                final = new Point(xCoord1, yCoord1) + this.centerOfMass;
                //console.log(final);
                //console.log("########");
                tl.to(to, duration*4, {x:final.x*2, y:final.y, ease:ease}, dur);
                
                tl.to(h, duration*8, {strokeWidth:0, ease:ease}, offset);
            }

            offset += 0;

        }, this);

        return tl;
    }
};

function createFirework() {
    var tl = new TimelineMax();

    var startPoint = new Point(view.size.width /2, view.size.height/2),
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
