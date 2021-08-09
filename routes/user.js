const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const jwt = require('jsonwebtoken')

// token generation
const newToken = payload => {
    return jwt.sign(payload,"secretxyz", {
      expiresIn: "1d",
    });
  };
  
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
    req.user = { id: user._id, email: user.email, role: user.role, name: user.name};
    next();
};

router.post('/signup', async (req,res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(422).send({ message: 'need email and password' });
      }
      try {
        const user = await User.findOne({ email: req.body.email })
          .select('email')
          .lean()
          .exec();
        if (user) {
          return res.status(409).send({ message: 'user already exists' });
        }
      } catch (e) {
        console.log(e);
        res.status(500).end();
      }
      if(req.body.role = "Seller"){
      try {
        const user = await User.create({
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
          role: req.body.role
        });
        const token = newToken({
          id: user._id,
          email: user.email,
          role: user.role,
        });
        return res.status(201).send({ token });
      } catch (e) {
        console.log(e);
        return res.status(500).end();
     }
  }
    if(req.body.role = "Buyer"){
    try {
      const user = await Buyer.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name.Buyer,
        role: req.body.role
      });
      const token = newToken({
        id: user._id,
        email: user.email,
        role: user.role,
      });
      return res.status(201).send({ token });
    } catch (e) {
      console.log(e);
      return res.status(500).end();
    }
  }
})


router.post('/signin', async (req,res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'need email and password' });
    }
    // check for user
    try {
      const user = await User.findOne({ email: req.body.email }).exec();
      if (!user) {
        return res
          .status(401)
          .send({ message: 'Invalid email and passoword combination' });
      }
      // check for password
      const match = await user.checkPassword(req.body.password);
      if (!match) {
        return res
          .status(401)
          .send({ message: 'Invalid email and passoword combination' });
      }
      // generate token for user
      const token = newToken({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
      return res
        .status(200)
        .send({ token: token, id: user._id, email: user.email, role: user.role });
    } catch (e) {
      res.status(500).end();
  }
});

module.exports = router, protect