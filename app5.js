"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));



// ------------------------------------------
// (1) 名古屋観光地紹介システム
// ------------------------------------------
let nagoyaList = [
  { id: 1, name: "大須商店街", address: "〒460-0011 名古屋市中区大須2丁目～3丁目", summary: "「愛知の秋葉原」とも称される、約1,200店舗が軒を連ねる活気ある商店街。最新グルメから古着、サブカルチャーまで新旧が入り混じり、雨の日でも安心なアーケードで一日中楽しめる。名古屋随一の「食べ歩きの聖地」としても有名。", point: "食べ歩き・ショッピング" },
  { id: 2, name: "名古屋城", address: "〒460-0032 名古屋市中区本丸1-1", summary: "金のシャチホコを頂く天守閣と、豪華絢爛に復元された「本丸御殿」が最大の見どころ。城周辺には「金シャチ横町」があり、新旧の名古屋めしを満喫できる。春は桜、秋は紅葉の名所としても知られる名古屋のランドマーク。", point: "歴史・金シャチ" },
  { id: 3, name: "熱田神宮", address: "〒456-8585 名古屋市熱田区神宮１丁目１−１", summary: "三種の神器「草薙神剣」を祀る由緒ある神社。静寂な森に囲まれた境内には「信長塀」などの史跡や、宝物を展示する「草薙館」がある。2024年には名鉄神宮前駅に商業施設「あつたnagAya」がオープンし、参拝後のグルメも充実。", point: "歴史・三種の神器" },
  { id: 4, name: "東山動植物園", address: "〒464-0804 名古屋市千種区東山元町３丁目７０", summary: "約60haの広大な敷地に動物約500種・植物約7,000種を擁する総合公園。イケメンゴリラ「シャバーニ」やコアラが人気。隣接する「東山スカいたワー」からは夜景も楽しめ、家族連れからデートまで一日中満喫できるスポット。", point: "動物園・植物園" },
  { id: 5, name: "名古屋港水族館", address: "〒455-0033 名古屋市港区港町１−３", summary: "日本最大級のメインプールで行われるダイナミックなイルカショーは必見。シャチの公開トレーニングが見られる数少ない水族館であり、マイワシのトルネードやペンギンなど、南館・北館で世界中の海の生き物に癒やされる。", point: "水族館・イルカショー" },
  { id: 6, name: "名古屋市科学館", address: "〒460-0008 名古屋市中区栄２丁目１７−１ 芸術と科学の杜・白川公園内", summary: "ギネス認定の世界最大級プラネタリウム「Brother Earth」が目印。限りなく本物に近い星空を体験できるほか、マイナス30度の「極寒ラボ」や高さ9mの「人工竜巻」など、驚きの大型展示で科学の不思議を体感できる。", point: "科学・教育" },
  { id: 7, name: "オアシス21", address: "〒461-0005 名古屋市東区東桜１丁目１１−１", summary: "栄エリアのシンボル「水の宇宙船」と呼ばれるガラスの大屋根が特徴。空中回廊を散策でき、夜のライトアップはフォトジェニックな美しさ。下層にはショップやバスターミナルがあり、癒やしと賑わいが融合する立体型公園。", point: "イベント・ショッピング" },
  //{ id: 8, name: "ミッドランドスクエア", address: "〒450-0002 名古屋市中村区名駅４丁目７−１", summary: "名古屋駅前にそびえる超高層ビル。屋外展望台「スカイプロムナード」からは名古屋の街並みを360度一望でき、夜景スポットとして人気。館内には高級ブランドやシネマ、レストランが入り、ラグジュアリーな時間を過ごせる。", point: "イベント・映画・展望台" },
];

// 一覧
app.get("/nagoya", (req, res) => {
  res.render('nagoya', { data: nagoyaList });
});

// Create新規登録画面 (GET)http://localhost:8080/public/nagoya_new.html
app.get("/nagoya/create", (req, res) => {
  res.redirect('/public/nagoya_new.html');
});

// Create新規登録処理 (POST)
app.post("/nagoya", (req, res) => {
  const id = nagoyaList.length + 1;
  const name = req.body.name;
  const address = req.body.address;
  const summary = req.body.summary;
  const point = req.body.point;
  nagoyaList.push({ id: id, name: name, address: address, summary: summary, point: point });
  console.log( nagoyaList );
  res.render('nagoya', { data: nagoyaList });
});

