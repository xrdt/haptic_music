<canvas resize="true" id="canvas"></canvas>

<!-- I wrote the code in paperscript, but could not find a way to use in codepen, so the js code is up here. -->

<script resize="true" type="text/paperscript" canvas="canvas">
  ////////////
  // CLASSES
  ////////////

  function Line(start, angle, length, color) {
      this.start = start;
      this.end = new Point();

      this.end.setAngle(angle);
      this.end.setLength(length);
      this.end += this.start;

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
                  this.path.remove();
              },
              onCompleteScope:this
          });

          var start = this.path.segments[0].point,
              end = this.path.segments[1].point;

          var duration = this.path.length / this.speed,
              ease = Cubic;

          tl.from(end, duration*0, {x:start.x, y:start.y, ease:ease.easeInOut});
          tl.to(start, duration*.1, {x:end.x, y:end.y, ease:ease.easeOut}, '-=0.5');

          return tl;
      }
  };

  function createSparks() {
      var tl = new TimelineMax();

      var startPoint = new Point(view.size.width * Math.random() * .9 + .05, view.size.height * Math.random()),
        angle = randomIndex([0, 180]),
        length = view.size.width * Math.random() * 0.8 + .4,
        color = getRandomColor();

      var trail = new Line(startPoint, angle, length, color);

      tl.add(trail.animate());
      tl.add('trailDone');

      var trail = new Line(startPoint, angle, length, color);

      tl.add(trail.animate());
      tl.add('trailDone');

      var trail = new Line(startPoint, angle, length, color);

      tl.add(trail.animate());
      tl.add('trailDone');

      var trail = new Line(startPoint, angle, length, color);

      tl.add(trail.animate());
      tl.add('trailDone');

      return tl;
  }

  ////////////
  // UPDATE
  ////////////

  function onFrame(e) {
      createSparks();
      /*if (e.count % 60 === 0) {
          createSparks();
      else if (e.count % 3 == 0) {
          createSparks();
      } else if (e.count % 6 == 0) {
          createSparks();
      }*/

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
