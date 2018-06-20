<canvas resize="true" id="canvas"></canvas>

    <!-- I wrote the code in paperscript, but could not find a way to use in codepen, so the js code is up here. -->

    <script resize="true" type="text/paperscript" canvas="canvas">
    ////////////
    // CLASSES
    ////////////


    function Pather(points, color, letter) {
        this.paths = [];
        for (var x = 0; x < points.length; x++)
        {
            if (x === 4 || x === 7 || x === 9 || x === 11 || x === 13)
            {
                // do nothing
            }
            else if (x === points.length - 1)
            {
              //console.log();
              var line = new Path.Line(points[x], points[x-7])
            }
            else
            {
                var line = new Path.Line(points[x], points[x+1]);
            }
            line.strokeColor = color;

            line.strokeWidth = 40;
            line.shadowBlur = 32;
            line.shadowColor = color;
            line.strokeCap = 'round';
            this.paths.push(line);
        }
        //this.color = this.path.strokeColor = color;

        this.speed = 100;
    }
Pather.prototype = {
    animate:function() {
        var tl = new TimelineMax({
            onComplete:function() {
                this.paths.forEach(function(p) {
                    p.remove();
                });
            },
            onCompleteScope:this
        });

        this.paths.forEach(function(l) {
            //var duration = this.path.length / this.speed,
            var duration = 0.05,
                offset = 0,
                ease = Cubic.easeOut;

            tl.to(l, duration, {strokeWidth:0, ease:ease}, offset);
            offset += duration;
            tl.to(l, 0.01, {strokeWidth:40, ease:ease}, offset);
            offset += 0.01;
            tl.to(l, 0.01, {strokeWidth:0, ease:ease}, offset);
            offset += 0.01;
            tl.to(l, 0.05, {strokeWidth:40, ease:ease}, offset);
            offset += 0.05;
            tl.to(l, 1, {strokeWidth:40, ease:ease}, offset);
            offset += 1;
            tl.to(l, 0.01, {strokeWidth:0, ease:ease}, offset);

        }, this);

        return tl;
    }
};

function createConstellation(startPositions) {
    for(var j = 0; j < startPositions.length; j++){
        var circle = new Path.Circle(startPositions[j], 5);
        circle.fillColor = getRandomColor();
    }
}
function createLineConstellation(tl1, startPositions, letter){
    var tl = tl1;
    var trails = [];

    var color = getRandomColor();
    var waitingTime = 0;


    var path = new Pather(startPositions, color, letter);
    tl.add(path.animate());
    tl.add('trailDone');
    return tl;
}

////////////
// UPDATE
////////////

function onFrame(e) {
    if (e.count % (240) === 0) {
        var startPositionsM = [], startPositionsA = [];
        var beginX = 300,
            beginY = beginX;
        var p1 = new Point(beginX, beginY),
            p2 = new Point(beginX+50, beginY-200),
            p3 = new Point(beginX+175, beginY-100),
            p4 = new Point(beginX+300, beginY-200),
            p5 = new Point(beginX+350, beginY),
            p6, p7, p8;
        startPositionsM.push(p1);
        startPositionsM.push(p2);
        startPositionsM.push(p3);
        startPositionsM.push(p4);
        startPositionsM.push(p5);

        //var begin = 300;
        var beginAX = beginX + 400;
        p1 = new Point(beginAX, beginY),
            p2 = new Point(beginAX+150, beginY-200),
            p3 = new Point(beginAX+300, beginY),
            p4 = new Point(beginAX+75, beginY-100),
            p5 = new Point(beginAX+225, beginY-100);
        startPositionsM.push(p1);
        startPositionsM.push(p2);
        startPositionsM.push(p3);
        startPositionsM.push(p4);
        startPositionsM.push(p5);

        var beginXX = beginAX + 350;
        p1 = new Point(beginXX, beginY),
            p2 = new Point(beginXX+250, beginY-200),
            p3 = new Point(beginXX, beginY-200),
            p4 = new Point(beginXX+250, beginY);
        startPositionsM.push(p1);
        startPositionsM.push(p2);
        startPositionsM.push(p3);
        startPositionsM.push(p4);
        
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
        
        startPositionsM.push(p1);
        startPositionsM.push(p2);
        startPositionsM.push(p3);
        startPositionsM.push(p4);
        startPositionsM.push(p5);
        startPositionsM.push(p6);
        startPositionsM.push(p7);
        startPositionsM.push(p8);

        var tl = new TimelineMax();
        //createConstellation(startPositionsM);
        tl = createLineConstellation(tl, startPositionsM, 'M');
        //createLineConstellation(tl, startPositionsA, 'A');
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
