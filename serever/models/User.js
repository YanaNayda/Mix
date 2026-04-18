const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

 
  avatar: {
    type: String, // URL
    default: '',
  },

 
  level: {
    type: Number,
    default: 1,
  },

  xp: {
    type: Number,
    default: 0,
  },

 
  completedCocktails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cocktail',
    },
  ],

 
  achievements: [
    {
      id: String,
      unlocked: {
        type: Boolean,
        default: false,
      },
      progress: {
        type: Number,
        default: 0,
      },
    },
  ],

 
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient',
    },
  ],
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', UserSchema);