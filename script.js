var glow = [];
var cooldown = .5;
var lastTick = 0;
let DarkenTemp = null;

window.onload = function() {
    DarkenTemp = document.getElementsByClassName("Darken");
    DarkenTemp[0].style.visibility = "hidden";
}
function render(dt){
    var s = dt/1000;
    if (s - lastTick > cooldown) {
        lastTick = s;
       
       let newGlow = DarkenTemp[0].cloneNode();
       document.body.appendChild(newGlow);
       let arr = {
        obj : newGlow,
        spawnTick : s,
        duration : 4,
        top : Math.random() * 100,
        left : Math.random() * 100,
        state : s / (Math.random() * 4),
        scale : Math.random()
       }
       glow.push(arr);
       newGlow.style["z-index"] = -1;
       newGlow.style.top = arr.top + "%";
       newGlow.style.visibility = "visible";
    
    }
   
    for (let i = 0; i < glow.length; i++) {

        let obj = glow[i].obj;
        let spawn = glow[i].spawnTick;
        let dur = glow[i].duration; 
        let state = glow[i].state; 
        let top = glow[i].top; 
        let left = glow[i].left; 
        let scale = glow[i].scale; 

        obj.style.top = top + Math.sin((state + s)*1)*20+"%";
        obj.style.left = left + Math.cos((state + s)*.5)*20+"%";


        obj.style.width = 100 * scale  + Math.sin(((s - spawn)/dur) * Math.PI) * 50+"%";
        obj.style.opacity = Math.sin(((s - spawn)/dur) * Math.PI) * .2;
        if (s - spawn > dur) {
            obj.remove();
            glow.splice(i, 1);
        }
    }
    requestAnimationFrame(render)
}

requestAnimationFrame(render)