// Read詳細表示
app.get("/nagoya/:number", (req, res) => {
  const num = req.params.number;
  const detail = nagoyaList[num];
  res.render('nagoya_detail', { index: num, data: detail });
});

// Edit　編集画面 (GET)
app.get("/nagoya/edit/:number", (req, res) => {
  const num = req.params.number;
  const detail = nagoyaList[num];
  res.render('nagoya_edit', { index: num, data: detail });
});

// Update　更新処理 (POST)
app.post("/nagoya/update/:number", (req, res) => {
  const num = req.params.number;
  nagoyaList[num].name = req.body.name;
  nagoyaList[num].address = req.body.address;
  nagoyaList[num].summary = req.body.summary;
  nagoyaList[num].point = req.body.point;
  console.log( nagoyaList );
  res.redirect('/nagoya');
});

// Delete　削除処理
app.get("/nagoya/delete/:number", (req, res) => {
  nagoyaList.splice(req.params.number, 1);
  res.redirect('/nagoya');
});

// ------------------------------------------
// (2) ワンピースストーリー紹介システム
// ------------------------------------------
let onepieceList = [
  { id: 1, name: "東の海(イーストブルー)編", episodes: "1-61話", summary: "海賊王を目指す少年ルフィがフーシャ村を出航。ゾロ、ナミ、ウソップ、サンジという信頼できる仲間を集めながら、バギーやクロ、首領・クリーク、そして魚人アーロンといった強敵を倒し、伝説の海「偉大なる航路」への切符を手に入れる。", point: "ルフィが初めて仲間を集めていく過程" },
  { id: 2, name: "アラバスタ編", episodes: "62-130話", summary: "王女ビビを故郷へ送り届けるため砂漠の国アラバスタへ。国を乗っ取ろうと画策する王下七武海クロコダイルと秘密犯罪会社バロックワークスに対し、ルフィたちはビビと国を守るため、総力戦を挑む。", point: "ビビと一味の絆" },
  { id: 3, name: "空島編", episodes: "144-195話", summary: "上空1万メートルにある伝説の「空島」へ到達。そこは神・エネルが支配する土地だった。ルフィは黄金郷の鐘を鳴らすため、雷の力を持つエネルとの相性をも覆す激闘に挑む。", point: "誰も見たことのない「空の島」への冒険" },
  { id: 4, name: "デービーバックファイト編", episodes: "207-228話", summary: "仲間を賭けた海賊たちのゲーム「デービーバックファイト」をフォクシー海賊団と行うことに。卑怯な手を使うフォクシーに対し、ルフィたちは知恵とチームワークで対抗し、奪われた仲間を取り戻す。", point: "仲間を賭けたコミカルかつ熱い競技対決" },
  { id: 5, name: "ウォーターセブン編", episodes: "229-263話", summary: "水の都でメリー号が航海不能と宣告される。ウソップとの決闘やロビンの突然の裏切りで一味が崩壊の危機に瀕する中、政府の諜報機関CP9の暗躍が明らかになり、ルフィたちは真実を求めて海列車を追う。", point: "一味崩壊の危機と深まる謎" },
  { id: 6, name: "エニエス・ロビー編", episodes: "264-325話", summary: "連行されたロビンを奪還するため、世界政府の司法の島へ殴り込みをかける。世界を敵に回してでも仲間を守る決意を示し、CP9と全面対決。ルフィは新技「ギア」を発動し、最後はメリー号が奇跡の救出に現れる。", point: "世界政府への宣戦布告とメリー号との別れ" },
  { id: 7, name: "スリラーバーク編", episodes: "337-381話", summary: "魔の三角地帯で七武海モリアと遭遇し、影を奪われてしまう。夜明けと共に消滅するタイムリミットが迫る中、将軍ゾンビや巨人のオーズと対決。新たな仲間ブルックと共に影を取り戻す戦いに挑む。", point: "一味全員で１人の敵との戦闘" },
  { id: 8, name: "シャボンディ諸島編", episodes: "382-405話", summary: "魚人島へ向かう中継地で、ルフィが天竜人を殴ったことにより海軍大将黄猿が出動。圧倒的な戦力差に加え、バーソロミュー・くまの能力によって、一味は為す術なく世界各地へバラバラに飛ばされてしまう。", point: "圧倒的な戦力差に直面する一味の運命" },
  { id: 9, name: "女々島アマゾン・リリー編", episodes: "408-421話", summary: "男子禁制の島に飛ばされたルフィは、海賊女帝ハンコックと出会う。武武による処刑の危機を乗り越え、その器の大きさでハンコックを魅了。そこで兄エースの公開処刑の報せを聞き、ルフィは単身救出へ向かう。", point: "女帝ハンコックとルフィの出会い" },
  { id: 10, name: "大監獄インペルダウン編", episodes: "422-458話", summary: "エースを救うため海底監獄へ潜入。バギーやMr.2、ジンベエ、クロコダイルらかつての敵や新たな味方と共闘し、署長マゼランの猛毒に侵されながらも、奇跡的な回復力で脱獄を目指す。", point: "かつての敵との共闘と「オカマ道」" },
  { id: 11, name: "マリンフォード頂上戦争編", episodes: "459-516話", summary: "海軍本部にて、白ひげ海賊団対海軍・七武海の頂上戦争が勃発。ルフィは戦場を駆け抜けエースの手錠を外すが、赤犬の攻撃からルフィを庇いエースは命を落とす。兄の死に精神崩壊するルフィをジンベエが支える。", point: "世界最高峰の戦力同士がぶつかる大戦争とその結末" },
  { id: 12, name: "魚人島編", episodes: "517-574話", summary: "2年間の修行を経て再集結した一味は、海底1万メートルの魚人島へ。人間への復讐を企むホーディ・ジョーンズ率いる新魚人海賊団のクーデターを阻止し、島に根付く根深い差別や過去の因縁を断ち切る。", point: "成長した一味の力" },
  { id: 13, name: "パンクハザード編", episodes: "579-628話", summary: "炎と氷の島でトラファルガー・ローと同盟を結成し、四皇カイドウ打倒の作戦を開始。シーザー・クラウンによる子供たちの巨大化実験や殺戮兵器シノクニの脅威を退け、人造悪魔の実SMILEの製造を阻止する。", point: "海賊同盟の結成" },
  { id: 14, name: "ドレスローザ編", episodes: "629-746話", summary: "ドフラミンゴが支配する国で、メラメラの実を巡る闘技大会に参戦。死んだはずのサボとの再会を果たし、ルフィはギア4「バウンドマン」を発動。鳥カゴによる国中の殺戮を止めるためドフラミンゴを撃破する。", point: "ルフィの新技とある再会" },
  { id: 15, name: "ゾウ編", episodes: "751-779話", summary: "巨大な象の背中に栄えるミンク族の国へ。カイドウの部下ジャックに滅ぼされた国で、侍を守り抜いたミンク族の絆を知る。そこでサンジがビッグ・マムの娘との政略結婚のために連れ去られたことが判明する。", point: "ミンク族の絆とサンジ失踪" },
  { id: 16, name: "ホールケーキアイランド編", episodes: "783-877話", summary: "サンジを奪還するためビッグ・マムのナワバリへ。政略結婚を強いられたサンジの本心を引き出し、結婚式を破壊する。最強の将星カタクリとの死闘を制し、ジンベエの援護を受けながら決死の脱出を果たす。", point: "四皇の縄張りでの極限の奪還作戦" },
  { id: 17, name: "世界会議(レヴェリー)編", episodes: "878-889話", summary: "4年に一度の世界会議が開催。各国の王族が集まる裏で、革命軍が天竜人への宣戦布告を画策。七武海制度の撤廃や、謎の存在「イム様」の登場など、世界の均衡を揺るがす重大な事実が次々と動き出す。", point: "世界情勢の大きなうねりと革命軍の動き" },
  { id: 18, name: "ワノ国編", episodes: "890-1088話", summary: "鎖国国家ワノ国で、カイドウとオロチの支配からの解放を目指す。討ち入りの夜、最悪の世代と侍たちが四皇二人の同盟に挑む。ルフィは「ニカ」として覚醒し、最強生物カイドウとの死闘に勝利する。", point: "侍たちの悲願と四皇カイドウ、ビックマムとの総力戦" },
  { id: 19, name: "エッグヘッド編", episodes: "1089話〜", summary: "未来島エッグヘッドで天才科学者ベガパンクと遭遇。「空白の100年」に触れたことで政府に命を狙われる彼を助けるため、海軍大将黄猿や五老星、CP0との混戦に挑む。くまの悲しき過去と世界の真実が明かされる。", point: "明かされる世界の秘密と科学者ベガパンク" },
];

