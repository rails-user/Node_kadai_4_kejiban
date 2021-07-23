'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Like }) {
      // define association here
      Post.belongsTo(User, { foreignKey: 'user_id', sourceKey: 'id' });
    }
  };
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, field: 'user_id' },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};