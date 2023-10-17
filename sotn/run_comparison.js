
var jumplink = document.getElementById('jump');

jumplink.addEventListener("click", function (event) {
    event.preventDefault();
    var videoPlayerA = document.getElementById("videoPlayerA");
    var videoFileA = document.getElementById("videoFileA");
    console.log(' videoFileA: ', videoFileA.files[0].name);
    var videoPlayerB = document.getElementById("videoPlayerB");
    var videoFileB = document.getElementById("videoFileB");
    console.log(' videoFileB: ', videoFileB.files[0].name);
    videoPlayerA.play();
    videoPlayerA.pause();
    videoPlayerA.currentTime = 60;
    videoPlayerA.play();
    videoPlayerB.play();
    videoPlayerB.pause();
    videoPlayerB.currentTime = 60;
    videoPlayerB.play();
}, false);

function loadVideo(playerId, fileId)
{
    var videoPlayer = document.getElementById(playerId);
    var videoFile = document.getElementById(fileId);
    console.log(' videoFile: ', videoFile.files[0].name);
    var source = document.createElement('source')
    source.src = URL.createObjectURL(videoFile.files[0]);
    videoPlayer.replaceChildren(source);
}
