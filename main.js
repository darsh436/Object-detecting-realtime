img="";
status1="";
objects=[];

function preload(){
    img=loadImage("thi.jfif");
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status1").innerHTML="Status:Detecting Objects"
}
function draw(){
image(video,0,0,380,380);
if(status1 !=""){
    r=random(255);
    g=random(255);
    b=random(255);
    objectDetector.detect(video,gotResults);
for (i=0; i<objects.length; i++){
    document.getElementById("status1").innerHTML="Status : Objects Detected";
    document.getElementById("number_of_objects").innerHTML="Number of object detected are:"+objects.length;

    fill(r,g,b);
    percent = floor(objects[i].confidence * 100);
    text(objects[i].label + "" +percent+"%",objects[i].x+15,objects[i].y+15);
    noFill();
    stroke(r,g,b);
    rect(objects[i].x+15, objects[i].y+20, objects[i].width+150, objects[i].height+200)
}}
}
function modelLoaded(){
    console.log("Model Loaded!")
    status1=true;
}
function gotResults(error,results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}