//expressモジュールをアプリケーションに追加
express = require('express');
// //インスタンスの生成
app = express();

//静的ファイル(JSファイル)の読み込み
app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//ブランチがdevelopなのでポート番号は3000を設定する
app.set('port', 3000);

//ejsの設定
app.set('view engine','ejs');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// app.use(express.cookieParser);

//routeモジュールをアプリケーションに追加
const usersRouter = require('./routes/users.js');
app.use('/users', usersRouter);

//routeモジュールをアプリケーションに追加
const postsRouter = require('./routes/posts.js');
app.use('/posts', postsRouter);

//クライアントから送られてきたデータをオブジェクトで扱えるように変換。
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.listen(app.get('port'), () => {
    console.log(`Server is listening on port number:${app.get('port')}`);
});

