import { Component, OnInit, ViewChild, ElementRef, HostListener, OnDestroy, Input } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { PlayerInterface } from './player';
import { CharlesHeadInterface } from './charlesHead';

@Component({
  selector: 'app-gumby',
  templateUrl: './gumby.component.html',
  styleUrls: ['./gumby.component.css']
})

export class GumbyComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  
  @Input() navbarHeight: number = 60;

  ctx: CanvasRenderingContext2D;

  gameTimer: ReturnType<typeof setInterval>;
  charlesTimer: ReturnType<typeof setInterval>;

  gumbyObservable: Subscription;
  charlesObservable: Subscription;
  keysObservable: Subscription;

  keysImg: CanvasImageSource;
  keysW: number = 286;
  keysH: number = 100;


  charlesImg: CanvasImageSource;
  charlesW: number = 55*1.3;
  charlesH: number = 78*1.3;

  gumbyImg: CanvasImageSource = new Image();
  gumbyW: number = 100;
  gumbyH: number = 250;

  DT: number = 15; //miliseconds

  player1: Player;

  kill_count: number = 0;
  death_count: number = 0;
  missed_count: number = 0;

  charles_buffer: CharlesHead[] = [];

  someKeyPressed: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight - this.navbarHeight; // navbar height from app-component.css
    this.player1 = new Player(this.ctx, this.canvas, this.gumbyH, this.gumbyW / 2, this.DT);

    this.gumbyObservable = this.loadImage('../assets/img/gumby.jpg').subscribe(img => {
      this.player1.gumbyImg = img;
    });
    this.charlesObservable = this.loadImage('../assets/img/charles-head.png').subscribe(img => {
      this.charlesImg = img;
      this.charles_buffer = [];
    });

    this.keysObservable = this.loadImage('../assets/img/keys.png').subscribe(img => {
      this.keysImg = img;
    });
   
    //run the game
    this.animate(); 
  }

  ngOnDestroy(): void {
    //remove lingering observable subscriptions
    this.gumbyObservable.unsubscribe();
    this.charlesObservable.unsubscribe();

    //clear interval timers
    clearInterval(this.gameTimer);
    clearInterval(this.charlesTimer);
  }

  @HostListener('window:keydown', ['$event'])
  keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        this.player1.rightPressed = true;
        this.player1.imgIsFlipped = true;
        this.someKeyPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        this.player1.leftPressed = true;
        this.player1.imgIsFlipped = false;
        this.someKeyPressed = true;
    }
    else if(e.key == " ") {
        this.player1.spacePressed = true;
        this.someKeyPressed = true;
    }
  }

  @HostListener('window:keyup', ['$event'])  
  keyUpHandler(e) {
      if(e.key == "Right" || e.key == "ArrowRight") {
          this.player1.rightPressed = false;
      }
      else if(e.key == "Left" || e.key == "ArrowLeft") {
          this.player1.leftPressed = false;
      }
      else if(e.key == " ") {
          this.player1.spacePressed = false;
      }
  }
  
  loadImage(url: string): Observable<CanvasImageSource> {
    return Observable.create((observer: Observer<CanvasImageSource>) => {
      // create an image object
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
          // This will call another method that will create image from url
          img.onload = () => {
          observer.next(img);
          observer.complete();
        };
        img.onerror = (err) => {
           observer.error(err);
        };
      } else {
          observer.next(img);
          observer.complete();
      }
    });
  }

  animate() {
    setInterval(() => {this.draw()}, this.DT);
    setInterval(() => {this.spawnCharlesRandomly()}, 1000); //spawn charles head about once every two seconds
    
  }

  draw() {
    this.checkCollisions();
  
    //move player
    this.player1.movePlayer();
    for (let i = 0; i < this.charles_buffer.length; i++) {
      this.charles_buffer[i].move();
    }
    //move all charles objects

    //clear screen
    this.ctx.beginPath();
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.closePath();

    //Render Keyboard image
    if (!this.someKeyPressed && this.keysImg) {
      this.ctx.beginPath();
      this.ctx.drawImage(this.keysImg, this.ctx.canvas.width - this.keysW, 0, this.keysW, this.keysH);
      this.ctx.closePath();
    }

    //Render Game title
    this.ctx.beginPath();
    this.ctx.font = "30px Comic Sans MS";
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
    this.ctx.fillText("GUMBY TRAMPOLINE", this.ctx.canvas.width / 2, 30 + 50);
    this.ctx.closePath();
  
    //Render Game title
    this.ctx.beginPath();
    this.ctx.font = "30px Comic Sans MS";
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "left";
    let pointsText = "Points: "
    this.ctx.fillText(pointsText, 10, 50);
    this.ctx.fillStyle = "blue";
    this.ctx.fillText("" + this.kill_count, 10 + this.ctx.measureText(pointsText).width, 50);
    // this.ctx.fillText("# Charles' Heads That Attacked You: " + this.death_count, 10, 100);
    // this.ctx.fillText("# Charles' Heads That You Missed: " + this.missed_count, 10, 150);
    this.ctx.closePath();
  
    //render player and charles-heads
    this.player1.drawPlayer();
    for (let i = 0; i < this.charles_buffer.length; i++) {
      //delete unused charles-heads from the buffer
      let RIGHT_LIMIT = this.canvas.nativeElement.width + 4*this.charles_buffer[i].radius;
      let LEFT_LIMIT = -4*this.charles_buffer[i].radius;

      if (this.charles_buffer[i].x > RIGHT_LIMIT || this.charles_buffer[i].x < LEFT_LIMIT){
        //delete from buffer
        this.charles_buffer.splice(i, 1);
        this.missed_count = this.missed_count + 1;
        this.kill_count--;
      }
      //draw remaining charles-heads
      this.charles_buffer[i].draw();
    }
  }
  
  spawnCharlesRandomly() {
    if (Math.random() > .5) {
      this.charles_buffer.push(new CharlesHead(this.ctx, this.canvas, this.charlesImg, this.charlesW, this.charlesH, this.DT));
    }
  }
  
  checkCollisions() {
    for (let i = 0; i < this.charles_buffer.length; i++) {
      if (this.player1.x < this.charles_buffer[i].x + this.charles_buffer[i].radius &&
        this.player1.x + this.player1.width > this.charles_buffer[i].x &&
        this.player1.y < this.charles_buffer[i].y + this.charles_buffer[i].radius &&
        this.player1.y + this.player1.height > this.charles_buffer[i].y) {
          this.charles_buffer.splice(i, 1);
  
          if ((this.player1.y + this.player1.height < this.canvas.nativeElement.height - this.charlesH + 5) && this.player1.vy > 0) { //collided from the top
            this.player1.can_double_jump = true;
            this.kill_count = this.kill_count + 1;
          } else {
            this.death_count = this.death_count + 1;
            this.kill_count--;
          }
  
      }
    }
  
    if (this.player1.y + this.player1.height == this.canvas.nativeElement.height) {
      this.player1.can_double_jump = false;
    }
  }
}

