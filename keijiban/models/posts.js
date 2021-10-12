express = require('express');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const users = require("./users.js");

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  host: 'mysql',
  database: 'mysql_db',
  username: 'root',
  password: 'password',
  dialect: 'mysql'
});

const Post = sequelize.define('posts', {
  id: {
    allowNull: false,
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    allowNull: false,
    type: Sequelize.STRING
  },
  content: {
    allowNull: false,
    type: Sequelize.STRING
  },
  userId: {
    allowNull: false,
    references: {
        model: 'users',
        key: 'id'
      },
    type: Sequelize.INTEGER
  },
},{
  timestamps: true,
  freezeTableName: true
});
Post.associate = function(User) {
  Post.belongsTo(User 
    , {
    foreignKey: 'userId',
    targetKey: 'id'
  });
}

module.exports = {
  //投稿を一件取得
  select: async (req, res) => {
    try{
      const Post = await sequelize.query(
        `select id, title, content from posts where id = :board_id`,
        {
          replacements: { board_id: req.params.id },
          type: sequelize.QueryTypes.SELECT
        }
      );
      return Post;
    }
    catch (error) {
      console.log(error);
    }
  },
  //投稿を全件取得
  selectAll: async (req, res) => {
    try{
        //f.userId as flgLikeがNULLだとユーザーはいいねしていない。f.likesCountはいいねの件数。
              let strSQL = 'select e.id, e.title, e.content, e.userId, e.name, e.email, '
         strSQL = strSQL + 'e.password ,e.createdAt, e.updatedAt, f.likesCount, f.userId as flgLike '
         strSQL = strSQL + 'from '
         strSQL = strSQL + '(select a.id, a.title, a.content, a.userId, a.createdAt, a.updatedAt, b.name, b.email, b.password '
         strSQL = strSQL + 'from posts as a left join users as b on a.userId = b.id) as e '
         strSQL = strSQL + 'left join '
         strSQL = strSQL + '(select c.postId, c.likesCount, d.userId from'
         strSQL = strSQL + '(select  postId, count(*) as likesCount from likes group by postId) as c '
         strSQL = strSQL + 'left join '
         strSQL = strSQL + '(select postId, userId from likes where userId = ' + getUserId(req) + ') as d '
         strSQL = strSQL + 'on c.postId = d.postId) as f '
         strSQL = strSQL + 'on e.id = f.postId'
        const Posts = await sequelize.query(strSQL);
        return Posts;
    }
    catch (error) {
        console.log(error);
    }
  },
  //投稿を一件作成
  insert: async (req, res) => {
    try{
      const Posts = await Post.create({
        title : req.body.title,
        content : req.body.content,
        //cookieよりユーザーIDを取得する関数を呼び出す
        userId : getUserId(req)
      });
    }
    catch (error) {
      console.log(error);
    }
  },
  //投稿を更新
  update: async (req, res) => {
    try{
        const Posts = await Post.update(
        { title: req.body.title, content: req.body.content, updatedAt : req.body.updatedAt },
        { where: { id: req.params.id } }
        );
    }
    catch (error) {
      console.log(error);
    }
  },
  //投稿を削除
    delete: async (req, res) => {
    try{
        await Post.destroy({where:{ 
            id : req.params.id
          }});
    }
    catch (error) {
      console.log(error);
    }
  },
}

function getUserId(req) {
  //idを格納する変数
  let id = '';
  //cookie（複数）を取得
  const cookies = req.headers.cookie;
  //cookie（複数）を区切り文字;で分割して配列に格納する
  const cookiesArray = cookies.split(';');
  //ループ処理でcookie（単体）を取り出す
  for(let cookie of cookiesArray){
    let cookieArray = cookie.split('=');
    //cookie（単体）がtokenであれば処理を実行する
      if( cookieArray[0] === 'token'){
        //tokenのpayloadを抽出・デコードする
        let payload = atob(cookieArray[1].split('.')[1]);
        //payloadの整形
        payload = payload.replace(/\{|\}/g, '');
        //payloadを分割して配列に格納する
        const payloadArray = payload.split(',');
          for(let pld of payloadArray){
            let pldAry = pld.split(':');
            if(pldAry[0]==='"id"'){
              //payloadからidを抽出(ダブルクォーテーションは削除)
              id = pldAry[1].replace(/\"/g,"");
              break;
            }
          }
        break;
      }
    }
  return id;
}