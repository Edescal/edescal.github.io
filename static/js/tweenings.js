class Tween {
    static FPS = 60

    constructor(loop = false, loopPingPong = false, easing = null) {
        this.time = 0
        this.tween = null
        this.loop = loop
        this.pingPong = loopPingPong;
        this.easingType = easing
    }

    play(from, to, duration, onUpdate = null) {
        let direction = 1
        let stop = false
        this.time = 0
        this.tween = setInterval(() => {
            this.time += (direction / Tween.FPS)
            this.time = clamp(this.time, 0, duration)

            let t = this.time / duration
            if (t > 1 || t < 0)
                stop = true
            t = clamp(t, 0, 1)

            if (onUpdate) {
                if (this.easingType != null) {
                    onUpdate(this.easingType( lerp(from, to, t) / to ))
                } else {
                    onUpdate(lerp(from, to, t))
                }
            }

            if (stop) {
                stop = false
                if (this.loop) 
                    this.time = 0
                else if (this.pingPong) 
                    direction *= -1
                else 
                    clearInterval(this.tween)
            }
        }, 1000 / Tween.FPS);
    }   
}


function lerp(a, b, t) {
    return a + (b - a) * (t < 0 ? 0 : t > 1 ? 1 : t);
}

function clamp(x, a, b) {
    return (x > a ? x : x > b ? b : x)
}

function easeInOutSine(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
}

function easeInOutQuad(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

function easeInQuart(x) {
    return x * x * x * x;
}



let box = document.getElementById('box')
if (box) {
    let tween = new Tween(true, false, easeInOutQuad)
    tween.play(0, 1, 2, (t) => {
        box.style.transform = `scale(${lerp(1.1, 0.8, t)}) rotate(${Math.trunc(-t * 270)}deg)`
        box.style.opacity = lerp(1, 0, t)
    })
}

let ele = document.getElementById('alpha')
if (ele) {
    new Tween(false, true, easeInOutQuad).play(0.35,1.0,1, (t) => {
        ele.style.opacity = lerp(0, 1, t)
    })
}


