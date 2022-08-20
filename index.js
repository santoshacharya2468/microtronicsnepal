const express=require('express');
require('dotenv').config();
const mongoose=require('mongoose');
const handlebars=require('express-handlebars');
const authRoute=require('./routes/auth_route');
const productRoute=require('./routes/product_route');
const authCheck=require('./middleware/auth');
const bodyParser=require('body-parser');
const multer=require('multer');
const app=express();
app.use('/assets', express.static('assets'));
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true,limit:"300M" }));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,__dirname+ '/assets/img')
    },
    filename: function (req, file, cb) {
        let filename = Date.now() + "_" + file.originalname;
        req.image='assets/img/'+ filename;
      cb(null, filename);
    }
  })
  
  const upload = multer({ storage: storage })
  app.post('/file',authCheck, upload.single('image'), async (req,res)=>{
    upload.single('image')
    res.status(201).json({
        'path':req.image
    })
  });
app.use(express.json({limit:"300M"}));
mongoose.connect(process.env.mongodb,()=>console.log('database connected successfully'));

app.use('/auth',authRoute);
app.use('/product',productRoute);
const Product=require('./models/product');
app.get('/',async(req,res)=>{
    const products=await Product.find().lean();
    console.log(products);
    res.render('index',{products:products});
});
app.listen(process.env.PORT||8080,()=>console.log('Server running on port 8080'));