// 一覧
app.get("/onepiece", (req, res) => {
  res.render('onepiece', { data: onepieceList });
});

// Create新規登録画面 (GET)
app.get("/onepiece/create", (req, res) => {
  res.redirect('/public/onepiece_new.html');
});

// Create新規登録処理 (POST)
app.post("/onepiece", (req, res) => {
  const id = onepieceList.length + 1;
  const name = req.body.name;
  const episodes = req.body.episodes; 
  const summary = req.body.summary;
  const point = req.body.point;
  onepieceList.push({ id: id, name: name, episodes: episodes, summary: summary, point: point });
  console.log( onepieceList );
  res.render('onepiece', { data: onepieceList });
});

// Read詳細表示
app.get("/onepiece/:number", (req, res) => {
  const num = req.params.number;
  const detail = onepieceList[num];
  res.render('onepiece_detail', { index: num, data: detail });
});

// Edit　編集画面 (GET)
app.get("/onepiece/edit/:number", (req, res) => {
  const num = req.params.number;
  const detail = onepieceList[num];
  res.render('onepiece_edit', { index: num, data: detail });
});

// Update　更新処理 (POST)
app.post("/onepiece/update/:number", (req, res) => {
  const num = req.params.number;
  onepieceList[num].name = req.body.name;
  onepieceList[num].episodes = req.body.episodes;
  onepieceList[num].summary = req.body.summary;
  onepieceList[num].point = req.body.point;
  console.log( onepieceList );
  res.redirect('/onepiece');
});

