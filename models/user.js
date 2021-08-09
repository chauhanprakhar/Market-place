const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema(
  {
    name: {
       type: String,
       required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true
    },
  },
);


userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
      return next();
    }
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash;
      next();
    });
  });
  
userSchema.methods.checkPassword = function (password) {
    const passwordHash = this.password;
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, passwordHash, (err, same) => {
        if (err) {
          return reject(err);
        }
        resolve(same);
      });
    });
};

mongoose.model('User', userSchema);