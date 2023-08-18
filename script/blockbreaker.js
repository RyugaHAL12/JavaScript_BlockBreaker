//--定数--//
const width = 500;
const height = 500;

let canvasElem = document.getElementById('canvas');		//	要素の取得
canvasElem.width = width;								//	キャンバスの横幅設定	
canvasElem.height = height;								//	キャンバスの縦幅設定
let canvasCtx = canvasElem.getContext("2d"); 			//	コンテキストを取得(設定とかをまとめたもの)

//--変数--//
let x = width / 2;
let y = height -30;
let dx = 2;
let dy = -2;


// //	四角形の描画
// canvasCtx.beginPath();									//	描画開始の命令
// canvasCtx.rect(20,40,50,50);							//	四角形を書く命令
// canvasCtx.fillStyle = "#FF0000";						//	四角形の色設定
// canvasCtx.fill();										//	描画する命令
// canvasCtx.closePath();									//	描画終了の命令

// //	円の描画
// canvasCtx.beginPath();
// canvasCtx.arc(240,160,20,0,Math.PI * 2,false);
// canvasCtx.fillStyle = 'green';
// canvasCtx.fill();
// canvasCtx.closePath();

// //	四角形の縁だけ描画
// canvasCtx.beginPath();
// canvasCtx.rect(160,10,100,40);
// canvasCtx.strokeStyle = "rbga(0,0,255,0.5)";
// canvasCtx.stroke();
// canvasCtx.closePath();

function draw(){
	
	//	描画
	canvasCtx.beginPath();
	canvasCtx.arc(x,y,10,0,Math.PI*2);
	canvasCtx.fillStyle = "#0095DD";
	canvasCtx.fill();
	canvasCtx.closePath();
	x += dx;
	y += dy;
}
setInterval(draw,33);
