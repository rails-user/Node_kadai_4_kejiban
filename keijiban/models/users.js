express = require('express');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const bcryptjs = require('bcryptjs');
const saltRounds = 10
const jwt = require('jsonwebtoken')

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  host: 'mysql',
  database: 'mysql_db',
  username: 'root',
  password: 'password',
  dialect: 'mysql'
});

const User = sequelize.define('users', {
  id: {
    allowNull: false,
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING
  },
  email: {
    allowNull: false,
    type: Sequelize.STRING
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING
  },
},{
  timestamps: true,
  freezeTableName: true
});

module.exports = {
  //ログイン（ユーザー取得）
  select: async (req, res) => {
    let result = new Object();
    try{
      const selectUser = await User.findOne({where:{ 
        email : req.body.email
      }});
      if (!selectUser) {
        result.msg = 'メールアドレスが正しくありません。';
        return result;
      }else{
          const compPass = bcryptjs.compareSync(req.body.password, selectUser.password);
          if (!compPass){
            result.msg = 'パスワードが正しくありません。';
            return result;
          }else{
            const payload = {
              id: selectUser.id,
              name: selectUser.name
            }
            result.token = jwt.sign(payload,'secret')
            return result;
          }
      }
    }
    catch (error) {
      console.log(error);
    }
  },
  //ユーザー登録
  create: async (req, res) => {
    let result = new Object();
    try{
      const password = req.body.password;
      const hash = bcryptjs.hashSync(password, saltRounds);
      const createUser = await User.create({ 
        name : req.body.name,  
        email : req.body.email, 
        password : hash
      });
      if (createUser === null) {
        result.msg = 'ユーザーが登録できませんでした。';
        return result;
      }else{
        const payload = {
          id: createUser.id,
          name: createUser.name
        }
        result.token = jwt.sign(payload,'secret')
        return result;
      }
    }
    catch(error){
      console.log(error);
    }
  }
}