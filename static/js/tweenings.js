class Tween {
    constructor() {
        self.time = 0
        self.tween = null
        self.pingPong = false;
    }

    play(from, to, duration, onUpdate) {
        
        let stop = false
        self.time = 0
        self.tween = setInterval(() => {
            self.time += 1 / FPS
            let t = self.time / duration
            if (t > 1) {
                t = 1
                stop = true
            }
            if (onUpdate) {
                onUpdate(t)
            }

            if (stop) {
                clearInterval(self.tween)
            }
        }, 1000 / FPS);
    }
}


let FPS = 60
let seconds = 8

let element = document.getElementById('alpha')
function lerp(t) {
    if (element) {
        element.style.opacity = t
        // console.log(t)
    }
}

let duration = seconds
let pingpong = 1
let tween = setInterval(() => {

    duration -= 1/FPS * pingpong
    if (duration < 0) {
        duration = 0
        pingpong *= -1
    } else if (duration > seconds) {
        duration = seconds
        pingpong *= -1
    }
    
    let t = 1 - (duration / seconds)

    lerp(easeInQuart(t))
    
    seconds 
}, 1/FPS);


let ele = document.getElementById('alpha')
if (ele) {
    new Tween().play(0,1,3, (t) => {
        ele.style.opacity = lerp(0, 1, t)
    })
}


function lerp(a, b, t) {
    return a + (b - a) * (t < 0 ? 0 : t > 1 ? 1 : t);
}

function easeInOutQuad(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

function easeInQuart(x) {
    return x * x * x * x;
}
