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



app.get("/english", (req, res) => {
  res.send( "Good Morning" );
});

app.get("/france", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bonjour"});
});

app.get("/germany", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Guten Morgen"});
});



app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
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

app.get("/omikuji3", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  let comment = '';
  if( num==1 ) {
    luck = '大吉';
    comment = '絶好調です！';
  }
  else if( num==2 ) {
    luck = '中吉';
    comment = 'よいです！';
  }
  else if( num==3 ) {
    luck = '小吉';
    comment = 'まずです！';
  }
  else if( num==4 ) {
    luck = '吉';
    comment = 'まずまずです！';
  }
  else if( num==5 ) {
    luck = '末吉';
    comment = 'よくないです！';
  }
  else if( num==6 ) {
    luck = '凶';
    comment = 'あまり良くないです！';
  }
  

  res.render( 'omikuji3', {result:luck, comment:comment} );
  });

app.get("/janken", (req, res) => {
  const num = Math.floor( Math.random() * 3 + 1 );
  let luck = '';
  let comment = '';
  if( num==1 ) {
    luck = 'グー';
    comment = '絶好調です！';
  }
  else if( num==2 ) {
    luck = 'チョキ';
    comment = 'よいです！';
  }
  else if( num==3 ) {
    luck = 'パー';
    comment = '俺はパーを出した';
  }
  

  res.render( 'omikuji3', {result:luck, comment:comment} );
  });




app.listen(8080, () => console.log("Example app listening on port 8080!"));
