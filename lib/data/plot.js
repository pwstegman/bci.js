const opn = require('opn');
var PNGImage = require('pngjs-image');
var tmp = require('tmp');
var path = require('path');

function plot(x, y, width = 200, height = 50){
    var tmpobj = tmp.dirSync();
    var tmpdir = tmpobj.name;

    var min_x = Math.min(...x);
    var max_x = Math.max(...x);

    var min_y = Math.min(...y);
    var max_y = Math.max(...y);

    var image = PNGImage.createImage(width, height);

    // White background
    for(var r = 0; r < height; r++){
        for(var c = 0; c < width; c++){
            image.setAt(c, r, {red:255, green:255, blue: 255, alpha: 255});
        }
    }

    // Scale points
    for(var i = 0; i < x.length; i++){
        x[i] = Math.round((x[i] - min_x) / (max_x - min_x) * width * 0.9) + width * 0.05;
        y[i] = height - Math.round((y[i] - min_y) / (max_y - min_y) * height * 0.9) - height * 0.05;
    }

    // Draw lines
    for(var i = 0; i < x.length - 1; i++){
        drawLine(image, [x[i], y[i]], [x[i+1], y[i+1]]);
    }

    // Open image
    var imgpath = path.join(tmpdir, new Date().getTime() + '.png');
    image.writeImage(imgpath, function (err) {
        if (err) throw err;
        opn(imgpath).then(() => {
            // Viewer closed
        });
    });
}

function drawLine(image, p1, p2){
    var slope = (p2[1] - p1[1]) / (p2[0] - p1[0]);

    var xmn = Math.min(p1[0], p2[0]);
    var xmx = Math.max(p1[0], p2[0]);

    for(var x = xmn; x < xmx; x++){
        var y = p1[1] + slope * (x - p1[0]);
        image.setAt(Math.round(x), Math.round(y), {red:0, green:0, blue: 255, alpha: 255});
    }

    var ymn = Math.min(p1[1], p2[1]);
    var ymx = Math.max(p1[1], p2[1]);

    for(var y = ymn; y < ymx; y++){
        var x = p1[0] + (y - p1[1]) / slope;
        image.setAt(Math.round(x), Math.round(y), {red:0, green:0, blue: 255, alpha: 255});
    }
}

module.exports = plot;