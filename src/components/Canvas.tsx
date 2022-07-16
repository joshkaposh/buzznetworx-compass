import React,{useState} from 'react'
import Draw from '../render/Draw';
import degreeToRadian from '../utils/degreeToRadian';
import Mouse from '../input/Mouse';
import { Vect2 } from '../utils/Vect2';

const resize = (canvas:HTMLCanvasElement, width:number, height:number) => {
    canvas.width = width;
    canvas.height = height;
}

const pointOnCircumference = (radians:number,radius:number) =>  {
    return {
        x: Math.cos(radians) * radius,
        y: Math.sin(radians) * radius
    }
}

class Tower {
    #pos:Vect2
    constructor(x:number,y:number) {
        this.#pos = new Vect2(x, y);
    }

    get position() {
        return this.#pos
    }

    draw(draw: Draw) {
        draw.fill = 'blue';
        draw.rect(this.#pos.x,this.#pos.y,25,25,true)
    }
}

const drawCompass = (draw: Draw, mouse: Mouse,towers:Tower[]) => {
    const centerOfScreen = draw.center;
    const uVectMouse = Vect2.Sub(mouse.position, draw.center).norm();
    const posOfMouseOnCompass = uVectMouse!.mult(75)
    const angleOfMouse = Math.atan2(uVectMouse!.y, uVectMouse!.x) * 100
    let isAligned = false;

    // console.log(angleOfMouse);
    for (let i = 0; i < towers.length; i++) {
    const tower = towers[i];
    const uVectTower = Vect2.Sub(tower.position, draw.center).norm();
        const angleOfTower = Math.atan2(uVectTower!.y, uVectTower!.x) * 100;

    if (angleOfMouse - 10 >= angleOfTower || angleOfMouse + 10 <= angleOfTower) {
        isAligned = true;
    }
        
        const posOfTowerOnCompass = uVectTower!.mult(75)

    tower.draw(draw);
    draw.circle(posOfTowerOnCompass.x + centerOfScreen.x,posOfTowerOnCompass.y + centerOfScreen.y,2,true)

}
    const topOfCompass = pointOnCircumference(degreeToRadian(270), 75)

    draw.stroke = 'red';
    draw.fill = 'red';

    draw.drawLine(centerOfScreen, Vect2.Add(centerOfScreen,posOfMouseOnCompass))
    draw.circle(posOfMouseOnCompass.x + centerOfScreen.x,posOfMouseOnCompass.y + centerOfScreen.y,3,true)

    draw.stroke = 'black';
    draw.fill = 'black';

    // draw.fillTriangle(new Vect2(0, centerOfScreen.y), new Vect2(25, centerOfScreen.y - 50), new Vect2(50, centerOfScreen.y))
    draw.circle(centerOfScreen.x, centerOfScreen.y, 75);
    // draw.circle(point.x + centerOfScreen.x,point.y + centerOfScreen.y,2,true)
    draw.text('N',!isAligned ? 'green':'red',topOfCompass.x + centerOfScreen.x - 7,topOfCompass.y + centerOfScreen.y - 10)
}



export default function Canvas() {
    const cRef = React.useRef<HTMLCanvasElement>(null)


    React.useEffect(() => {


        if (cRef.current) {
            let orientation = (screen.orientation || {})
            if (navigator.userAgent) {
              
            }
            const tower = new Tower(50,120)
            const canvas = cRef.current;
            const mouse = new Mouse();
            resize(canvas, window.innerWidth, window.innerHeight)
            const draw = new Draw(canvas)
            draw.font = '20px Arial'
           
            const animate = () => {

                draw.clear(0, 0, canvas.width, canvas.height)
                tower.draw(draw)
                drawCompass(draw, mouse,[tower])
                requestAnimationFrame(animate);
            }
            animate()
        }
    },[])

    return (
        <div>
            <canvas ref={cRef} ></canvas>
        </div>
    )
}

