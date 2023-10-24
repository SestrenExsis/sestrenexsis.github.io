
var actionButton = document.getElementById('actionButton');
actionButton.addEventListener("click", function (event) {
    event.preventDefault();
    crop("canvasA", "videoPlayerA", 0, 0, 954, 720);
    crop("canvasB", "videoPlayerB", 4, 58, 954, 624);
    // jump(60);
}, false);

function jump(time) {
    console.log("jump");
    let videoPlayerA = document.getElementById("videoPlayerA");
    let videoFileA = document.getElementById("videoFileA");
    console.log('videoFileA: ', videoFileA.files[0].name);
    let videoPlayerB = document.getElementById("videoPlayerB");
    let videoFileB = document.getElementById("videoFileB");
    console.log('videoFileB: ', videoFileB.files[0].name);
    videoPlayerA.play();
    videoPlayerA.pause();
    videoPlayerA.currentTime = time;
    videoPlayerA.play();
    videoPlayerB.play();
    videoPlayerB.pause();
    videoPlayerB.currentTime = time;
    videoPlayerB.play();
}

function crop(canvasId, videoPlayerId, left, top, width, height) {
    console.log("crop" + canvasId);
    let canvas = document.getElementById(canvasId);
    let context = canvas.getContext("2d");
    let videoPlayer = document.getElementById(videoPlayerId);
    canvas.width = 256;
    canvas.height = 194;
    context.drawImage(
        videoPlayer,
        left, top, width, height,
        0, 0, 256, 194,
    );
    let frame = context.getImageData(0, 0, 256, 194);
    let total_red = 0;
    let total_green = 0;
    let total_blue = 0;
    for (let i = 0; i < frame.data.length; i+= 4) {
        let red = frame.data[i + 0];
        let green = frame.data[i + 1];
        let blue = frame.data[i + 2];
        total_red += red;
        total_green += green;
        total_blue += blue;
    }
    let pixel_count = frame.data.length / 4;
    console.log("red: " + Math.floor(total_red / pixel_count))
    console.log("green: " + Math.floor(total_green / pixel_count))
    console.log("blue: " + Math.floor(total_blue / pixel_count))
}

function loadVideo(playerId, fileId) {
    let videoPlayer = document.getElementById(playerId);
    let videoFile = document.getElementById(fileId);
    console.log('videoFile: ', videoFile.files[0].name);
    let source = document.createElement('source')
    source.src = URL.createObjectURL(videoFile.files[0]);
    videoPlayer.replaceChildren(source);
}