class Player implements PlayerInterface{
  ctx: CanvasRenderingContext2D;
  gumbyImg: CanvasImageSource = new Image();
  imgIsFlipped: boolean = false;

  rightPressed: boolean = false;
  leftPressed: boolean = false;
  spacePressed: boolean = false;

  height: number;
  width: number;

  canvasW: number;
  canvasH: number;

  x: number;
  y: number;

  vx: number = 0;
  vy: number = 0;

  ax: number = 0;
  ay: number = 0;

  can_double_jump: boolean = false;
  player_mass: number = .5;
  player_move_force: number = 700;
  player_friction: number = .5;
  air_friction: number = .2;
  player_jump: number = 600;
  gravity: number = 500;
  DT: number;

  constructor(ctx: CanvasRenderingContext2D, canvas: ElementRef<HTMLCanvasElement>, h: number, w: number, DT: number) {
    this.ctx = ctx;
    this.height = h;
    this.width = w;
    this.canvasW = canvas.nativeElement.width;
    this.canvasH = canvas.nativeElement.height;
    this.x = this.canvasW / 2;
    this.y = this.canvasH - this.height;
    this.DT = DT;
  }

	drawPlayer() {
    this.ctx.beginPath();
    this.ctx.save(); // Save the current state
    if (this.imgIsFlipped) {
      this.ctx.translate((this.x - this.width / 4) + ( this.width * 2 ) / 2, this.y + ( this.width * 2 ) / 2);
      this.ctx.scale(-1, 1);
      this.ctx.translate(-((this.x - this.width / 4) + ( this.width * 2 ) / 2), -(this.y + ( this.width * 2 ) / 2));
    }
    this.ctx.drawImage(this.gumbyImg, this.x - this.width / 4, this.y, this.width * 2, this.height);
    this.ctx.restore(); // Restore the last saved state
	  this.ctx.closePath();
	}

