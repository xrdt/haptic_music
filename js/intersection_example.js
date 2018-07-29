<canvas resize="true" id="canvas"></canvas>

<!-- I wrote the code in paperscript, but could not find a way to use in codepen, so the js code is up here. -->

<script resize="true" type="text/paperscript" canvas="canvas">
  ////////////
  // CLASSES
  ////////////
var path = new Path({
    segments: [[20, 20], [80, 80], [140, 20]],
    strokeColor: 'white',
    strokeWidth: 20,
    id: 'test',
});
  
var path2 = new Path({
    segments: [[300, 300], [300, 300], [400, 400]],
    strokeColor: 'red',
    strokeWidth: 10, 
    id: 'collide',
});

if (path.getIntersections(path2).length) {
  TweenMax.to("body", 0.1, {backgroundColor:"red", repeat: 3, yoyo:true});
}

  ////////////
  // UPDATE
  ////////////

  function onFrame(e) {
      if (e.count % 60 === 0) {
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