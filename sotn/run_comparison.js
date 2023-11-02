
const metadata = {
    "db_1632": {
        "name": "Alucard Any% NSC 01 - 16-32-500 - Dr4gonBlitz.mp4",
        "window": {
            "left": 0,
            "top": 0,
            "width": 954,
            "height": 720,
        },
        "min_threshold": 1,
        "max_threshold": 252,
        "timeline": [
            6000,
            12500,
            54000,
        ]
    },
    "db_1653": {
        "name": "Alucard Any% NSC Marathon-Safe - 16-53-710 - Dr4gonBlitz.mp4",
        "window": {
            "left": 4,
            "top": 58,
            "width": 954,
            "height": 624,
        },
        "min_threshold": 1,
        "max_threshold": 252,
        "timeline": [
            66000,
            73000,
            112500,
        ]
    },
}
// https://developer.mozilla.org/en-US/docs/Web/API/ImageData
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData

var timelineIndex = 0;

var playOrPause = document.getElementById('playOrPause');
playOrPause.addEventListener("click", function (event) {
    event.preventDefault();
    toggle("videoPlayerA");
    toggle("videoPlayerB");
}, false);

var nextScene = document.getElementById('nextScene');
nextScene.addEventListener("click", function (event) {
    event.preventDefault();
    crop("canvasA", "videoPlayerA", metadata.db_1632.window);
    jump("videoPlayerA", metadata.db_1632.timeline[timelineIndex]);
    crop("canvasB", "videoPlayerB", metadata.db_1653.window);
    jump("videoPlayerB", metadata.db_1653.timeline[timelineIndex]);
    timelineIndex += 1;
    if (timelineIndex >= 3) {
        timelineIndex = 0;
    }
}, false);

var nextFrame = document.getElementById('nextFrame');
nextFrame.addEventListener("click", function (event) {
    event.preventDefault();
    advance("videoPlayerA", 17);
    crop("canvasA", "videoPlayerA", metadata.db_1632.window);
    advance("videoPlayerB", 17);
    crop("canvasB", "videoPlayerB", metadata.db_1653.window);
}, false);

function toggle(videoPlayerId) {
    let videoPlayer = document.getElementById(videoPlayerId);
    if (videoPlayer.paused || videoPlayer.ended) {
        videoPlayer.play();
    }
    else {
        videoPlayer.pause();
    }
}

function jump(videoPlayerId, time_in_ms) {
    let videoPlayer = document.getElementById(videoPlayerId);
    videoPlayer.play();
    videoPlayer.pause();
    videoPlayer.currentTime = time_in_ms / 1000;
}

function advance(videoPlayerId, time_in_ms) {
    let videoPlayer = document.getElementById(videoPlayerId);
    videoPlayer.currentTime += time_in_ms / 1000;
}

function crop(canvasId, videoPlayerId, window) {
    console.log("crop" + canvasId);
    let canvas = document.getElementById(canvasId);
    let context = canvas.getContext("2d");
    let videoPlayer = document.getElementById(videoPlayerId);
    canvas.width = 256;
    canvas.height = 194;
    context.drawImage(
        videoPlayer,
        window.left, window.top, window.width, window.height,
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