	movePlayer() {
		let friction_coeff = this.air_friction;
		let jump_vel = -this.vy;
		if (this.vy == 0) { // not moving in the vertical direction
			friction_coeff = this.player_friction; // only have friction when we are touching the ground
			jump_vel = this.player_jump; // you can only jump when you are touching the ground
		}

		//Set ax value based on keypress
		if (this.rightPressed && !this.leftPressed) {
			this.ax = (this.player_move_force - friction_coeff*this.vx)/this.player_mass;
		}

		else if (this.leftPressed && !this.rightPressed) {
			this.ax =(-this.player_move_force - friction_coeff*this.vx)/this.player_mass;
		} 

		else if ((this.leftPressed && this.rightPressed) || (!this.rightPressed && !this.leftPressed)) {

			this.ax = (-friction_coeff*this.vx)/this.player_mass;
		}

		if (this.spacePressed) {
			if (this.can_double_jump) {
				jump_vel = this.player_jump;
				this.can_double_jump = false;
			}
			this.vy = -jump_vel;
			this.ay = (-friction_coeff*this.vy + this.gravity)/this.player_mass;
		} else {
			this.ay = (-friction_coeff*this.vy + this.gravity)/this.player_mass;
		}

		this.vx = this.vx + 0.001*this.DT*this.ax;
    this.vy = this.vy + 0.001*this.DT*this.ay; //integrate!!

		this.x = this.x + 0.001*this.DT*this.vx;
    this.y = this.y + 0.001*this.DT*this.vy;

    let RIGHT_LIMIT = this.canvasW - this.width;
    let LEFT_LIMIT = 0;
    let BOTTOM_LIMIT = this.canvasH - this.height;
    let TOP_LIMIT = 0;

    if (this.x > RIGHT_LIMIT){
    this.vx = 0;
    this.x = RIGHT_LIMIT;
    }
    if (this.x < LEFT_LIMIT) {
      this.vx = 0;
      this.x = LEFT_LIMIT;
    }
    if (this.y < TOP_LIMIT){
      this.vy = 0;
      this.y = TOP_LIMIT;
    }
    if (this.y > BOTTOM_LIMIT) {
      this.vy = 0;
      this.y = BOTTOM_LIMIT;
    }
	}
}

class CharlesHead implements CharlesHeadInterface{
  ctx: CanvasRenderingContext2D;
  charlesImg: CanvasImageSource = new Image();
  charles_w: number;
  charles_h:number;

  max_charles_speed: number = 300;
  min_charles_speed: number = 150;
  radius: number;
  y: number;
  x: number;
  vx: number;
  DT: number;

  canvasW: number;
  canvasH: number;
  
	constructor(ctx: CanvasRenderingContext2D, canvas: ElementRef<HTMLCanvasElement>, img: CanvasImageSource, charles_w: number, charles_h: number, DT: number) {
    this.ctx = ctx;
    this.charlesImg = img;
    this.radius = Math.min(charles_w, charles_h);
    this.charles_w = charles_w;
    this.charles_h = charles_h;
    this.canvasW = canvas.nativeElement.width;
    this.canvasH = canvas.nativeElement.height;
		this.y = this.canvasH - this.charles_h;
		this.x =0;
    this.vx = 0;
    this.DT = DT;

		if (Math.random() > .5) { // Spawn on the left
			this.x = -3*this.radius;
			this.vx = Math.random() * (this.max_charles_speed - this.min_charles_speed) + this.min_charles_speed;
		} else { // spawn on the right
			this.x = this.canvasW + 3*this.radius;
			this.vx = -Math.random() * (this.max_charles_speed - this.min_charles_speed) - this.min_charles_speed;
		}
	}

	draw() {
	  this.ctx.beginPath();
		this.ctx.drawImage(this.charlesImg, this.x, this.y, this.charles_w, this.charles_h);
	  this.ctx.closePath();
	}

	move() {
		this.x = this.x + 0.001*this.DT*this.vx;
	}


}

