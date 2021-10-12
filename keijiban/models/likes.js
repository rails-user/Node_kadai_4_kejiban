express = require('express');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const users = require("./users.js");
const posts = require("./posts.js");
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  host: 'mysql',
  database: 'mysql_db',
  username: 'root',
  password: 'password',
  dialect: 'mysql'
});

const Like = sequelize.define('likes', {
  id: {
    allowNull: false,
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
   postId: {
    allowNull: false,
    references: {
        model: 'posts',
        key: 'id'
      },
    type: Sequelize.INTEGER
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
Like.associate = function(User) {
    User.belongsToMany(Post 
    , {
    throw: Like,
    foreignKey: 'postId'
  });
},
Like.associate = function(Post) {
    Post.belongsToMany(User 
    , {
    throw: Like,
    foreignKey: 'userId'
  });
}

module.exports = {
    //いいねを作成
    insert: async (req, res) => {
        try{
            await Like.create({
                postId : req.params.id,
                userId : getUserId(req)
            })
        }
        catch (error) {
            console.log(error);
        }
    },
    //いいねを削除
    delete: async (req, res) => {
        try{
            await Like.destroy({where:{ 
                postId : req.params.id,
                userId : getUserId(req)
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