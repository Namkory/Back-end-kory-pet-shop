import orderService from "../services/orderServices"

const createOrder = async (req, res) => {
    let response = await orderService.createOrder(req.body)
    return res.status(200).json( response)
}

const getAllOrders = async(req, res) => {
    let id = req.query.id
    
    if(!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing Required parameters',
            orders: []
        })
    }

    let orders = await orderService.getAllOrder(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: "ok",
        orders
    })
}

const getOrderDetail = async(req, res) => {
    let orderId = req.query.orderId
    
    if(!orderId) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing Required parameters',
            OrderDetail: []
        })
    }

    let OrderDetail = await orderService.getOrderDetail(orderId);

    return res.status(200).json({
        errCode: 0,
        errMessage: "ok",
        OrderDetail
    })
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrderDetail
}