const mongoose = require('mongoose');
const collections = require("../helper/collection")
const dbPrefix = process.env.dbPrefix;

const userSchema = new mongoose.Schema(
  {
    username: { type: String,
      required: true,
       trim: true,
       minlength: 3,
       maxlength: 30,
      },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      createIndexes : true
 
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    
    },
    role: {
      type: String,
      enum: ['employee', 'admin'],
      default: 'employee',
    },
    org_name: {
      type: String,
      default: 'SciflareTech',
    },
    profile: {
      firstName: {
        type: String,
        trim: true,
        default: '',
      },
      lastName: {
        type: String,
        trim: true,
        default: '',
      },
      profileimg: {
        type: String,
        default: '',
      },
    },
    bio: {
      type: String,
      trim: true,
      default: '',
    },
    social: {
      twitter: {
        type: String,
        trim: true,
        default: '',
      },
      linkedin: {
        type: String,
        trim: true,
        default: '',
      },
      github: {
        type: String,
        trim: true,
        default: '',
      },
    },
 
  },
  { timestamps: true , versionKey : false }
);




const User = mongoose.model(
  collections.db_prefix.userInfo, 
  userSchema,
  dbPrefix+collections.db_suffix.userInfo );

module.exports = User;
