<canvas resize="true" id="canvas"></canvas>

    <!-- I wrote the code in paperscript, but could not find a way to use in codepen, so the js code is up here. -->

    <script resize="true" type="text/paperscript" canvas="canvas">
    ////////////
    // CLASSES
    ////////////


    function Pather(color, x, y) {
        var startPositionsM = new Path(),
            startPositionsM2 = new Path(),
            startPositionsA = new Path(),
            startPositionsA2 = new Path(),
            startPositionsAS = new Path(),
            startPositionsAS2 = new Path(),
            startPositionsX = new Path(),
            startPositionsX2 = new Path(),
            startPositionsBoard = new Path(),
            startPositionsBoard2 = new Path;
        var beginX = x,
            beginY = y;
        var p1 = new Point(beginX, beginY+10),
            p2 = new Point(beginX+50, beginY-200),
            p3 = new Point(beginX+175, beginY-100),
            p4 = new Point(beginX+300, beginY-200),
            p5 = new Point(beginX+350, beginY+10),
            p6 = new Point(beginX+320, beginY+10),
            p7 = new Point(beginX+285, beginY-140),
            p8 = new Point(beginX+175, beginY-60),
            p9 = new Point(beginX+65, beginY-140),
            p10 = new Point(beginX+30, beginY+10),
            p11,
            p12, p13, p14;
        startPositionsM.add(p1);
        startPositionsM.add(p2);
        startPositionsM.add(p3);
        startPositionsM.add(p4);
        startPositionsM.add(p5);
        startPositionsM.add(p6);
        startPositionsM.add(p7);
        startPositionsM.add(p8);
        startPositionsM.add(p9);
        startPositionsM.add(p10);
        startPositionsM.closed = true;
        startPositionsM.smooth();

        p1 = new Point(beginX-20, beginY + 20),
            p2 = new Point(beginX+40, beginY-230),
            p3 = new Point(beginX+175, beginY-120),
            p4 = new Point(beginX+310, beginY-230),
            p5 = new Point(beginX+370, beginY+20),
            p6 = new Point(beginX+300, beginY+20),
            p7 = new Point(beginX+275, beginY-110),
            p8 = new Point(beginX+175, beginY-30),
            p9 = new Point(beginX+75, beginY-110),
            p10 = new Point(beginX+50, beginY+20);

        startPositionsM2.add(p1);
        startPositionsM2.add(p2);
        startPositionsM2.add(p3);
        startPositionsM2.add(p4);
        startPositionsM2.add(p5);
        startPositionsM2.add(p6);
        startPositionsM2.add(p7);
        startPositionsM2.add(p8);
        startPositionsM2.add(p9);
        startPositionsM2.add(p10);
        startPositionsM2.closed = true;
        startPositionsM2.smooth();

        //var begin = 300;
        var beginAX = beginX + 400;
        p1 = new Point(beginAX, beginY),
            p2 = new Point(beginAX+150, beginY-200),
            p3 = new Point(beginAX+300, beginY),
            p4 = new Point(beginAX+270, beginY),
            p5 = new Point(beginAX+200, beginY-75),
            p6 = new Point(beginAX+100, beginY-75),
            p7 = new Point(beginAX+30, beginY);
        startPositionsA.add(p1);
        startPositionsA.add(p2);
        startPositionsA.add(p3);
        startPositionsA.add(p4);
        startPositionsA.add(p5);
        startPositionsA.add(p6);
        startPositionsA.add(p7);
        startPositionsA.closed = true;
        startPositionsA.smooth();

        p1 = new Point(beginAX + 150, beginY-170),
            p2 = new Point(beginAX+120, beginY-120),
            p3 = new Point(beginAX+180, beginY-120);
        startPositionsAS.add(p1);
        startPositionsAS.add(p2);
        startPositionsAS.add(p3);
        startPositionsAS.closed = true;
        startPositionsAS.smooth();

        var beginXX = beginAX + 350;
        p1 = new Point(beginXX, beginY),
            p2 = new Point(beginXX+30, beginY),
            //p3 = new Point(beginXX+115, beginY-80),
            p4 = new Point(beginXX+125, beginY-80),
            p5 = new Point(beginXX+220, beginY),
            p6 = new Point(beginXX+250, beginY),
            p7 = new Point(beginXX+145, beginY-100),
            p8 = new Point(beginXX+250, beginY-200),
            p9 = new Point(beginXX+220, beginY-200),
            //p10 = new Point(beginXX+135, beginY-120),
            p11 = new Point(beginXX+125, beginY-120),
            p12 = new Point(beginXX+30, beginY-200),
            p13 = new Point(beginXX, beginY-200),
            p14 = new Point(beginXX+105, beginY-100);
        startPositionsX.add(p1);
        startPositionsX.add(p2);
        //startPositionsX.add(p3);
        startPositionsX.add(p4);
        startPositionsX.add(p5);
        startPositionsX.add(p6);
        startPositionsX.add(p7);
        startPositionsX.add(p8);
        startPositionsX.add(p9);
        //startPositionsX.add(p10);
        startPositionsX.add(p11);
        startPositionsX.add(p12);
        startPositionsX.add(p13);
        startPositionsX.add(p14);
        startPositionsX.closed = true;
        startPositionsX.smooth();

        var beginSX = beginX - 80,
            beginSY = beginY + 60;
        p1 = new Point(beginSX, beginSY),
            p2 = new Point(beginSX, beginSY-300),
            p3 = new Point(beginSX + 20, beginSY-320),
            p4 = new Point(beginSX + 1130, beginSY - 320),
            p5 = new Point(beginSX + 1150, beginSY - 300),
            p6 = new Point(beginSX + 1150, beginSY),
            p7 = new Point(beginSX + 1130, beginSY + 20),
            p8 = new Point(beginSX + 20, beginSY + 20);

        startPositionsBoard.add(p1);
        startPositionsBoard.add(p2);
        startPositionsBoard.add(p3);
        startPositionsBoard.add(p4);
        startPositionsBoard.add(p5);
        startPositionsBoard.add(p6);
        startPositionsBoard.add(p7);
        startPositionsBoard.add(p8);
        startPositionsBoard.closed = true;
        //startPositionsBoard.smooth();

        this.path = new CompoundPath({
            children: [
                startPositionsM,
                startPositionsM2,
                startPositionsA,
                startPositionsAS,
                startPositionsX,
                startPositionsBoard
            ],
            strokeColor:color,
            strokeWidth:5,
            shadowBlur:32,
            shadowColor:color,
            strokeCap:'round'
        });

        this.speed = 100;
    }
Pather.prototype = {
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

        tl.to(this.path, duration, {strokeWidth:0, ease:ease}, offset);
        offset += duration;
        tl.to(this.path, 0.01, {strokeWidth:5, ease:ease}, offset);
        offset += 0.01;
        tl.to(this.path, 0.01, {strokeWidth:0, ease:ease}, offset);
        offset += 0.01;
        tl.to(this.path, 0.05, {strokeWidth:5, ease:ease}, offset);
        offset += 0.05;
        tl.to(this.path, 10, {strokeWidth:5, ease:ease}, offset);
        offset += 1;
        //tl.to(this.path, 0.01, {strokeWidth:0, ease:ease}, offset);


        return tl;
    }
};

function createLineConstellation(tl1, x, y){
    var tl = tl1;

    var color = getRandomColor();

    var path = new Pather(color, x, y);
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
        tl = createLineConstellation(tl, 300, 300);
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