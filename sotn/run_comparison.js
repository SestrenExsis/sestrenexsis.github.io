
var actionButton = document.getElementById('actionButton');
actionButton.addEventListener("click", function (event) {
    event.preventDefault();
    crop();
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

function crop() {
    console.log("crop");
    let canvasA = document.getElementById("canvasA");
    let contextA = canvasA.getContext("2d");
    let videoPlayerA = document.getElementById("videoPlayerA");
    contextA.drawImage(videoPlayerA, 0, 0, 320, 240);
    let canvasB = document.getElementById("canvasB");
    let contextB = canvasB.getContext("2d");
    let videoPlayerB = document.getElementById("videoPlayerB");
    contextB.drawImage(videoPlayerB, 0, 0, 320, 240);
}

function loadVideo(playerId, fileId) {
    let videoPlayer = document.getElementById(playerId);
    let videoFile = document.getElementById(fileId);
    console.log('videoFile: ', videoFile.files[0].name);
    let source = document.createElement('source')
    source.src = URL.createObjectURL(videoFile.files[0]);
    videoPlayer.replaceChildren(source);
}
