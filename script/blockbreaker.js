//--定数--//
const width = 500;
const height = 500;
const ballRad = 10;
const acceleX = 5;
const acceleY = 5;
const randomAccele = 2;
const drawInterval = 33;

let canvasElem = document.getElementById('canvas');		//	要素の取得
canvasElem.width = width;								//	キャンバスの横幅設定	
canvasElem.height = height;								//	キャンバスの縦幅設定
let canvasCtx = canvasElem.getContext("2d"); 			//	コンテキストを取得(設定とかをまとめたもの)

//--変数--//
let x = width / 2;
let y = height -30;
let dx = acceleX;
let dy = -acceleY;

//	毎秒33ミリ秒で更新
setInterval(draw,drawInterval);

//	初期化
function init(){
}

//	描画処理
function draw(){
	//	軌跡削除
	canvasCtx.clearRect(0,0,width,height);
	
	//	反射判定
	boundBall();
	
	//	描画
	drawBall();
	
	x += dx;
	y += dy;
}

//	ボール描画関数
function drawBall(){
	canvasCtx.beginPath();
	canvasCtx.arc(x,y,ballRad,0,Math.PI*2);
	canvasCtx.fillStyle = "#0095DD";
	canvasCtx.fill();
	canvasCtx.closePath();
}

//　ボール反射
function boundBall(){

	//	上下端
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
	}
	
	//	左右端
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
	}
}

//	乱数
//	getRandomInt(max)
//	max : 乱数の最大値(整数型)
//	return :　生成されたint型の乱数
function getRandomInt(max){
	return Math.floor(Math.random() * max);		//Math.floor : 与えられた数値以下の最大の整数を返すらしい。
}
