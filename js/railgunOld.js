<canvas resize="true" id="canvas"></canvas>

    <!-- I wrote the code in paperscript, but could not find a way to use in codepen, so the js code is up here. -->

    <script resize="true" type="text/paperscript" canvas="canvas">

    function gun() {
        var curve1 = new Path(new Point(view.size.width/2, view.size.height/2), new Point(view.size.width/2, view.size.height/2 + 50));
        var curve2 = new Path(new Point(view.size.width/2 - 20, view.size.height/2 + 10), new Point(view.size.width/2 - 20, view.size.height/2 + 40));
        var curve3 = new Path(new Point(view.size.width/2 - 40, view.size.height/2 + 20), new Point(view.size.width/2 - 40, view.size.height/2 + 30));
        var body = new Path.Ellipse(new Rectangle(new Point(view.size.width/2 + 20, view.size.height/2 - 10), new Size(100, 70)));
        var handle = new Path(new Point(body.bounds.bottomCenter) + new Point(20, 0), new Point(body.bounds.bottomRight) + new Point(-20, 40));
        var outline = new CompoundPath({children: [curve1, curve2, curve3, body, handle], strokeColor: 'red', strokeWidth: 10});
        var label = new PointText(new Point(body.bounds.center) - new Point(20, -10));
        label.fillColor = 'white';
        label.strokeColor = 'red';
        label.content = 'RG';
        label.fontSize = 25;
        return curve3.bounds.leftCenter;
    }

    function Laser(start, length) {
        this.path = new Path(start, start + new Point(-length, 0));
        // this.path = new Path();
        this.path.strokeColor = 'white';
        this.path.strokeWidth = 10;
    }

    Laser.prototype = {
       animate:function() {
         var tl = new TimelineMax({onComplete: function() {this.path.remove();},
                                   onCompleteScope: this});

         var start = this.path.segments[0].point;
         var end = this.path.segments[1].point;

         tl.to(end, 1.5, {x: -50, y: end.y});
         tl.to(start, 2, {x:-50, y: start.y}, '-=1.25');

         return tl;
       }
    }

function createlaser(start) {
  var tl = new TimelineMax();

  var laser = new Laser(start, 50);

  tl.add(laser.animate());
  tl.add('trailDone');

  return tl;
}

var start = gun();
function onFrame(e) {
  if (e.count % 20 == 0) {
    createlaser(start);
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