// Delete　削除処理
app.get("/onepiece/delete/:number", (req, res) => {
  onepieceList.splice(req.params.number, 1);
  res.redirect('/onepiece');
});

// ------------------------------------------
// (3) コナン映画紹介システム（怪盗キッド登場回）
// ------------------------------------------
let conanList = [
  { id: 1, name: "世紀末の魔術師", year: "1999年", summary: "怪盗キッドからインペリアル・イースター・エッグを狙う予告状が届く。コナンと服部平次が警備にあたる中、キッドはエッグを盗み出すが何者かに狙撃されてしまう。その後、エッグを運ぶ船の中で殺人事件が発生し、被害者の右目が撃ち抜かれる。", point: "コナンの正体に迫る緊迫感" },
  { id: 2, name: "銀翼の奇術師(マジシャン)", year: "2004年", summary: "舞台女優が持つ「運命の宝石」スターサファイアを狙うキッドから予告状が届く。小五郎とコナンは劇場で張り込むが、そこに新一に変装したキッドが大胆にも現れる。その後、函館へ向かう機内で殺人事件が発生し、さらにパイロットが操縦不能となる事態に陥る。", point: "上空1万フィートでの密室殺人と着陸パニック" },
  { id: 3, name: "探偵たちの鎮魂歌(レクイエム)", year: "2006年", summary: "謎の依頼人から横浜のホテルに招待されたコナンと小五郎たち。しかし、蘭や少年探偵団を人質に取られ、12時間以内に事件を解決しなければ爆発するIDを付けられてしまう。コナンは服部平次や怪盗キッドとも関わりながら、制限時間内に謎を解くため奔走する。", point: "人質を取られた極限状態でのオールスター推理" },
  { id: 4, name: "天空の難破船(ロストシップ)", year: "2010年", summary: "鈴木次郎吉が怪盗キッドに挑戦状を叩きつけ、世界最大の飛行船ベルツリー号に収めた宝石「天空の貴婦人」を狙わせる。キッドから宝石を守るためコナン一行も招待されるが、その飛行船にはテロリスト「赤いシャムネコ」が侵入し、細菌兵器の脅威に晒される。", point: "飛行船という密室でのテロ攻防と共闘アクション" },
  { id: 5, name: "業火の向日葵", year: "2015年", summary: "ニューヨークのオークション会場で、かつて日本で焼失したはずのゴッホの名画「ひまわり」が史上最高額で落札される。その目的は世界に散らばる7枚の「ひまわり」を集め、日本の美術館「レイクロック」で展示することだった。そこへ、巨大宝石しか狙わないはずの怪盗キッドが絵を奪うと宣言する。", point: "燃え盛る美術館での脱出劇" },
  { id: 6, name: "紺青の拳(フィスト)", year: "2019年", summary: "19世紀末にシンガポールの海底に沈んだとされる伝説の秘宝「紺青の拳」を現地の富豪が回収しようとした矢先、マリーナベイ・サンズで殺人事件が発生。現場には怪盗キッドの血塗られた予告状が残されていた。コナンはキッドの策略で強制的にシンガポールへ連れ出され、アーサー・ヒライとして行動を共にする。伝説の秘宝「ブルーサファイア」を巡り、最強の空手家・京極真とキッドが激突。マリーナベイ・サンズ崩壊の危機に3人が立ち向かう。", point: "コナンと怪盗キッドの最強タッグ＋京極真の圧倒的強さと可愛い園子" },
  { id: 7, name: "１００万ドルの五稜星(みちしるべ)", year: "2024年", summary: "北海道・函館にある斧江財閥の収蔵庫に、幕末の志士・土方歳三ゆかりの日本刀を狙うキッドからの予告状が届く。現地を訪れていた服部平次とコナンがキッドの阻止に動く中、刀に隠された重大な秘密と、キッドの出生に関わる衝撃の真実が明らかになる。", point: "平次vsキッドのバトルと衝撃の真実" },
];

