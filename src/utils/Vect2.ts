
export interface IVect2 {
	x: number,
	y: number,
}

export class Vect2 implements IVect2 {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	static get up() {
		return new Vect2(0, -1);
	}

	static get down() {
		return new Vect2(0, 1);
	}

	static get left() {
		return new Vect2(-1, 0);
	}

	static get right() {
		return new Vect2(1, 0);
	}

	mag() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	norm() {
		let m = this.mag();
		if (m > 0) {
			this.div(m);
			return this;
		}
	}

	static Norm(vect:Vect2) {
		let m = Vect2.Mag(vect);
		if (m > 0) {
			return Vect2.Div(vect, m);
		}
	}

	static distance(v:Vect2, w:Vect2):number {
		return Math.sqrt(Math.pow(v.x - w.x, 2) + Math.pow(v.y - w.y, 2));
	}

	static Mag(vect:Vect2):number {
		return Math.sqrt(vect.x * vect.x + vect.y * vect.y);
	}

	static Add(v:Vect2, w:Vect2):Vect2 {
		return new Vect2(v.x + w.x, v.y + w.y);
	}

	static Sub(v:Vect2, w:Vect2):Vect2 {
		return new Vect2(v.x - w.x, v.y - w.y);
	}

	static Mult(v:Vect2, scalar:number):Vect2 {
		return new Vect2(v.x * scalar, v.y * scalar);
	}

	static Div(v:Vect2, scalar:number):Vect2 {
		return new Vect2(v.x / scalar, v.y / scalar);
	}

	add(v:Vect2) {
		this.x += v.x;
		this.y += v.y;
		return this;
	}
	sub(v:Vect2) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}

	set(v:Vect2) {
		this.x = v.x;
		this.y = v.y;
		return this;
	}

	addX(x:number) {
		this.x += x;
		return this;
	}

	addY(y:number) {
		this.y += y;
		return this;
	}

	subX(x:number) {
		this.x -= x;
		return this;
	}
	subY(y:number) {
		this.y -= y;
		return this;
	}

	Div(v:Vect2, scalar:number) {
		return new Vect2((v.x /= scalar), (v.y /= scalar));
	}

	div(scalar:number) {
		this.x /= scalar;
		this.y /= scalar;
		return this;
	}

	mult(scalar:number) {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}

	setX(x:number) {
		this.x = x;
		return this;
	}
	setY(y:number) {
		this.y = y;
		return this;
	}

	clone():Vect2 {
		return new Vect2(this.x, this.y);
	}
}
