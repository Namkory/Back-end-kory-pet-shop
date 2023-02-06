import express from 'express';
import homeController from '../controllers/homeController'

let router = express.Router();

let initWebRoutes = (app) => {
    
    router.get('/', homeController.getHomePage )

    router.get('/get-all-product', homeController.getAllProduct)
    router.get('/get-detail-product', homeController.getDetailProduct)
    router.post('/create-product', homeController.createProduct)
    router.put('/update-product', homeController.updateProduct)
    router.delete('/delete-product', homeController.deleteProduct)


    return app.use("/", router)
}

module.exports = initWebRoutes;