import degreeToRadian from "../utils/degreeToRadian";
import { Vect2 } from "../utils/Vect2";

// export interface Point {
//     x: number
//     y:number
// }


export default class DrawToCanvas {
    #c;
	constructor(canvas:HTMLCanvasElement) {
        const temp = canvas!.getContext("2d");
        if (temp) {
            this.#c = canvas.getContext("2d");
        } else {
            console.error('Cant create canvas context out of:', temp);
            return 
        }
        
    }

    get center() {
        const middle = new Vect2(
             this.#c!.canvas.width / 2,
             this.#c!.canvas.height / 2,
			)
        return middle
    }

	clear(x:number, y:number, width:number, height:number) {
		this.#c!.clearRect(x, y, width, height);
	}

	set fill(color:string) {
		this.#c!.fillStyle = color;
	}

	set stroke(color:string) {
		this.#c!.strokeStyle = color;
	}
	
	set weight(lineWidth: number) {
		this.#c!.lineWidth = lineWidth;
	}

	set font(font:string) {
		this.#c!.font = font;
    } 

    strokeTriangle(startPoint: Vect2, p2: Vect2, p3: Vect2) {
        // the triangle
this.#c!.beginPath();
this.#c!.moveTo(100, 100);
this.#c!.lineTo(100, 300);
this.#c!.lineTo(300, 300);
this.#c!.closePath();
        
    }
    rotate(angle: number,objCenter:Vect2,isRadians:boolean = true) {
        // Matrix transformation
        this.#c!.translate(objCenter.x, objCenter.y);
        isRadians ? this.#c!.rotate(angle) : this.#c!.rotate(degreeToRadian(angle))
        this.#c!.translate(-objCenter.x, -objCenter.y);
    }

    fillTriangle(startPoint:Vect2,p2:Vect2,p3:Vect2) {
        this.#c!.beginPath();
        this.#c!.moveTo(startPoint.x, startPoint.y);
        this.#c!.lineTo(p2.x, p2.y);
        this.#c!.lineTo(p3.x, p3.y);
        this.#c!.fill();
    }

	circle(x:number, y:number, radius:number, fillBool?:boolean) {
		this.#c!.beginPath();
		this.#c!.arc(x, y, radius, 0, Math.PI * 2, false);
		fillBool ? this.#c!.fill() : this.#c!.stroke();
		this.#c!.closePath();
	}

	text(text:string, color:string, x:number, y:number) {
		this.#c!.beginPath();
		this.fill =color;
		this.#c!.fillText(text, x, y);
		this.#c!.closePath();
	}

	rect(x:number, y:number, width:number, height:number, fillBool?:boolean) {
		this.#c!.rect(x, y, width, height);
		fillBool ? this.#c!.fill() : this.#c!.stroke();
		this.#c!.closePath();
	}

	drawLine(p1:Vect2, p2:Vect2) {
		this.#c!.beginPath();
		this.#c!.moveTo(p1.x, p1.y);
		this.#c!.lineTo(p2.x, p2.y);
		this.#c!.stroke();
		this.#c!.closePath();
	}
}
