//--定数--//
//	ステージ
const width = 500;
const height = 500;

//	ボール関係
const ballRad = 10;		//	ボールの半径
const acceleX = 3;
const acceleY = 3;
const randomAccele = 2;	//	ランダムの加速度,バウンド時に加算
const speedLimit = 20;

//	パドル関係
const paddleHeight = 10;
const paddleWidth = 75;

//	更新レート(約30FPSで設定)
const drawInterval = 33;

//	キャンバスの設定
let canvasElem = document.getElementById('canvas');		//	要素の取得
canvasElem.width = width;								//	キャンバスの横幅設定	
canvasElem.height = height;								//	キャンバスの縦幅設定
let canvasCtx = canvasElem.getContext("2d"); 			//	コンテキストを取得(設定とかをまとめたもの)


//--グローバル変数--//
//	ボール
let x = width / 2;		//	ボールの初期位置(X軸)
let y = height -30;		//	ボールの初期位置(Y軸)
let dx = acceleX;		//	ボールの移動量(速度:X軸)
let dy = -acceleY;		//	ボールの移動量(速度:Y軸)

//	パドル
let paddleX = (canvasElem.width - paddleWidth) / 2;
let paddleY = canvasElem.height - paddleHeight;


//	毎秒33ミリ秒で更新
setInterval(gameLoop,drawInterval);
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

function update(){
	//	反射判定
	boundJudge();

	//	ボールの移動？
	x += dx;
	y += dy;

	//	変換
	x = Math.trunc(x);
	y = Math.trunc(y);
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
	canvasCtx.arc(x,y,ballRad,0,Math.PI*2);		//	ボールの描画
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
function boundJudge(){

	//	上下端判定 + ランダム加減速
	if(y + dy < ballRad || height - ballRad < y + dy){
		switch(getRandomInt(3)){
			case 1:
				dy += getRandomInt(randomAccele);
				break;
			case 2:
				dx += getRandomInt(randomAccele);
				break;
			case 3:
				dy += getRandomInt(randomAccele);
				dx += getRandomInt(randomAccele);
				break;
			case 0:
				dy *=1.1;
				dx *=1.1;
				break;
		}
		dy = -dy;
		setLimit(dy);
		Math.trunc(dy);
	}
	
	//	左右端判定 + ランダム加減速
	if(x + dx < ballRad || width - ballRad < x + dx){
		switch(getRandomInt(3)){
			case 1:
				dy += getRandomInt(randomAccele);
				break;
			case 2:
				dx += getRandomInt(randomAccele);
				break;
			case 3:
				dy += getRandomInt(randomAccele);
				dx += getRandomInt(randomAccele);
				break;
			case 0:
				dy *=1.1;
				dx *=1.1;
				break;
		}
		dx = -dx;
		setLimit(dx);
		Math.trunc(dx);
	}
}

//	乱数
//	getRandomInt(max)
//	max : 乱数の最大値(整数型)
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
	console.log("x : " + x);
	console.log("dx : " + dx);
	console.log("y : " + y);
	console.log("dy : " + dy);
}
