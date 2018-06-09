<canvas resize="true" id="canvas"></canvas>

    <!-- I wrote the code in paperscript, but could not find a way to use in codepen, so the js code is up here. -->

    <script resize="true" type="text/paperscript" canvas="canvas">
    ////////////
    // CLASSES
    ////////////


    function Line(start, end, color, waitingTime) {
        this.start = start;
        this.end = end;

        this.path = new Path();
        this.path.add(this.start, this.end);
        this.color = this.path.strokeColor = color;
        this.path.visible = false;
        this.path.strokeWidth = 2;
        this.path.strokeCap = 'round';
        this.path.shadowBlur = 32;
        this.path.shadowColor = this.color;

        this.speed = 125;
    }

Line.prototype = {
    animate:function() {
        var tl = new TimelineMax({
            onStart:function() {
                this.path.visible = true;
            },
            onStartScope:this,
            onComplete:function() {
            },
            onCompleteScope:this
        });

        var start = this.path.segments[0].point,
            end = this.path.segments[1].point;

        var duration = this.path.length / this.speed,
            ease = Cubic;

        tl.from(end, duration * 0.125, {x:start.x, y:start.y, ease:ease.easeInOut});
        tl.to(start, duration * 0.125, {x:start.x, y:start.y, ease:ease.easeOut}, '-=0.125');

        return tl;
    }
};

function createTron(){
    var tl = new TimelineMax();

    var startPoint = new Point(view.size.width/2, view.size.height/2),
        angle = randomIndex([0, 90, 180, 270]),
        length = view.size.height * 0.125,
        color = getRandomColor(),
        waitingTime = 0;

    var path = [];
    var trails = [];
    path.push(startPoint);
    path = tronPath(startPoint, angle, path, 0);

    for (var x = path.length-1; x > 0; x--)
    {
        var trail = new Line(path[x], path[x-1], color, waitingTime);
        trails.push(trail);
        tl.add(trail.animate());
        tl.add('trailDone');
    }

    return [tl, trails];
}

function tronPath(start, angleOld, path, counter)
{
    var startPoint = start,
        angle = randomIndex([0, 90, 180, 270]),
        length = view.size.height * 0.125,
        color = getRandomColor(),
        end = new Point(),
        path = path,
        count = counter,
        waitingTime = 0;

    while (Math.abs(angle - angleOld) == 180)
    {
        angle = randomIndex([0, 90, 180, 270]);
    }

    end.setAngle(angle);
    end.setLength(length);
    end += startPoint;
    path.push(end);

    if (!(end.x > view.size.width - 1 || end.y > view.size.height - 1 || end.x < 1 || end.y < 1) && count < 100)
    {
        console.log(path);

        path.push.apply(tronPath(end, angle, path, count + 1));
    }

    return path;

}

////////////
// UPDATE
////////////

function onFrame(e) {
    if (e.count % 30 === 0) {
        var varias = createTron();
        var tll = varias[0];
        var trails = varias[1];
        setTimeout(function(){
            for(var i = 0; i < trails.length; i++){
                trails[i].path.remove();
            }}, 5000);
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