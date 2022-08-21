const Product=require('../models/product');
const router=require('express').Router();
const authCheck=require('../middleware/auth');
router.get('/getall',async(req,res)=>{
    console.log('product getall');
    const products=await Product.find();
    res.json({'products':products});
});

router.post('/add',authCheck, async(req,res)=>{
    const {name,body,images,video,category}=req.body;
    console.log(req.body);
 const  result=  await  Product.create({
         name,body, images, video,category,
    });
    res.status(201).send({
        'product':result
    });
});
router.get('/byid/:id',async(req,res)=>{
     const product=await Product.findById(req.params.id);
     res.send(product);
});




module.exports=router;