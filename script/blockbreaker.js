const width = 500;
const height = 500;

let canvasElem = document.getElementById('canvas');		//	要素の取得
canvasElem.width = width;								//	キャンバスの横幅設定	
canvasElem.height = height;								//	キャンバスの縦幅設定
let canvasCtx = canvasElem.getContext("2d"); 			//	コンテキストを取得(設定とかをまとめたもの)

//	四角形の描画
canvasCtx.beginPath();									//	描画開始の命令
canvasCtx.rect(20,40,50,50);							//	四角形を書く命令
canvasCtx.fillStyle = "#FF0000";						//	四角形の色設定
canvasCtx.fill();										//	描画する命令
canvasCtx.closePath();									//	描画終了の命令