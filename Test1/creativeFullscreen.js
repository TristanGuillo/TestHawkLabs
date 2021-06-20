// Url video
const videoUrl = "../videos/ads.mp4";

// Cross Browsers height and width 
var screenWidth = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var screenHeight = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

function createCreative(){
    // console.log(" ===== createCreative =====");
    // Create Canvas 
    var canvas = document.createElement("canvas");
    canvas.height = screenHeight;
    canvas.width = screenWidth;
    canvas.style.backgroundColor = "white";

    // Context Canvas
    var ctx = canvas.getContext("2d");

    // Create Videoa
    var video = document.createElement("video");
    video.muted = true;
    video.autoplay = 'true';
    video.playsInline = "true";
    video.style.zIndex="1";
    video.style.display="none";

    // Create Source
    var source = document.createElement('source');
    source.type = "video/mp4";
    source.setAttribute('src', videoUrl);
    
    // Add source to video
    video.appendChild(source);

    // Calcul data for fullscreen + center video 
    var heightVideo = canvas.height;
    var widthVideo = (heightVideo * 1280 / 720);
    var left = ((widthVideo - canvas.width) / 2) * -1;

    // Create Controls for videos
    var muteImg = new Image();
    muteImg.src="../images/mute.png";
    muteImg.style.zIndex="2";
    muteImg.style.height = "25px";
    muteImg.style.width = "25px";
    muteImg.style.position = "absolute" ;
    muteImg.style.top = "15px";
    muteImg.style.left = "15px";
    muteImg.addEventListener('click', function(){
      video.muted = false;
      muteImg.style.display="none";
      unmuteImg.style.display="block";
    });

    var unmuteImg = new Image();
    unmuteImg.src="../images/volume.png";
    unmuteImg.style.zIndex="2";
    unmuteImg.style.height = "25px";
    unmuteImg.style.width = "25px";
    unmuteImg.style.position = "absolute" ;
    unmuteImg.style.top = "15px";
    unmuteImg.style.left = "15px";
    unmuteImg.style.display ="none";
    unmuteImg.addEventListener('click', function(){
      video.muted = true;
      muteImg.style.display="block";
      unmuteImg.style.display="none";
    });

    var playImg = new Image();
    playImg.src="../images/play.png";
    playImg.style.zIndex="2";
    playImg.style.height = "150px";
    playImg.style.width = "150px";
    playImg.style.position = "absolute" ;
    playImg.style.margin="auto";
    playImg.style.top = "0";
    playImg.style.bottom = "0";
    playImg.style.left = "0";
    playImg.style.right = "0";
    playImg.style.display ="none";
    playImg.addEventListener('click', function(){
      pauseImg.style.display = "block";
      playImg.style.display ="none";
      video.play();
    });

    var pauseImg = new Image();
    pauseImg.src="../images/pause.png";
    pauseImg.style.zIndex="2";
    pauseImg.style.height = "25px";
    pauseImg.style.width = "25px";
    pauseImg.style.position = "absolute" ;
    pauseImg.style.left = "15px";
    pauseImg.style.bottom = "15px";
    pauseImg.style.display ="block";
    pauseImg.addEventListener('click', function(){
      pauseImg.style.display = "none";
      playImg.style.display ="block";
      video.pause();
    })


    var replayImg = new Image();
    replayImg.src="../images/replay.png";
    replayImg.style.zIndex="2";
    replayImg.style.height = "150px";
    replayImg.style.width = "150px";
    replayImg.style.position = "absolute" ;
    replayImg.style.margin="auto";
    replayImg.style.top = "0";
    replayImg.style.bottom = "0";
    replayImg.style.left = "0";
    replayImg.style.right = "0";
    replayImg.style.display ="none";
    replayImg.addEventListener('click', function(){
      replayImg.style.display = "none";
      muteImg.style.display = "block";
      pauseImg.style.display = "block";
      video.play();
    })


    // AppendChild to body the controls buttons 
    document.body.appendChild(muteImg);
    document.body.appendChild(unmuteImg);
    document.body.appendChild(playImg);
    document.body.appendChild(pauseImg);
    document.body.appendChild(replayImg);

    document.body.appendChild(canvas);

    // Only solution to have sound
    document.body.appendChild(video);

    //Play video in canvas
    let displayVideo = function() {
        ctx.drawImage(video, left, 0, widthVideo, heightVideo);
        setTimeout(displayVideo, 0); // appel de la fonction toutes les 0 millisecondes
      }

    // Event display video
    video.addEventListener("play", displayVideo);

    // When video ends, display button play again
    video.addEventListener("ended", function(){
      replayImg.style.display="block";
      pauseImg.style.display="none";
      muteImg.style.display="none";
    })

    // Play video
    video.play();
}

window.onload = createCreative();