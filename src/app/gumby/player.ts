export interface PlayerInterface {
    ctx: CanvasRenderingContext2D;
    gumbyImg: CanvasImageSource;
  
    rightPressed: boolean;
    leftPressed: boolean;
    spacePressed: boolean;
  
    height: number;
    width: number;
  
    x: number;
    y: number;
  
    vx: number;
    vy: number;
  
    ax: number;
    ay: number;
  
    can_double_jump: boolean;
    player_mass: number;
    player_move_force: number;
    player_friction: number;
    air_friction: number;
    player_jump: number;
    gravity: number;
    DT: number;
    movePlayer(): void;
    drawPlayer(): void;
}
