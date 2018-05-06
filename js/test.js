paper.install(window);
window.onload = function() {
    paper.setup('myCanvas');
    /*
    var path = new Path.Rectangle([75, 75], [100, 100]);
    path.strokeColor = 'black';

    view.onFrame = function(event) {
        // On each frame, rotate the path by 3 degrees:
        path.rotate(3);
    }
    */
    /*
    // Create a centered text item at the center of the view:
    var text = new PointText({
        point: view.center,
        content: 'Click here to focus and then press some keys.',
        justification: 'center',
        fontSize: 15
    });

    $('#myCanvas').onFrame = function onKeyDown(event) {
        // When a key is pressed, set the content of the text item:
        $('#myCanvas').text.content = 'The ' + event.key + ' key was pressed!';
    }

    $('#myCanvas').onFrame = function onKeyUp(event) {
        // When a key is released, set the content of the text item:
        text.content = 'The ' + event.key + ' key was released!';
    }
    */
    // Create a centered text item at the center of the view:
    var text = new PointText({
        point: view.center,
        content: 'Click here to focus and then press some keys.',
        justification: 'center',
        fontSize: 15
    });

    function onKeyDown(event) {
        // When a key is pressed, set the content of the text item:
        text.content = 'The ' + event.key + ' key was pressed!';
    }

    function onKeyUp(event) {
        // When a key is released, set the content of the text item:
        text.content = 'The ' + event.key + ' key was released!';
    }
}