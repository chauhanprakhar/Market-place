const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const protect = require('./user')

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



module.exports = router