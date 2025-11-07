const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  else if( num==3 ) luck = '小吉';
  else if( num==4 ) luck = '末吉';
  else if( num==5 ) luck = '凶';
  else luck = '大凶';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});




//app.get("/janken2", (req, res) => {
//  let hand = req.query.hand;
//  let win = Number( req.query.win );
//  let total = Number( req.query.total );
//  console.log( {hand, win, total});
//  const num = Math.floor( Math.random() * 3 + 1 );
//  let cpu = '';
//  let judgement = '';
//  if( num==1 ) cpu = 'グー';
//  else if( num==2 ) cpu = 'チョキ';
//  else cpu = 'パー';
//  // ここに勝敗の判定を入れる
//  // 以下の数行は人間の勝ちの場合の処理なので，
//  // 判定に沿ってあいこと負けの処理を追加する
//  judgement = '勝ち';
//  win += 1;
//  total += 1;
//  const display = {
//    your: hand,
//    cpu: cpu,
//    judgement: judgement,
//    win: win,
//    total: total
//  }
//  res.render( 'janken', display );
//});





app.get("/janken2", (req, res) => {
  let hand = req.query.hand; // ユーザーの手 (例: 'guu', 'choki', 'paa')
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});

  // 1. CPUの手を決定 (1:グー, 2:チョキ, 3:パー)
  const num = Math.floor( Math.random() * 3 ) + 1; // 0-2 + 1 で 1-3
  let cpu = '';
  if( num === 1 ) cpu = 'グー';
  else if( num === 2 ) cpu = 'チョキ';
  else cpu = 'パー';

  let judgement = '';

  if (hand === cpu) {
     // あいこ の場合
     judgement = 'あいこ';
     total += 1;
   } else if (
     (hand === 'グー' && cpu === 'チョキ') ||
     (hand === 'チョキ' && cpu === 'パー') ||
     (hand === 'パー' && cpu === 'グー')
   ) {
     // 勝ち の場合
     judgement = '勝ち';
     win += 1;   // 勝利数を増やす
     total += 1; // 対戦回数を増やす
   } else {
     // 負け の場合
     judgement = '負け';
     total += 1; // 対戦回数を増やす
   }

  // 6. 表示用データを構成
  const display = {
    your: hand, // 表示のため日本語に変換したものを使う
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }

  res.render( 'janken', display );
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));
