import db from '../models/index'

const handleGetAllProduct = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
          let products = "";
          if (categoryId === "ALL") {
            products = await db.Product.findAll({
              raw: false,
              nest: true
            });

            if(products){
     
              products.forEach(item => {
                if(item.thumbnail){
            item.thumbnail = new Buffer(
              item.thumbnail,
                    'base64',
                ).toString('binary');
                }
                
              })
             
            }
          }
          if (categoryId && categoryId !== "ALL") {
            products = await db.Product.findAll({
              where: { categoryId: categoryId },
              raw: false,
              nest: true
            })
            if(products){
     
              products.forEach(item => {
                if(item.thumbnail){
            item.thumbnail = new Buffer(
              item.thumbnail,
                    'base64',
                ).toString('binary');
                }
              })
             
            }
          }
          resolve(products);
        } catch (e) {
          console.log(e);
          reject(e);
        }
      });
}

let checkUserTitleProduct = (productTitle) => {
    return new Promise(async (resolve, reject) => {
      try {
        let product = await db.Product.findOne({
          where: { title: productTitle },
        });
        if (product) {
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (e) {
        reject(e);
      }
    });
  };

const createProducts = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
        //   check email is exist ???
          let check = await checkUserTitleProduct(data.title);
          if(check === true) {
            resolve({
                errCode: 1,
                errMessage: "Your product is exist",
              });
          }else{
            await db.Product.create({
                categoryId: data.categoryId,
                title: data.title,
                price: data.price,
                discount: data.discount,
                thumbnail: data.thumbnail,
                description: data.description,
            })
          }
    
          resolve({
            errCode: 0,
            errMessage: "Ok",
          })
        } catch (e) {
          console.log(e);
          reject(e);
        }
      });

}

const updateProducts = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
        if(!data.id){
            resolve({
                errCode: 2,
                errMessage: "you missing required id parameters!!"
            })
        }
        let product = await db.Product.findOne({
            where: {id: data.id},
            raw: false,
        })
        
        if(product) {
            // await db.Product.update({

            // },{where: id: idProducct})
            product.categoryId = data.categoryId;
            product.title = data.title;
            product.price = data.price;
            product.discount = data.discount;
            product.thumbnail = data.thumbnail;
            product.description = data.description;
            await product.save();
            resolve({
              errCode: 0,
              errMessage: "Product update successfully",
            });
        }else{
            resolve({
                error: 3,
                errorMessage: "the product does not exist",
            })
        }
        
    } catch (e) {
        console.log(e);
        reject(e);
    }
})
}

const deleteProducts =  (productId) => {
    return new Promise(async(resolve, reject) => {
      try {
        let product = await db.Product.findOne({
          where: {id: productId},
        })
        if(!product) {
          resolve({
              error: 2,
              errorMessage: "the product does not exist",
          })
        }else {
          await db.Product.destroy({where: {id: productId}});
                resolve({
                    error: 0,
                    errorMessage: "the product has been deleted",
                })
        }


      } catch (e) {
        console.log(e);
        reject(e);
      }
    })
}

const getDetailProduct = (productId) => {
  return new Promise(async(resolve, reject) => {
    try {
      let product = await db.Product.findOne({
        where: {id: productId},
        raw: false,
        nest: true
      })
      if(product){
        product.thumbnail = new Buffer(
          product.thumbnail,
                'base64',
            ).toString('binary');
        resolve({
          errCode: 0,
          data: product
        })
      } else {
        resolve({
          errCode: 1,
          errMessage: 'Product not found'
        })
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  })
}



module.exports = {
    createProducts,
    handleGetAllProduct,
    updateProducts,
    deleteProducts,
    getDetailProduct
}