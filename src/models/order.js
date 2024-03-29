'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasOne(models.OrderDetail, {foreignKey: 'orderId'})
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    note: DataTypes.STRING,
    orderDate: DataTypes.DATE,
    status: DataTypes.STRING,
    totalMoney: DataTypes.STRING,
    

  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};