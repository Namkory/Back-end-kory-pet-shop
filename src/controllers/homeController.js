import db from "../models/index";
import productService from "../services/productServices"

let getHomePage = async (rep, res) => {
   try {
   
    
    return res.send("hello from kory shop")
   } catch (e) {
    console.log(e);
   }
}

const getAllProduct = async (req, res) => {
    let categoryId = req.query.categoryId;

    if(!categoryId) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing Required parameters',
            products: []
        })
    }

    let products = await productService.handleGetAllProduct(categoryId);

    return res.status(200).json({
        errCode: 0,
        errMessage: "ok",
        products
    })
}

const createProduct = async (req, res) => {
    let response = await productService.createProducts(req.body)
    
    return res.status(200).json(response)
}

const updateProduct = async (req, res) => {
    let data = req.body;

    let response = await productService.updateProducts(data)

    return res.status(200).json(response)
}

const deleteProduct = async (req, res) => {
    console.log('check param id', req.query.id);
    if(!req.query.id) {
        
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing Required id parameters!!',
        })
    }
    let response = await productService.deleteProducts(req.query.id)
    
    return res.status(200).json(response)
}
const getDetailProduct = async (req, res) => {
    if(!req.query.id) {
        
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing Required id parameters!!',
        })
    }
    let response = await productService.getDetailProduct(req.query.id)
    
    return res.status(200).json(response)
}

module.exports = {
    getHomePage,
    createProduct,
    getAllProduct,
    deleteProduct,
    updateProduct,
    getDetailProduct
}