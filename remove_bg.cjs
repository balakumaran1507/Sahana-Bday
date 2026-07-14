const Jimp = require('jimp');
const path = require('path');

async function removeWhite() {
    console.log("Reading image...");
    const image = await Jimp.read(path.join(__dirname, 'public/polaroid_camera.png'));
    
    console.log("Processing pixels...");
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
        const red = this.bitmap.data[idx + 0];
        const green = this.bitmap.data[idx + 1];
        const blue = this.bitmap.data[idx + 2];
        
        // If pixel is very close to pure white, make it transparent
        if (red > 230 && green > 230 && blue > 230) {
            this.bitmap.data[idx + 3] = 0; 
        }
    });
    
    console.log("Saving transparent image...");
    await image.writeAsync(path.join(__dirname, 'public/polaroid_camera_transparent.png'));
    console.log("Done!");
}

removeWhite().catch(console.error);
