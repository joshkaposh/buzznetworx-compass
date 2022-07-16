import { Vect2 } from "../utils/Vect2";

export default class Mouse {
    #pos:Vect2
    constructor() {
        this.#pos = new Vect2(0, 0);
        window.addEventListener('mousemove',this.#handleMouse.bind(this))
    }

    #handleMouse(e:MouseEvent) {
        this.#pos.x = e.clientX;
        this.#pos.y = e.clientY;
    }

    get position() {
        return this.#pos;
    }
}