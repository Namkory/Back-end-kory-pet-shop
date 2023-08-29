import express from 'express';
import homeController from '../controllers/homeController'
import userController from '../controllers/userController'
import orderController from '../controllers/orderController'

let router = express.Router();

let initWebRoutes = (app) => {
    
    router.get('/', homeController.getHomePage )

    router.get('/get-all-product', homeController.getAllProduct)
    router.get('/get-detail-product', homeController.getDetailProduct)
    router.post('/create-product', homeController.createProduct)
    router.put('/update-product', homeController.updateProduct)
    router.delete('/delete-product', homeController.deleteProduct)
    
    router.post('/user-login', userController.handleUserLogin)
    router.post('/create-user', userController.createUser)
    router.get('/getall-user', userController.getAllUsers)
    router.put('/edit-user', userController.editUser)
    router.delete('/delete-user', userController.deleteUser)
    
    router.post('/create-order', orderController.createOrder)
    router.get('/get-all-orders', orderController.getAllOrders)
    router.get('/get-order-detail', orderController.getOrderDetail)

    return app.use("/", router)
}

module.exports = initWebRoutes;