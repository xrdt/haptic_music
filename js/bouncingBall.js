<canvas resize="true" id="canvas"></canvas>

<!-- I wrote the code in paperscript, but could not find a way to use in codepen, so the js code is up here. -->

<script resize="true" type="text/paperscript" canvas="canvas">
  ////////////
  // CLASSES
  ////////////
var Objects = [];
function bouncingBall() {
  this.group = new Group();
  this.key = 'l';
  this.initTime = null;
  this.updateTime = null;
  this.strokeWidth = 10;
  // The amount of points in the path:
  this.points = 12;
  // The distance between the points:
  this.length = 25;
  this.bounced = false;
  this.g = 0.5;
  this.mass = 1;
  this.speed = 0;
  this.force = this.g * this.mass * 3.5;
  this.backSpeed = this.force * this.speed;
}

function ballAnimation() {
    var bouncing = new bouncingBall();
  bouncing.group.addChild(new Path.Circle([0, 0], [10, 10]));
  var points = bouncing.points;
  var length = bouncing.length;
  var strokeWidth = bouncing.strokeWidth;
  var stringPath = new Path({
      strokeColor: '#E4141B',
      strokeWidth: strokeWidth,
      strokeCap: 'round'
  });
  var start = new Point(view.size.width/2, 0);
  stringPath.add(start);
  for (var i = 1; i < points - 1; i++)
  {
    if (randomIndex([0, 1]) == 0)
    {
      var position = start + new Point(i*length, 0);
      stringPath.add(position);
    }
    else
    {
      stringPath.add(start);
    }
  }
  stringPath.add(start);
  var floor = new Path({
    strokeColor: '#E4141B',
    strokeWidth: strokeWidth * 3,
    strokeCap: 'round'
  });
  var p1 = new Point(view.size.width/8*3, points*length + 20),
      p2 = new Point(view.size.width/8*5, points*length + 20);
  floor.add(p1);
  floor.add(p2);
  bouncing.group.addChild(stringPath);
  bouncing.group.addChild(floor);
  bouncing.group.firstChild.position = [view.size.width/2, 0];
  bouncing.group.firstChild.strokeColor = 'blue';
  bouncing.group.firstChild.fillColor = 'black';
  bouncing.initTime = performance.now();
  Objects.push(bouncing);
}


  ////////////
  // UPDATE
  ////////////

  function onFrame(e) {
    if (e.count % 350 === 0) {
      bouncingBall();
      ballAnimation();
    }

    for (var ix = 0; ix < Objects.length; ix++) {
        var child = Objects[ix];
        child.updateTime = performance.now();
        if (child.group.hasChildren()) {
          var ball = child.group.firstChild;
          var points = child.points;
          var length = child.length;
          var path = child.group.children[1];
          var fPoint = new Point(ball.position.x, ball.position.y);
          path.firstSegment.point = fPoint;
          for (var i = 0; i < points - 1; i++) {
            var segment = path.segments[i];
            var nextSegment = segment.next;
            if (nextSegment != path.lastSegment)
            {
              var vector = segment.point - nextSegment.point;
              vector.length = length;
              nextSegment.point = segment.point - vector;
            }
          }
          path.smooth({ type: 'continuous' });
          if (ball.position.y <= (points) * length)
          {
            child.speed += child.g;
            ball.position.y += child.speed;
          }
          else
          {
            child.backSpeed = child.force * child.speed;
            child.speed -= child.backSpeed;
            ball.position.y += child.speed * 1.75;
          }
          if (child.updateTime - child.initTime >= 9300) {
                child.group.removeChildren(0, 3);
                Objects.splice(ix, 1);
            }
        }
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
