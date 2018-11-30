/*
1.文字列をカウントする
2.ツリーの真ん中を決める
3.てっぺんの☆を飾り付ける
4.モミの木を葉を文字列で彩る
5.頑丈な幹を作る
6.しっかりとした鉢に植える
7.そっとプレゼントを忍ばせる
*/

//ツリーの段数を割り出す
var rowcount = function(count) {
    var n= 1;
    while(n*(n + 1) < count){n++;}
    return n;
}
//文字幅のカウント
var widthcount = function (str) {
    var len = 0;
    var ch = "";
    for (var i = 0; i < str.length; i++) {
      ch = str.substring(i, i + 1);
      if ((ch.match(/^[^\x01-\x7E\xA1-\xDF]+$/))
      　|| (ch.match(/^[\u2700-\uff65]+$/))){
          len += 2;
      }
      else {
          len += 1;
      }
    }
    return len;
}
//指定文字幅分の文字を返す
var widthstring = function (str, count) {
    var wstr = "";
    var len = 0;
    var ch = "";
    for (var i = 0; i < str.length; i++) {
      ch = str.substring(i, i + 1);
      if ((ch.match(/^[^\x01-\x7E\xA1-\xDF]+$/))
        　|| (ch.match(/^[\u2700-\uff65]+$/))){
           len += 2;
      }
      else{
          len += 1;
      }
      wstr += ch;
      if (len >= count) {
          return wstr;
      }
    }
    if (len < count) {
        wstr += " ".repeat(count - len);
    }
    return wstr;
}

var text = "なんということでしょ～  何の変哲もない文字列がクリスマスの装いに早変わり";
console.log('元の文字列：' + text);

var treeText = "";

var textBytes = text.length;
var textWidth = widthcount(text);

//短い文章用
if (textWidth < 20){
    text += " ".repeat(20 - textWidth);
    textWidth = widthcount(text);
    textBytes = Buffer.byteLength(text);;
}
var rowCountMax = rowcount(textWidth);
var rowWidthMax = rowCountMax*2 + 4;//"彡"+"ミ"
var spaceCount = 0;

//star part
var star = "☆";
spaceCount = rowCountMax+1;
treeText = " ".repeat(spaceCount) + star + "\n";

//tree part
var line = "";
var currentPos = 0;

for(var i = 1; i <= rowCountMax; i++) {
    spaceCount = (rowWidthMax - i * 2 - 4)/2;
    treeText += " ".repeat(spaceCount) + '彡';

    if (currentPos + i > textBytes) {
        line = widthstring(text.substring(currentPos,currentPos + (textBytes - currentPos)) + " ".repeat((i - (textBytes - currentPos))*2), i * 2);
    }
    else {
        line = widthstring(text.substring(currentPos,currentPos + i * 2), i * 2);
    }
    treeText += line;
    if (widthcount(line) > i * 2) {
        treeText += "ﾐ\n";    
    }
    else {
        treeText += "ミ\n";
    }

    currentPos = currentPos + line.length;
}

//trunk part
var trunk = "||||"
spaceCount = (rowWidthMax - 4)/2;
treeText += " ".repeat(spaceCount) + trunk + "\n";
//pot part
var trunk = "|□□□□□□|"
spaceCount = (rowWidthMax - 4)/2 - 2;
treeText = treeText + " ".repeat(spaceCount) + trunk + "\n";
var present = "▥"
spaceCount = (rowWidthMax - 4)/2 - 2;
treeText += " ".repeat(spaceCount) + trunk + " ".repeat(spaceCount/2) + present;

console.log('整形した文字列\n' +　treeText);