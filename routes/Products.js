const express=require('express')
const mongoose=require('mongoose')
const ProductModel = require('../controller/Products')
const UserModel = require('../controller/User')


const ProductRouter=express.Router()

ProductRouter.get('/',async(req,res)=>{
 try {
    const response=await ProductModel.find({})
    res.json(response)
    } catch (error) {
        res.json(error)
    }
})

ProductRouter.post('/',async(req,res)=>{
    const products=new ProductModel(req.body)

    try {
        const response=await products.save()
        res.json({msg:'Product Save Successfully'})
    } catch (error) {
        res.json(error)
    }
})

ProductRouter.put('/',async(req,res)=>{
    try {
        const product=await ProductModel.findById(req.body.productID)
        const user=await UserModel.findById(req.body.userID)
user.buyProduct.push(product)
await user.save()
res.json({buyProduct:user.buyProduct})
    } catch (error) {
        res.json(error)
    }
})



ProductRouter.get('/buyProduct/ids/:userID',async(req,res)=>{
    try {
        const user=await UserModel.findById(req.params.userID)
        res.json({buyProduct:user?.buyProduct})
    } catch (error) {
        res.json(error)
    }
})


ProductRouter.get('/buyProduct/:userID',async(req,res)=>{
    try {
        const user=await UserModel.findById(req.params.userID)
         const buyProduct=await ProductModel.find({
            _id:{$in:user.buyProduct}
         })
         res.json({buyProduct})
    } catch (error) {
        res.json(error)
    }
})

ProductRouter.delete('/buyProduct/ids/:userID/:productID', async (req, res) => {
    try {
        const userId = req.params.userID; 
        const productID = req.params.productID;
      
     
        const response = await UserModel.updateOne(
            { _id: userId },
            { $pull: { buyProduct: productID } },
            { new: true }
        );

        if (!response) {
            return res.json({ msg: 'User not found' });
        }

        res.json({ msg: 'Item Removed Successfully' });
    } catch (error) {
        res.json(error);
    }
});

ProductRouter.put('/buyProduct/:userID', async (req, res) => {
    const type = req.body.type;
    const productID = req.body.productID;

    try {
        const user = await UserModel.findById(req.params.userID);
        
        if (user.buyProduct.includes(productID)) {
            await ProductModel.updateOne(
                { _id: productID },
                { $inc: { quantity: type } } 
            );

            res.json({ message: 'Product updated successfully.' });
        } else {
            res.status(404).json({ error: 'Product not found .' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});




module.exports=ProductRouter