<canvas resize="true" id="canvas"></canvas>

    <!-- I wrote the code in paperscript, but could not find a way to use in codepen, so the js code is up here. -->

    <script resize="true" type="text/paperscript" canvas="canvas">
    ////////////
    // CLASSES
    ////////////


    function Plane(color, x, y) {
        var startPositionsB1 = new Path(),
            startPositionsB2 = new Path(),
            startPositionsW1 = new Path(),
            startPositionsW2 = new Path(),
            startPositionsE1 = new Path();

        var beginX = x,
            beginY = y;
        var p1 = new Point(beginX+10, beginY),
            p2 = new Point(beginX+115, beginY),
            p3, p4, p5, p6, p7, p8, p9,
            p10,
            p11,
            p12, p13, p14;
        startPositionsB1.add(p1);
        startPositionsB1.add(p2);
        
        p1 = new Point(beginX+140, beginY),
            p2 = new Point(beginX+190, beginY),
            p3 = new Point(beginX+220, beginY-10),
            p4 = new Point(beginX+195, beginY-25),
            p5 = new Point(beginX+30, beginY-25),
            p6 = new Point(beginX+10, beginY-50),
            p7 = new Point(beginX, beginY-50),
            p8 = new Point(beginX, beginY-10),
            p9 = new Point(beginX+10, beginY),
            p10,
            p11,
            p12, p13, p14;
        startPositionsB2.add(p1);
        startPositionsB2.add(p2);
        startPositionsB2.add(p3);
        startPositionsB2.add(p4);
        startPositionsB2.add(p5);
        startPositionsB2.add(p6);
        startPositionsB2.add(p7);
        startPositionsB2.add(p8);
        startPositionsB2.add(p9);
        
        beginX += 115;
        p1 = new Point(beginX+10, beginY-17),
            p2 = new Point(beginX-15, beginY+30),
            p3 = new Point(beginX-5, beginY+30),
            p4 = new Point(beginX+40, beginY-17);
        startPositionsW1.add(p1);
        startPositionsW1.add(p2);
        startPositionsW1.add(p3);
        startPositionsW1.add(p4);
        startPositionsW1.closed = 'true';
        
        p1 = new Point(beginX+10, beginY-25),
            p2 = new Point(beginX-25, beginY-40),
            p3 = new Point(beginX-15, beginY-40),
            p4 = new Point(beginX+40, beginY-25);
        startPositionsW2.add(p1);
        startPositionsW2.add(p2);
        startPositionsW2.add(p3);
        startPositionsW2.add(p4);
        startPositionsW2.closed = 'true';
        
        beginX -= 115;
        p1 = new Point(beginX+15, beginY-15),
            p2 = new Point(beginX+5, beginY-3),
            p3 = new Point(beginX+15, beginY-3),
            p4 = new Point(beginX+30, beginY-15);
        startPositionsE1.add(p1);
        startPositionsE1.add(p2);
        startPositionsE1.add(p3);
        startPositionsE1.add(p4);
        startPositionsE1.closed = 'true';

        this.path = new CompoundPath({
            children: [
                startPositionsB1,
                startPositionsB2,
                startPositionsW1,
                startPositionsW2,
                startPositionsE1
            ],
            strokeColor:color,
            strokeWidth:5,
            shadowBlur:32,
            shadowColor:color,
            strokeCap:'round'
        });

        this.speed = 100;
    }
Plane.prototype = {
    animate:function() {
        var tl = new TimelineMax({
            onComplete:function() {
                this.path.remove();
            },
            onCompleteScope:this
        });

        var duration = 0.05,
            offset = 0,
            ease = Cubic.easeOut;

        //this.path();
        tl.to(this.path, 10, {strokeWidth:5, ease:ease}, offset);


        return tl;
    }
};

function createPlane(tl1, x, y){
    var tl = tl1;

    var color = getRandomColor();

    var path = new Plane(color, x, y);
    tl.add(path.animate());
    tl.add('trailDone');
    return tl;
}

////////////
// UPDATE
////////////

function onFrame(e) {
    if (e.count % (2400) === 0) {


        var tl = new TimelineMax();
        tl = createPlane(tl, 300, 300);
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
