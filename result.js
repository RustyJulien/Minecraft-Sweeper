window.onload = function(){
    present =JSON.parse(localStorage.getItem("presentScore"));
    document.getElementById("presentScore").innerHTML = "Your Score: "+present.level+" level, "+(present.timelong/1000).toFixed(2)+" seconds";
    best = JSON.parse(localStorage.getItem("bestScore"))
    document.getElementById("bestScore").innerHTML = "Best Score: "+best.level+" level, "+(best.timelong/1000).toFixed(2)+" seconds";
    t=localStorage.getItem("playTimes");
    summ=localStorage.getItem("sumScore")
    avg=summ/t
    document.getElementById("averageScore").innerHTML = "Average Levels: "+avg.toFixed(2);
}