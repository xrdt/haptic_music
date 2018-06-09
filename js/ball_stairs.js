<canvas resize="true" id="canvas"></canvas>

<!-- I wrote the code in paperscript, but could not find a way to use in codepen, so the js code is up here. -->

<script resize="true" type="text/paperscript" canvas="canvas">
  function Line(start, angle, length, color) {
      this.start = start;
      this.end = new Point();

      this.end.setAngle(angle);
      this.end.setLength(length);
      this.end += this.start;

      this.path = new Path();
      this.path.add(this.start, this.end);
      this.color = this.path.strokeColor = color;
      this.path.visible = true;
      this.path.strokeWidth = 2;
      this.path.strokeCap = 'round';
      this.path.shadowBlur = 32;
      this.path.shadowColor = this.color;

      this.speed = 250;
  }

  Line.prototype = {
      animate:function() {
          var tl = new TimelineMax();

          var start = this.path.segments[0].point,
              end = this.path.segments[1].point;

          var duration = this.path.length / this.speed,
              ease = Cubic;

          tl.from(end, duration, {x:start.x, y:start.y, ease:ease.easeInOut});
          tl.to(start, duration * 0.75, {x:start.x, y:start.y, ease:ease.easeOut}, '-=0.5');

          return tl;
      }
  };

  function createStairs(color) {
      var numStairs = 10;

      var tl = new TimelineMax();

      var length = view.size.height / numStairs;
      var angle = [0, 90];
      var start = new Point(0, length);
      var paths = [];
      for (var i=0; i < numStairs; i++) {
          var line = new Line(start, angle[i%2], length, color);
          if (i%2 === 0) {
            start += new Point(length, 0);
          } else {
            start += new Point(0, length);
          }
          paths.push(line);
          tl.add(line.animate(), 'trailDone');
      }
      return [tl, paths];
  };

  function ballAnimation(color) {
    var tl = new TimelineMax();

    var radius = view.size.height / 20;

    var ball = new Shape.Circle(new Point(radius, -radius), radius);
    ball.fillColor = color;

    var prevx = ball.position.x;
    var prevy = ball.position.y;
    for (var i=0; i<11; i++) {
      if (i%2 == 0) {
        tl.to(ball.position, 1, {x: prevx, y: (i+1)*radius, ease:Cubic.easeInOut});
        prevy = (i+1)*radius;
      } else {
        tl.to(ball.position, .5, {x:(i+2)*radius, y: prevy, ease:Cubic.easeInOut});
        prevx = (i+2)*radius;
      }
      ball.position.x = prevx;
      ball.position.y = prevy;
    }
    return [tl, ball];
  };

  function onFrame(e) {
      if (e.count % 600 === 0) {
        var color_stairs = getRandomColor();
        var color_ball = getRandomColor();
        while (color_stairs == color_ball) {
            color_ball = getRandomColor();
        }
        var tl_stairs = createStairs(color_stairs);
        var timeline = ballAnimation(color_ball);
        setTimeout(function() {
          timeline[1].remove();
        }, timeline[0].duration() * 1000);

        console.log(tl_stairs[1].length);
        setTimeout(function() {
          for (var i = 0; i < tl_stairs[1].length; i++) {
            tl_stairs[1][i].path.remove();
          }}, timeline[0].duration() * 1000);
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
