const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const User=require('../models/user');
const jsonwebtoken=require('jsonwebtoken');
const authCheck=require('../middleware/auth');
router.post('/register',authCheck, async(req,res)=>{
    const  {email,password}=req.body;
    const passwordHash=await bcrypt.hash(password,10);
    const  user=await   User.create({
        email,
        password:passwordHash,
        isAdmin:true
    });
    res.send(user);
});
router.post("/login", async (req, res) => {
    var { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (user != null) {
          var isAdmin = user.isAdmin || false;
          try {
            let status = await bcrypt.compare(password, user.password);
            if (status) {
              try {
                let token = jsonwebtoken.sign(
                  { email: user.email, id: user._id, isAdmin: isAdmin },
                  "53465FDSFf##%#%$%",
                  {
                    expiresIn: "60 days",
                  }
                );
                res.json({ token: token, id: user._id, isAdmin: isAdmin });
              } catch (e) {
                console.log(e);
                res.status(500).send({ message: "Error signin...." });
              }
            } else {
              res.status(401).send({ message: "Email/password error...." });
            }
          } catch (e) {
            res.status(401).send({ message: "Email/password error...." });
          }
        
      
      
      } else {
        res.status(401).send({ message: "Email/password error...." });
      }
    } catch (e) {
      res.status(500).send({ message: "Server error try again..." });
    }
  });

  module.exports=router;
