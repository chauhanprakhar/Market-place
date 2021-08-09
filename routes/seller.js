const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Order = mongoose.model('Order')
const jwt = require('jsonwebtoken')
const Product = mongoose.model('Product')

// token verification
const verifyToken = token =>
    new Promise((resolve, reject) => {
      jwt.verify(token, "secretxyz", (err, payload) => {
        if (err) return reject(err);
        resolve(payload);
    });
});

const protect = async (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith('Bearer ')) {
      return res.status(401).send({message: 'Unauthorized Access'});
    }
    const token = bearer.split('Bearer ')[1].trim();
    let payload, user;
    try {
      payload = await verifyToken(token);
      user = await User.findById(payload.id)
        .select('_id email role')
        .lean()
        .exec();
      if (user === null) {
        return res.status(401).send({message: 'Unauthorized Access'});
      }
    } catch (e) {
      return res.status(401).send({message: 'Unauthorized Access'});
    }
    req.user = { id: user._id, email: user.email, role: user.role};
    next();
};

router.get('/api/buyer/list-of-sellers',protect, async (req,res) => {
    try {
        const data = await User.find({
          role: 'Seller'
        })
          .select('email name -_id')
          .lean()
          .exec();
        res.send(data);
      } catch (e) {
        res.status(500).end();
      }
})

router.post('/api/seller/create-catalog',protect, async (req,res) =>{
    try {
        const data = await Product.insertMany(req.body)
        res.send(data);
      } catch (e) {
        console.log(e)
        res.status(500).end();
      }
})

router.post('/api/buyer/create-order/:seller_id',protect, async (req,res) =>{
    try {
        const data = await Order.insertMany(req.body)
        res.send(data);
      } catch (e) {
        console.log(e)
        res.status(500).end();
      }
})

router.get('/api/buyer/seller-catalog/:seller_id',protect, async (req,res)=> {
    try {
        const data = await Product.find({
          addedBy: req.params.seller_id
        })
          .select('title _id')
          .lean()
          .exec();
        res.send(data);
      } catch (e) {
        res.status(500).end();
      }
})

router.get('/api/seller/orders',protect , async (req,res) => {
    try {
        const data = await Order.find({
          sellerId: req.user.id
        })
          .lean()
          .exec();
        res.send(data);
      } catch (e) {
        res.status(500).end();
      }
})


module.exports = router
