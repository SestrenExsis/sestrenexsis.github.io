
function update_frame() {
    console.log("update_frame()");
    let canvas = document.getElementById("canvasA");
    let context = canvas.getContext("2d");
    let videoPlayer = document.getElementById("videoPlayerA");
    let left = document.getElementById("window_left").value;
    let top = document.getElementById("window_top").value;
    let width = document.getElementById("window_width").value;
    let height = document.getElementById("window_height").value;
    canvas.width = 256;
    canvas.height = 194;
    context.drawImage(
        videoPlayer,
        left, top, width, height,
        0, 0, 256, 194,
    );
};

function get_frame_data() {
    let canvas = document.getElementById("canvasA");
    let context = canvas.getContext("2d");
    let frame = context.getImageData(0, 0, 256, 194);
    let total_red = 0;
    let total_green = 0;
    let total_blue = 0;
    for (let i = 0; i < frame.data.length; i+= 4) {
        total_red += frame.data[i + 0];
        total_green += frame.data[i + 1];
        total_blue += frame.data[i + 2];
    }
    let pixel_count = frame.data.length / 4;
    let frame_data = {
        red: Math.floor(total_red / pixel_count),
        green: Math.floor(total_green / pixel_count),
        blue: Math.floor(total_blue / pixel_count),
    };
    return frame_data;
};

function nudge_timeline(amount_in_ms) {
    let videoPlayer = document.getElementById("videoPlayerA");
    videoPlayer.currentTime += amount_in_ms / 1000;
};

function calibrate(prefix) {
    let frame_data = get_frame_data();
    let red = document.getElementById(prefix + "_red");
    let green = document.getElementById(prefix + "_green");
    let blue = document.getElementById(prefix + "_blue");
    red.value = frame_data.red;
    green.value = frame_data.green;
    blue.value = frame_data.blue;
};

function loadVideo(playerId, fileId) {
    let videoPlayer = document.getElementById(playerId);
    let videoFile = document.getElementById(fileId);
    console.log('videoFile: ', videoFile.files[0].name);
    let source = document.createElement('source')
    source.src = URL.createObjectURL(videoFile.files[0]);
    videoPlayer.replaceChildren(source);
};

// Source: https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement/videoHeight
let videoPlayer = document.getElementById("videoPlayerA");
videoPlayer.addEventListener("resize", (event) => {
    let width = videoPlayer.videoWidth;
    let height = videoPlayer.videoHeight;
    if (width && height) {
        videoPlayer.style.width = width;
        videoPlayer.style.height = height;
    }
});
