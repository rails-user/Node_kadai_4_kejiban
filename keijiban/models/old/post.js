express = require('express');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const users = require("./user.js");

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  host: 'mysql',
  database: 'mysql_db',
  username: 'root',
  password: 'password',
  dialect: 'mysql'
});

// module.exports = (sequelize) => {
const Post = sequelize.define('Posts', {
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
        model: 'User',
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
  //投稿を全件取得
  selectAll: async (req, res) => {
    try{
      const Posts = await Post.findAll(
        {
        raw: true,
        include: [{
            model: User,
            required: false
        }]
       }
      );
      //console.log(Posts);
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
    let result = new Object();
    try{
        const Posts = await Post.update({where:{
            title : req.body.title,
            content : req.body.content,
            updatedAt : req.body.updatedAt
        }});
    }
    catch (error) {
      console.log(error);
    }
  },
  //投稿を削除
  delete: async (req, res) => {
    let result = new Object();
    try{
        const Post = await Post.destroy({where:{ 
            id : req.body.id
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