const bellSound = new Audio("bell.mp3");
const notific = new Audio("notify.mp3");

document.getElementById("startBut").onclick = () => {
    document.getElementById("workTimer").hidden = false;
}

document.getElementById("timer").innerHTML = `<p>How long do you want to work for?</p>
<input id="womin" placeholder="00"></input> : <input id="secs" placeholder="00"></input> minutes`;

let allowPlay = true;

function bell() {
    bellSound.loop = false;
    bellSound.play();
}

function notify() {
    notific.loop = false;
    notific.volume = 0.3;
    notific.play();
}

let timerId = null; // need to set outside of eventlistener bc if it is created inside, it is local, so
// for each new click, a new timerId & its funcs are created. This means that the old version is
// inaccessible and therefore cannot be deleted.
let womin = "";
let secs = "";
let dispS = "";
let dispM = "";

let store = function cd() {
    clearInterval(timerId);
    timerId = setInterval(function countdown() {
        if (secs == 0 && womin == 0) {
            if (allowPlay == true)
                bell();
            clearInterval(timerId);
        }
        else {
            if (secs > 0) {
                secs--;
            }
            if (secs == 0 && womin !== 0) {
                womin--;
                secs = 59;
            }
            dispS = ((secs < 10) ? ("0" + secs) : (secs));
            dispM = ((womin < 10) ? ("0" + womin) : (womin));
            document.getElementById("timeDisp").innerHTML = `<p>${dispM}:${dispS}</p>`;
        }
    }, 1000)
};

const trigger = document.getElementById("subtime");
trigger.addEventListener("click", function timed() {

    womin = +document.getElementById("womin").value;
    secs = +document.getElementById("secs").value;
    if (womin !== 0 || secs !== 0) {
        if (document.getElementById("breakDirect").hidden == false)
            document.getElementById("breakDirect").hidden = true;
        document.getElementById("pause").style.visibility = "visible";
        document.getElementById("timeDisp").style.visibility = "visible";
        document.getElementById("quip").hidden = false;
        womin = ((!document.getElementById("womin").value) ? 0 : (+document.getElementById("womin").value <= 120) ? Math.floor(+document.getElementById("womin").value) : 120);
        secs = ((!document.getElementById("secs").value) ? 0 : (+document.getElementById("secs").value < 60) ? Math.floor(+document.getElementById("secs").value) : 59);
        dispS = ((secs < 10) ? ("0" + secs) : (secs));
        dispM = ((womin < 10) ? ("0" + womin) : (womin));
        document.getElementById("timeDisp").innerHTML = `<p>${dispM}:${dispS}</p>`;
        store();
    }
})

let time = new Date();
let hr = ((time.getHours() % 12) ? (time.getHours() % 12) : 12);
let mi = ((time.getMinutes() >= 10) ? (time.getMinutes()) : ("0" + time.getMinutes()));
let ampm = ((time.getHours() < 12) ? "am" : "pm")
document.getElementById("currentTime").innerHTML = `${hr} 
    <span id="blink">:</span> ${mi} ${ampm}`;
setInterval(() => {
    let time = new Date();
    let hr = ((time.getHours() % 12) ? (time.getHours() % 12) : 12);
    let mi = ((time.getMinutes() >= 10) ? (time.getMinutes()) : ("0" + time.getMinutes()));
    let se = time.getSeconds();
    let ampm = ((time.getHours() < 12) ? "am" : "pm")
    document.getElementById("currentTime").innerHTML = `${hr} 
    <span id="blink">:</span> ${mi} ${ampm}`;
}, 2000)

let dragging = false;
const drags = document.querySelectorAll(".drag");
drags.forEach(function move(drag) {
    drag.addEventListener("mousedown", (cursorInfo) => {
        dragging = true;
        let kid = cursorInfo.currentTarget;
        let parent = kid.parentElement;
        let pRect = parent.getBoundingClientRect();
        let offx = cursorInfo.clientX - pRect.left;
        let offy = cursorInfo.clientY - pRect.top;
        function end() {
            document.removeEventListener("mousemove", go);
            document.removeEventListener("mouseup", end);
            dragging = false;
        }
        function go(cursInfo) {
            if (dragging == true) {
                parent.style.top = ((cursInfo.clientY - offy <= 280 && cursInfo.clientY - offy >= 0) ? (cursInfo.clientY - offy + "px") : (cursInfo.clientY - offy > 280) ? "280px" : "0px");
                parent.style.left = ((cursInfo.clientX - offx <= 967 && cursInfo.clientX - offx >= 0) ? (cursInfo.clientX - offx + "px") : (cursInfo.clientX - offx > 967) ? "967px" : "0px");
            }
        }
        document.addEventListener("mouseup", end); // document instead of drag so that if the cursor leaves the space, it continues moving/matching
        //cursor to that space (prevents it from escaping)
        document.addEventListener("mousemove", go);
    })
})

document.querySelectorAll(".close").forEach((xbut) => {
    xbut.addEventListener("click", (clickInfo) => {
        let kid = clickInfo.currentTarget;
        let parent1 = kid.parentElement;
        let parent = parent1.parentElement;
        parent.hidden = true;
        if (parent.id == "workTimer") {
            clearInterval(timerId);
            document.getElementById("timeDisp").style.visibility = "hidden";
            document.getElementById("pause").style.visibility = "hidden";
            document.getElementById("quip").hidden = true;
            document.getElementById("womin").value = "";
            document.getElementById("secs").value = "";
        }
    })
})

let i = 0;
function pausing() {
    if (i == 0) {
        clearInterval(timerId);
        i++;
    }
    else if (i != 0) {
        store();
        i = 0;
        if (document.getElementById("breakDirect").hidden == false)
            document.getElementById("breakDirect").hidden = true;
    }
}
document.getElementById("pause").onclick = function test() {
    pausing();
}

document.getElementById("breakBut").onclick = () => {
    i = 0;
    pausing();
    document.getElementById("breakDirect").hidden = false;
}

let clickTrack = 0;
let annoy = null;

document.getElementById("waterRem").onclick = function remind() {
    let get = document.getElementById("reminder");
    if (clickTrack == 0) {
        clickTrack = 1;
        document.getElementById("waterRem").style.filter = "grayscale(0%)";
        annoy = setInterval(() => {
            let remindList = ["Don't forget to stand up and stretch!", "Great work! How about some water?", "Take a quick stretch break!", "Time to hydrate!"];
            get.innerHTML = remindList[Math.floor(Math.random() * 4)];
            get.hidden = false;
            if (allowPlay == true)
                notify();
            setTimeout(() => {
                get.hidden = true;
            }, 5000)
        }, 1800000);
    }
    else if (clickTrack == 1) {
        clickTrack = 0;
        document.getElementById("waterRem").style.filter = "grayscale(100%)";
        clearInterval(annoy);
        get.hidden = true;
    }
}

document.getElementById("sound").onclick = function mute() {
    allowPlay = !allowPlay;
    let tester = document.getElementById("sound");
    let style = window.getComputedStyle(tester).filter;
    if (style.includes("grayscale(1)"))
        document.getElementById("sound").style.filter = "grayscale(0)";
    else
        document.getElementById("sound").style.filter = "grayscale(1)";
}