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





let station = [
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"},
  //{ id:7, code:"JE06", name:"名古屋駅"},
];

//http://localhost:8080/keiyo
app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db2', { data: station });
});




//http://localhost:8080/public/keiyo_add.html
app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push( newdata );
  res.redirect('/public/keiyo_add.html');
});


let character = [
  { id:1, code:"JE01", name:"太宰治"},
  { id:2, code:"JE07", name:"中原中也"},
  { id:3, code:"JE12", name:"森鴎外"},
  { id:4, code:"JE13", name:"夏目漱石"},
  { id:5, code:"JE14", name:"中島敦"},
  { id:6, code:"JE05", name:"国木田独歩"},
  { id:7, code:"JE06", name:"江戸川乱歩"},
];

//http://localhost:8080/izin
app.get("/izin", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db2', { data: character });
});






let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];

app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', {data: station2} );
});

app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_detail', {data: detail} );
});





app.listen(8080, () => console.log("Example app listening on port 8080!"));
