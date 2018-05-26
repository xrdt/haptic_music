<canvas resize="true" id="canvas"></canvas>

<!-- I wrote the code in paperscript, but could not find a way to use in codepen, so the js code is up here. -->

<script resize="true" type="text/paperscript" canvas="canvas">
  ////////////
  // CLASSES
  ////////////
  function Hex(position, targetRadius, color) {
      var subs = 3;

      this.radius = targetRadius;
      this.sides = randomIndex([4, 6, 8]);
      this.targetHex = new Path.RegularPolygon(position, this.sides, targetRadius);
      this.paths = [];

      for (var i = 0; i < subs; i++) {
          var h = new Path.RegularPolygon(position, this.sides, 0);

          if (i === 0) {
              h.strokeColor = color;
          }
          else {
              h.strokeColor = new Color({
                  hue:color.hue,
                  saturation:color.saturation,
                  lightness:.2,
                  alpha:1
              });
          }

          h.strokeWidth = 36;
          h.shadowBlur = 32;
          h.shadowColor = h.strokeColor;

          this.paths.push(h);
      }

      this.color = this.paths[subs - 1].strokeColor;

      this.speed = 200;
  }
  Hex.prototype = {
      animate:function() {
          var tl = new TimelineMax({
              onComplete:function() {
                  this.paths.forEach(function(p) {
                      p.remove();
                  });
              },
              onCompleteScope:this
          });

          var duration = this.radius / this.speed,
              offset = 0,
              ease = Cubic.easeOut;

          this.paths.forEach(function(h) {
              var from, to;

              for (var i = 0; i < h.segments.length; i++) {
                  from = h.segments[i].point;
                  to = this.targetHex.segments[i].point;

                  tl.to(from, duration, {x:to.x, y:to.y, ease:ease}, offset);
                  tl.to(h, duration, {strokeWidth:0, ease:ease}, offset);
              }

              offset += 0.2;

          }, this);

          return tl;
      }
  };

  function createRippleBasic() {
      var tl = new TimelineMax();

      var startPoint = new Point(view.size.width*(Math.random()*.75), view.size.height*(Math.random()*.75)),
          size = view.size.height*.20,
          color = getRandomColor();

      var hex = new Hex(startPoint, size, color);

      tl.add(hex.animate(), 'trailDone');

      for (var i = 0; i < hex.sides; i++) {
          var point = hex.targetHex.segments[i].point,
              localPoint = point - hex.targetHex.position;
      }

      return tl;
  }

  ////////////
  // UPDATE
  ////////////

  function onFrame(e) {
      // TODO: Update to be on key press
  }

  ////////////
  // utils
  ////////////

  function getRandomColor() {
      return new Color({
          hue:randomRange(0, 360),
          saturation:0.75,
          lightness:0.6
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