// 一覧
app.get("/conan", (req, res) => {
  res.render('conan', { data: conanList });
});

// Create
app.get("/conan/create", (req, res) => {
  res.redirect('/public/conan_new.html');
});

// Create新規登録処理 (POST)
app.post("/conan", (req, res) => {
  const id = conanList.length + 1;
  const name = req.body.name;
  const year = req.body.year; // year -> episodes
  const summary = req.body.summary;
  const point = req.body.point;
  conanList.push({ id: id, name: name, year: year, summary: summary, point: point });
  console.log( conanList );
  res.render('conan', { data: conanList });
});

// Read詳細表示
app.get("/conan/:number", (req, res) => {
  const num = req.params.number;
  const detail = conanList[num];
  res.render('conan_detail', { index: num, data: detail });
});

// Edit　編集画面 (GET)
app.get("/conan/edit/:number", (req, res) => {
  const num = req.params.number;
  const detail = conanList[num];
  res.render('conan_edit', { index: num, data: detail });
});

// Update　更新処理 (POST)
app.post("/conan/update/:number", (req, res) => {
  const num = req.params.number;
  conanList[num].name = req.body.name;
  conanList[num].year = req.body.year; 
  conanList[num].summary = req.body.summary;
  conanList[num].point = req.body.point;
  console.log( conanList );
  res.redirect('/conan');
});

// Delete　削除処理
app.get("/conan/delete/:number", (req, res) => {
  conanList.splice(req.params.number, 1);
  res.redirect('/conan');
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

// 一覧
app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', {data: station2} );
});

// Create,http://localhost:8080/public/keiyo2_new.html
app.get("/keiyo2/create", (req, res) => {
  res.redirect('/public/keiyo2_new.html');
});

// Read
app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_detail', {id: number, data: detail} );
});

// Delete
app.get("/keiyo2/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2.splice( req.params.number, 1 );
  res.redirect('/keiyo2' );
});

// Create
app.post("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = station2.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const change = req.body.change;
  const passengers = req.body.passengers;
  const distance = req.body.distance;
  station2.push( { id: id, code: code, name: name, change: change, passengers: passengers, distance: distance } );
  console.log( station2 );
  res.render('keiyo2', {data: station2} );
});

// Edit
app.get("/keiyo2/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_edit', {id: number, data: detail} );
});

// Update
app.post("/keiyo2/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2[req.params.number].code = req.body.code;
  station2[req.params.number].name = req.body.name;
  station2[req.params.number].change = req.body.change;
  station2[req.params.number].passengers = req.body.passengers;
  station2[req.params.number].distance = req.body.distance;
  console.log( station2 );
  res.redirect('/keiyo2' );
});



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

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
