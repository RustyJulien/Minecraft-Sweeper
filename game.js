const board = document.getElementById("board");
const result = document.getElementById("result")
const start = document.getElementById("start")
const fNumber= document.getElementById("flagNumber");
const next= document.getElementById("next");
const starttime =Date.now();
var level = 1;
const difficulty={"1":[5,3],"2":[10,13],"3":[15,30]}
var width;
var bombNumber;
var bombArray;
var flag;
var normalNumber;
var emptyArray;
var shuffledArray;
var matrix = [],width,width;
var timelong = Date.now()-Date.now();
var oldtimelong;
var gameEnd;
var gameWin;
var count = [],width,width;

var normalclick = function(square){
    if (square.classList.contains("bomb")){bombclick(square)}
    else if (square.classList.contains('clicked') === false){
        if (square.innerHTML==="🚩"){flag+=1;fNumber.innerHTML = "Flags Remain: "+flag;}
        square.innerHTML = ""
        square.classList.add('clicked');
        normalNumber--;
        if (normalNumber===0 ){
            gameWin=true;
            gameEnds();
        }
        var index = (square.id);
        var i = Math.floor(index / width);
        var j = index % width;
        $("#"+String(square.id)).css({"background-image":"url('https://i.imgur.com/fMtD5EH.png')",
        "background-size":"40px 40px"});
        let neighbor = [[i-1,j-1],[i-1,j],[i-1,j+1],[i,j-1],[i,j+1],[i+1,j-1],[i+1,j],[i+1,j+1]];
        let counter = count[i][j]
        if (counter === 0) {
            for (let k=0;k<8;k++){
                let ni = neighbor[k][0];
                let nj = neighbor[k][1];
                if ((ni>=0 & nj>=0) & (ni<width & nj<width)){
                    newSquare = document.getElementById((ni*width+nj).toString());
                    normalclick(newSquare);              
                }
            }
        }else{
            
            square.innerHTML = counter;
        }
    }
}

var bombclick = function(){
    gameEnds();
}

var flagclick = function(square){
    if (square.innerHTML ==="🚩"){
        square.innerHTML =""
        flag++;
        fNumber.innerHTML = "Flags Remain: "+flag;
    }else{
        if (square.classList.contains("clicked") === false & flag>=0){
            square.innerHTML="🚩"
        flag--;
        fNumber.innerHTML = "Flags Remain: "+flag;  
        }   
    }

}

var gameEnds = function(){
    //bomb show up
    $(".bomb").html("")
    $(".bomb").css({"background-image":"url('https://www.craftycreations.net/wp-content/uploads/2019/08/TNT-small.png')",
    "background-size":"40px 40px"});
    //remove event lisnter.
    let drops1 = document.querySelectorAll('.normal');
    drops1.forEach((drop) => {
        drop.removeEventListener('mousedown',Sclick);
    });
    let drops2 = document.querySelectorAll('.bomb');
    drops2.forEach((drop) => {
        drop.removeEventListener('mousedown',Sclick);
    });
    
    if (gameWin & level<3){

        result.innerHTML = "You win!"
        $("#next").html("next level");
        $("#next").click(startGame);
        level++;
        $("#next").show(); 
        timelong= Date.now() - starttime;
    }else {
        if (gameWin & level ==3){
        result.innerHTML = "You win!";
        timelong = Date.now() - starttime;
        }else{
        result.innerHTML = "You lose!"
        level--;
        timelong = oldtimelong;
        }
     
        $("#next").html("return");
        $("#next").off('click').click(function(){window.location.href = "./result.html"});
        $("#next").show();
        //store in local storage.
        localStorage.setItem('presentScore',JSON.stringify({"level":level,"timelong":timelong}));

        if (localStorage.getItem('bestScore')===null){
            localStorage.setItem('bestScore',JSON.stringify({"level":level,"timelong":timelong}));
        }else {
            best = JSON.parse(localStorage.getItem('bestScore'))
            if ((best.level<level) | (best.level===level & best.timelong>timelong)){
            localStorage.setItem('bestScore',JSON.stringify({"level":level,"timelong":timelong}));
        }}
        if (localStorage.getItem('sumScore')===null){
            localStorage.setItem('sumScore',level);
        }else{
            summ=JSON.parse(localStorage.getItem('sumScore'))
            summ+=level;
            localStorage.setItem('sumScore',summ);
        }
        if (localStorage.getItem('playTimes')=== null){
            localStorage.setItem('playTimes',1);
        }else{
            t = JSON.parse(localStorage.getItem('playTimes'));
            t++;
            localStorage.setItem('playTimes',t);}
    }  
    
}

var Sclick = function(e){
        switch (e.button) {
            case 0:
                normalclick(e.target);
                break;
            case 2:
                flagclick(e.target);
                break;
            default:
                break;
            
        }
}

var startGame= function(){
    $("#next").hide();
    result.innerHTML="Be Careful!"
    width = difficulty[String(level)][0];
    bombNumber = difficulty[String(level)][1];
    normalNumber = width*width - bombNumber;
    bombArray= Array(bombNumber).fill('bomb');
    emptyArray = Array(normalNumber).fill('normal');
    gameEnd = false;
    gameWin = false;
    oldtimelong=timelong;
    shuffledArray = (bombArray.concat(emptyArray)).sort(() => Math.random() -0.5);
    flag = bombNumber;
    fNumber.innerHTML = "Flags Remain: "+flag;
    //clear board;
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    board.style.gridTemplateColumns = "repeat("+String(width)+",40px)";
    //initialize matrix
    for(let i = 0, row = -1; i < width*width; i++) {
        const square = document.createElement('div')
        square.setAttribute('id', i)
        square.classList.add("square")
        square.classList.add(shuffledArray[i])
        board.appendChild(square)
        $("#"+square.id).css({
            "background-image":"url(' https://i.etsystatic.com/10800838/r/il/fb4f68/2825858925/il_1588xN.2825858925_s5dq.jpg')",
            "background-size":"40px 40px"});
        square.style.backgroundColor = "grey";
        square.addEventListener('mousedown',Sclick)       
        if (i % width === 0) {
            row++;
            matrix[row] = [];
        }
        matrix[row].push(shuffledArray[i]);
    }  

    for(let j = 0, i = -1; i<width; j++) {
            if (j % width === 0) {
                i++;
                j=0;
                count[i] = [];
            }
            if (i==width){break;}
            if  (matrix[i][j]==="normal"){
                let counter = 0;
                let neighbor = [[i-1,j-1],[i-1,j],[i-1,j+1],[i,j-1],[i,j+1],[i+1,j-1],[i+1,j],[i+1,j+1]];
                for (let k=0;k<8;k++){
                    let ni = neighbor[k][0];
                    let nj = neighbor[k][1];
                    if ((ni>=0 & nj>=0) & (ni<=width-1 & nj<=width-1)){
                        
                        if  (matrix[ni][nj]==="bomb") {counter +=1}
                    }
                }
            count[i].push(counter);
        }
        else{
            count[i].push("bomb");
        }
    }
}

window.onload = function() {  
    startGame();  
}