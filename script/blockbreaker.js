//--定数--//
//	ステージ
const width = 500;
const height = 500;

//	ボール関係
const ballRad = 10;		//	ボールの半径
const acceleX = 4;
const acceleY = 4;
const randomAccele = 3;	//	ランダムの加速度,バウンド時に加算
const speedLimit = 20;

//	パドル関係
const paddleHeight = 10;
const paddleWidth = 75;

//	更新レート(約30FPSで設定)
const updateInterval = 33;

//	キャンバスの設定
let canvasElem = document.getElementById('canvas');		//	要素の取得
canvasElem.width = width;								//	キャンバスの横幅設定	
canvasElem.height = height;								//	キャンバスの縦幅設定
let canvasCtx = canvasElem.getContext("2d"); 			//	コンテキストを取得(設定とかをまとめたもの)


//--グローバル変数--//
//	ボール
let ballX = width / 2;		//	ボールの初期位置(ballX軸)
let ballY = height -30;		//	ボールの初期位置(Y軸)
let ballDx = acceleX	//	ボールの移動量(速度:ballX軸)
let ballDy = -acceleY;		//	ボールの移動量(速度:Y軸)

//	パドル
let paddleX = (canvasElem.width - paddleWidth) / 2;
let paddleY = canvasElem.height - paddleHeight - 10;
let rightPressed = false;
let leftPressed = false;

//	イベントリスナー
document.addEventListener('keydown',keyDownHandler,false);
document.addEventListener('keyup',keyUpHandler,false);

//	毎秒33ミリ秒で更新
const interval = setInterval(gameLoop,updateInterval);
setInterval(debugSpeed,500);

//	初期化(未使用)
function init(){
}

//	描画処理
function gameLoop(){
	//	更新処理
	update();

	//	描画処理
	draw();
}

//	更新処理
function update(){
	//	パドルの移動
	updatePaddle();

	//	反射判定
	ballJudge();

	//	ボールの移動？
	ballX += ballDx;
	ballY += ballDy;

	//	変換
	ballX = Math.trunc(ballX);
	ballY = Math.trunc(ballY);
}

//	描画関数
function draw(){
	drawBall();
	drawPaddle();
}

//	ボール描画
function drawBall(){
	canvasCtx.clearRect(0,0,width,height);		//	軌跡削除
	canvasCtx.beginPath();						//	ボール描画開始
	canvasCtx.arc(ballX,ballY,ballRad,0,Math.PI*2);		//	ボールの描画
	canvasCtx.fillStyle = "#0095DD";			//	ボールの色設定	
	canvasCtx.fill();							//	ボールの塗りつぶし
	canvasCtx.closePath();						//	描画終了
}

//	パドル描画
function drawPaddle(){
	canvasCtx.beginPath();
	canvasCtx.rect(paddleX,paddleY,paddleWidth,paddleHeight);
	canvasCtx.fillStyle = "#0095DD";
	canvasCtx.fill();
	canvasCtx.closePath;
}

//　ボール反射判定
function ballJudge(){

	//	ゲームオーバー判定
	if(canvasElem.height + 20 < ballY + ballDy){
		alert('Game Over');
		document.location.reload();
		clearInterval(interval);	//	Needed for Chrome to end game
	}
	
	//	パドルの当たり判定
	boundPaddle();

	//	壁の当たり判定
	boundWall();

}


//	壁の当たり判定
function boundWall(){
		//	上端 + ランダム加減速
		if(ballY + ballDy < ballRad){
			switch(getRandomInt(3)){
				case 1:
					ballDx += getRandomInt(randomAccele);
					break;
				case 2:
					ballDy += getRandomInt(randomAccele);
					break;
				case 3:
					ballDx += getRandomInt(randomAccele);
					ballDy += getRandomInt(randomAccele);
					break;
				case 0:
					ballDx *=1.1;
					ballDy *=1.1;
					break;
			}

			ballDy = -ballDy;
			setLimit(ballDy);
			Math.trunc(ballDy);
		}
		
		//	左右端判定 + ランダム加減速
		if(ballX + ballDx < ballRad || width - ballRad < ballX + ballDx){
			switch(getRandomInt(3)){
				case 1:
					ballDy += getRandomInt(randomAccele);
					break;
				case 2:
					ballDx += getRandomInt(randomAccele);
					break;
				case 3:
					dy += getRandomInt(randomAccele);
					ballDx += getRandomInt(randomAccele);
					break;
				case 0:
					ballDy *=1.1;
					ballDx *=1.1;
					break;
			}
			ballDx = -ballDx;
			setLimit(ballDx);
			Math.trunc(ballDx);
		}
}

//	パドルの当たり判定
function boundPaddle(){
	console.log('called bound Paddle');
	if(paddleY - (paddleHeight / 2) < ballY + (ballRad / 2)){
		if(paddleX <= ballX && ballX <= paddleX + paddleWidth){
			ballDy = -ballDy;
			setLimit(ballDy);
			Math.trunc(ballDy);
		}
		
	}
}

//	乱数
//	getRandomInt(maballX)
//	maballX : 乱数の最大値(整数型)
//	return :　生成されたint型の乱数
function getRandomInt(max){
	return Math.floor(Math.random() * max);		//Math.floor : 与えられた数値以下の最大の整数を返すらしい。
}

//	速度制御用関数
function setLimit(speed){
	if(speedLimit < speed)
		return speedLimit;
	else if(speed < 0)
		return acceleX;
	else
		return speed;
}

//	速度デバッグ用
function debugSpeed(){
	console.log("ballX : " + ballX);
	console.log("ballDx : " + ballDx);
	console.log("ballY : " + ballY);
	console.log("ballDy : " + ballDy);
}

//	イベントハンドラー(パドル操作用)
function keyDownHandler(event){
	if(event.key == "Right" || event.key == "ArrowRight"){
		rightPressed = true;
	}else if(event.key == "Left" || event.key == "ArrowLeft"){
		leftPressed = true;
	}
}

function keyUpHandler(event){
	if(event.key == "Right" || event.key == "ArrowRight"){
		rightPressed = false;
	}else if(event.key == "Left" || event.key == "ArrowLeft"){
		leftPressed = false;
	}
}

//	パドル移動
function updatePaddle(){
	if(rightPressed){
		paddleX = Math.min(paddleX + 7,canvasElem.width - paddleWidth);
	}else if(leftPressed){
		paddleX = Math.max(paddleX - 7,0);
	}
}