export interface CharlesHeadInterface {
    ctx: CanvasRenderingContext2D;
    charlesImg: CanvasImageSource;

    max_charles_speed: number;
    min_charles_speed: number;
    radius: number;
    y: number;
    x: number;
    vx: number;
    DT: number;
    draw(): void;
    move(): void;
}
