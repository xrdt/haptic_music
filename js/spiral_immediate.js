<canvas resize="true" id="canvas"></canvas>

    <!-- I wrote the code in paperscript, but could not find a way to use in codepen, so the js code is up here. -->

    <script resize="true" type="text/paperscript" canvas="canvas">

    function growSpiral(path, ix, position) {
      var vector = new Point({
        // This vector is always initialized relative to the origin:
        // (upper left corner)
        angle: (ix % 20) * 18,
        length: ix / 2
      });

      path.add(position + vector);
      return position + vector
    }

function onFrame(e) {
    if (e.count % 12000 === 0) {
      var spiral = new Path({closed: false});
      var iterations = 100;
      var position = view.center;

      position = new Point(view.center.x, view.center.y);
      spiral.add(position);
      for (var i = 0; i < iterations; i++) {
        console.log('running');
        position = growSpiral(spiral, i, position);
      }
      spiral.smooth();

      var outline = new Path.Circle(view.center, Math.sqrt(Math.pow(position.x - view.center.x, 2) + Math.pow(position.y - view.center.y, 2)));

      var fullSpiral = new CompoundPath({children: [spiral, outline], strokeColor: 'red'});

      var tl = new TimelineMax();
      tl.to(fullSpiral, .5, {rotation: -360, repeat:-1, ease: Linear.easeNone});
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
