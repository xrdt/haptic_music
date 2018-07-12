<canvas resize="true" id="canvas"></canvas>

    <!-- I wrote the code in paperscript, but could not find a way to use in codepen, so the js code is up here. -->

    <script resize="true" type="text/paperscript" canvas="canvas">

    function Gun() {
        var xPos = view.size.width/2;
        var yPos = view.size.height/2;
      
        var curve1 = new Path(new Point(xPos, yPos), new Point(xPos, yPos + 50));
        var curve2 = new Path(new Point(xPos - 20, yPos + 10), new Point(xPos - 20, yPos + 40));
        var curve3 = new Path(new Point(xPos - 40, yPos + 20), new Point(xPos - 40, yPos + 30));
        var body = new Path.Ellipse(new Rectangle(new Point(xPos + 20, yPos - 10), new Size(100, 70)));
        var handle = new Path(new Point(body.bounds.bottomCenter) + new Point(20, 0), new Point(body.bounds.bottomRight) + new Point(-20, 40));
        
        this.path = new CompoundPath({
          children: [curve1, curve2, curve3, body, handle],
          strokeColor: 'red', shadowBlur: 64,
          shadowColor: 'red', strokeWidth: 5});
        this.start = curve3.bounds.leftCenter;
    }
      
    Gun.prototype = {
      animate:function() {
        var tl = new TimelineMax({
          onComplete: function() {
            this.path.remove();
          },
          onCompleteScope: this
        });
        
      var offset = 0;
         for (var x = 0; x < this.path.children.length; x++)
         {
           var pather = this.path.children[x];
           for (var y = 0; y < pather.segments.length; y++)
           {
             var from = pather.segments[y].point,
             to = pather.segments[y].point + new Point(0, -20);
             tl.to(from, 2, {x:to.x, y:to.y, ease:Cubic.easeOut}, offset);
           }
         }
         return tl;
      }
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

         ///*
         tl.to(end, 1.5, {x:-100, y: end.y});
         tl.to(start, 1.5, {x:-50, y: start.y}, '-=1.25');
         
         
         //*/
         /*
         tl.to(end, 1.5, {x:-100, y: end.y}, '+=1.25');
         tl.to(start, 1.5, {x:-50, y: start.y});
         //*/

         return tl;
       }
    }

function createGun(tl, gun){
  tl.add(gun.animate());
  tl.add('trailDone');
}
function createlaser(tl, start) {
  var tl = new TimelineMax();

  var laser = new Laser(start, 50);
  tl.add(laser.animate());
  tl.add('trailDone');
  

  return tl;
}

function onFrame(e) {
  if (e.count % 600 == 0) {
    var tl = new TimelineMax();
    var gun = new Gun();
    createGun(tl, gun);
    createlaser(tl, gun.start);
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
