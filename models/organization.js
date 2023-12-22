const mongoose = require('mongoose');
const collections = require("../helper/collection")
const dbPrefix = process.env.dbPrefix;

const OrgSchema = new mongoose.Schema(
  {
    nameOFtheOrganization: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      createIndexes : true
 
    },
    companyStartDate: {
      type: String,
      required: true,
   
    
    },
    numberOfEmployess: {
      type: Number,
      default : 0
     
    },
    discription: {
        type: String,
        default: '',
     
    },

    services: {
      type: Array,
      default: [],
    },
    blogs: {

        type: Array,
        default:[],
  
    },
    contact_us:{
        type: Array,
        default: [],
    }
 
  },
  { timestamps: true , versionKey : false }
);




const OrgSchemas = mongoose.model(
  collections.db_prefix.org, 
  OrgSchema,
  dbPrefix+collections.db_suffix.org );

module.exports = OrgSchemas;
