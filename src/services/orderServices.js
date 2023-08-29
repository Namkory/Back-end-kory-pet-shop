import db from '../models/index'
import bcrypt from "bcrypt";

const createOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const order = await db.Order.create(
        {
          userId: data.userId,
          fullName: data.fullName,
          email: data.email,
          address: data.address,
          phone: data.phone,
          note: data.note,
          orderDate: data.orderDate,
          status: data.status,
          totalMoney: data.totalMoney,
        },
        { transaction }
      );
      const arrProductDetails = data.dataProduct.map((item) => {
        return {
          orderId: order.id,
          productId: item.name,
          price: item.price,
          quantity: item.quantity,
          totalMoney: data.totalMoney,
        };
      });
      await db.OrderDetail.bulkCreate(arrProductDetails, { transaction });
      await transaction.commit();
      resolve({
        errCode: 0,
        errMessage: "Ok",
      });
    } catch (e) {
      console.log(e);
      if (transaction) await transaction.rollback();
      reject(e);
    }
  });
};

const getAllOrder = (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let orders = "";
    if (orderId === "ALL") {
      orders = await db.Order.findAll();
    }
    if (orderId && orderId !== "ALL") {
      orders = await db.Order.findOne({
        where: { userId: orderId },
      });
    }
    resolve(orders);
    } catch (e) {
      reject(e);
    }
  })
}

const getOrderDetail = (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let orderDetail = "";
      if(orderId){
        orderDetail = db.OrderDetail.findAll({
          where: {orderId: orderId}
        })
      }
    resolve(orderDetail);
    } catch (e) {
      reject(e);
    }
  })
}


module.exports = {
    createOrder,
    getAllOrder,
    getOrderDetail
}