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
            new Path.Line(p9, p10),
            new Path.Circle(position + new Point(100, 0), targetRadius),
            new Path.Line(p10, p1)];
        
        this.paths2 = [new Path.Line(p1, p2),
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
        
        var p1 = position + new Point(150, -25),
            p2 = position + new Point(10, 50),
            p3 = position + new Point(-30, 50),
            p4 = position + new Point(-50, 15),
            p5 = position + new Point(-30, -20),
            p6 = position + new Point(110, -100);
        
        this.paths3 = new Path();
        this.paths3.add(p1);
        this.paths3.add(p2);
        this.paths3.add(p3);
        this.paths3.add(p4);
        this.paths3.add(p5);
        this.paths3.add(p6);
        this.paths3.closed = true;
        this.paths3.fillColor = color;

        this.path = new CompoundPath({children: this.paths, strokeColor:color, strokeCap:'round', strokeWidth: 5, shadowBlur: 64, shadowColor: color});
        this.path2 = new CompoundPath({children: this.paths2, strokeColor:color, strokeCap:'round', strokeWidth: 0, shadowBlur: 64, shadowColor: color});
        this.path3 = new CompoundPath({children: this.paths3, strokeColor:color, strokeCap:'round', strokeWidth: 5, shadowBlur: 64, shadowColor: color});
        this.path4 = new Path({
          segments:[[position.x + 200, position.y - 195],
                   [position.x + 600, position.y - 195]],
                   strokeColor:color, strokeCap:'round', strokeWidth: 5, shadowBlur: 64, shadowColor: color
        });
        this.path5 = new Path({
          segments:[[position.x - 100, position.y + 50],
                   [position.x + 900, position.y + 50]],
                   strokeColor:color, strokeCap:'round', strokeWidth: 5, shadowBlur: 64, shadowColor: color
        });
        p1 = new Point(position.x - 30, position.y + 30),
          p2 = new Point(position.x - 50, position.y + 30),
          p3 = new Point(position.x - 70, position.y + 20),
          p4 = new Point(position.x - 70, position.y + 10);
        this.paths6 = [new Path.Line(p4, p3),
          new Path.Line(p3, p2),
          new Path.Line(p2, p1)];
        for (var x = 0; x < this.paths6.length; x++)
        {
          this.paths6[x].strokeColor = color;
          this.paths6[x].strokeCap = 'round';
          this.paths6[x].strokeWidth = 5;
          this.paths6[x].shadowBlur = 64;
          this.paths6[x].shadowColor = color;
          //this.paths6.visible = true;
        }

        this.speed = 62.5;
    }

Car.prototype = {
    animate:function() {
        var tl = new TimelineMax({
            onComplete:function() {
                this.path.remove();
                this.path2.remove();
                this.paths3.remove();
                this.path4.remove();
                this.path5.remove();
                this.paths6.forEach(function(p){
                  p.remove();
                });
            },
            onCompleteScope:this
        });

        var duration = this.radius / this.speed,
            offset = 0,
            ease = Power0,
            sparkOffset = 0.5;
        
        for (var x = 0; x < this.paths6.length; x++)
        {
          var path = this.paths6[x];
          tl.to(path, 0, {strokeWidth:0, ease:null}, sparkOffset);
          //console.log(path.segments);
          sparkOffset+=0.5;
        }
        offset += sparkOffset-0.5;
        tl.from(this.path, duration*4, {rotation:-30, ease:ease.easeOut}, offset);
        tl.to(this.path, duration*4, {rotation:0, ease:ease.easeOut}, offset);
        tl.to(this.path, duration*4, {visible:false, ease:ease.easeOut}, duration*4 + offset);
        
        
        for (var x = 0; x < this.path.children.length; x++)
        {
          var path = this.path.children[x];
          for (var y = 0; y < path.segments.length; y++)
          {
            var from = path.segments[y].point,
              to = path.segments[y].point + new Point(350, -150);
            tl.to(from, duration*4, {x:to.x, y:to.y, ease:ease.easeOut}, offset);
            
          }
        }
        
        this.path2.translate(new Point(350, -150));
        this.path2.rotate(30);
        tl.to(this.path2, 0, {strokeWidth:5, ease:null}, duration*4 + offset);
        tl.from(this.path2, duration*4, {rotation:-30, ease:ease.easeOut}, duration*4 + offset);
        
        for (var x = 0; x < this.path2.children.length; x++)
        {
          var path = this.path2.children[x];
          for (var y = 0; y < path.segments.length; y++)
          {
            var from = path.segments[y].point,
              to1 = path.segments[y].point + new Point(350, 150);
            tl.to(from, duration*4, {x:to1.x, y:to1.y, ease:ease.easeOut}, duration*4 + offset);
          }
        }

        return tl;
    }
};

function createCar() {
    var tl = new TimelineMax();

    var startPoint = new Point(view.size.width /4, view.size.height/4*3),
        size = 15,
        color = getRandomColor();

    var car = new Car(startPoint, size, color);


    tl.add(car.animate(), 'trailDone');

    return tl;
}


function onFrame(e) {
    if (e.count % 240 === 0) {
        createCar();
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
