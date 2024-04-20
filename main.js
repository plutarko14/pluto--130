scoreRightWrist = 0;
 scoreLeftWrist = 0;
  rightWristX = 0;
   rightWristY = 0;
    leftWristX = 0;
     leftWristY = 0;
song="";
function preload()
{
    song=loadSound("https://amdavalos.github.io/ProyectoADVC55/shape_of_you_best.mp3");

}

function setup()
{
   canvas= createCanvas(800,800);
   canvas.position(350,150);
   video=createCapture(VIDEO);
   video.hide();
   poseNet=ml5.poseNet(video, modelLoaded);
   poseNet.on("pose",gotPoses)
}
function modelLoaded() 
{
     console.log('PoseNet está inicializado'); 
    }

function draw()
{
    image(video, 0,0,800,800);
    fill("orangered");
    stroke("aqua");
    //VELOCIDAD
    if(scoreRightWrist>0.05)
    {
     circle(rightWristX,rightWristY, 15);
     if(rightWristY >0 && rightWristY <= 100)
{
	document.getElementById("seed").innerHTML = "Velocidad = 5x";		
	song.rate(5);
}
else if(rightWristY >100 && rightWristY <= 200)
{
	document.getElementById("seed").innerHTML = "Velocidad = 4x";		
	song.rate(4);
    }
    else if(rightWristY >200 && rightWristY <= 300)
{
	document.getElementById("seed").innerHTML = "Velocidad = 3x";		
	song.rate(3);
    }
    else if(rightWristY >300 && rightWristY <= 400)
{
	document.getElementById("seed").innerHTML = "Velocidad = 2x";		
	song.rate(2);
    }
    else if(rightWristY >400 && rightWristY <= 500)
{
	document.getElementById("seed").innerHTML = "Velocidad = 1x";		
	song.rate(1);
    }
    
    else if(rightWristY >500 )
{
	document.getElementById("seed").innerHTML = "Velocidad = 0.0005x";		
	song.rate(0.0005);
    }
    //VOLUMEN
    if(scoreLeftWrist>0.2)
    {
        circle(leftWristX, leftWristY, 15);
        coord= Number(leftWristY);
        redondo= floor(coord*2);
        volumen=redondo/1600;
        document.getElementById("round").innerHTML="volumen = "+volumen;
        song.setVolume(volumen);
    }
}
}
function bark()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results)
{
    if(results.length>0)
    {
        scoreRightWrist = results[0].pose.keypoints[10].score;
         scoreLeftWrist = results[0].pose.keypoints[9].score;
          console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
          leftWristX=results[0].pose.leftWrist.x;
          leftWristY=results[0].pose.leftWrist.y;
          rightWristX=results[0].pose.rightWrist.x;
          rightWristY=results[0].pose.rightWrist.y;
    }
}





















































































