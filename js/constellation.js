<canvas resize="true" id="canvas"></canvas>

    <!-- I wrote the code in paperscript, but could not find a way to use in codepen, so the js code is up here. -->

    <script resize="true" type="text/paperscript" canvas="canvas">
    ////////////
    // CLASSES
    ////////////


function Line(start, end, color, waitingTime) {
    this.start = start;
    this.end = end;
    this.waitingTime = waitingTime;

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
            },
            onCompleteScope:this
        });

        var start = this.path.segments[0].point,
            end = this.path.segments[1].point;

        var duration = this.path.length / this.speed,
            ease = Cubic;

        tl.from(end, duration * 0.5, {x:start.x, y:start.y, ease:ease.easeInOut});
        tl.to(start, duration * 0.5, {x:start.x, y:start.y, ease:ease.easeOut}, '-=0.5');

        return tl;
    }
};

function createConstellation(startPositions) {
    for(var j = 0; j < 7; j++){
      var circle = new Path.Circle(startPositions[j], 5);
      circle.fillColor = getRandomColor();
    }
}
function createLineConstellation(tl1, startPositions){
  var tl = tl1;
  var trails = [];

  var color = getRandomColor();
  var waitingTime = 0;
  for(var i = 0; i < 7; i++)
  {
    var startPoint = startPositions[i];
    if (i<6)
    {
      var endPoint = startPositions[i+1];
    }
    else
    {
      var endPoint = startPositions[3];
    }

    var path = new Path();
    path.add(startPoint, endPoint);

    var duration = path.length / 250;
    waitingTime += duration;
  }

  for(var i = 0; i< 7;i++){
    var startPoint = startPositions[i];
    if (i<6)
    {
      var endPoint = startPositions[i+1];
    }
    else
    {
      var endPoint = startPositions[3];
    }

    var path = new Path();
    path.add(startPoint, endPoint);
    if (i != 0)
    {
      var duration = path.length / 250;
      waitingTime -= duration;
    }

    var trail = new Line(startPoint, endPoint, color, waitingTime);
    trails.push(trail);
  }

  for(var j = 0; j < 7; j++){
      tl.add(trails[j].animate());
      tl.add('trailDone');
  }
  return [tl, trails];
}

////////////
// UPDATE
////////////

function onFrame(e) {
    if (e.count % (240) === 0) {
        var startPositions = [];



    var p1 = new Point(5, view.size.height/4 + view.size.height/6);
    var p2 = new Point(view.size.width/6, view.size.height/4);
    var p3 = new Point(view.size.width/3, view.size.height/4 + view.size.height/6);
    var p4 = new Point(view.size.width/2, view.size.height/4 + view.size.height/6);
    var p5 = new Point(view.size.width*35/60, view.size.height * 3/4);
    var p6 = new Point(view.size.width*55/60 - 5, view.size.height * 3/4);
    var p7 = new Point(view.size.width-5, view.size.height/4 + view.size.height/6);
    startPositions.push(p1);
    startPositions.push(p2);
    startPositions.push(p3);
    startPositions.push(p4);
    startPositions.push(p5);
    startPositions.push(p6);
    startPositions.push(p7);

        var tl = new TimelineMax();
        createConstellation(startPositions);
        var varias = createLineConstellation(tl, startPositions);
        var tll = varias[0];
        var trails = varias[1];
        setTimeout(function(){
          for(var i = 0; i < 7; i++){
            trails[i].path.remove();
          }}, tll.duration()*1000);
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
