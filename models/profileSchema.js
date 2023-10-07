var mongoose = require('mongoose');
var db = require('../db/conn');
const url = require('url');
const upload = require("../middleware/userImg");
const path = require("path");
const fs = require("fs");
var ProfileSchema = new mongoose.Schema({
  // CustomerId:String,
  PoliticianName: String,
  PoliticalPartyName: String,
  MailId: String,
  PhoneNumber: String,
  Partyofficelocation: String,
  YouTubeLink: String,
  InstagramId: String,
  FecebookId: String,
  TwitterId: String,
  PoliticanPhoto: Array,
  PoliticalPartylogo:Array,
  PhotoGallery: [{
    filename: String,
    description : String,

    }],
    NewsGallery: [{
      filename : String,
      description: String,

    }],

  PoliticiansInformation: String,

});


ProfileTable = mongoose.model('profile', ProfileSchema);

const createData = function (inputData, callback) {
  const userData = new ProfileTable(inputData);

  userData.save()
    .then((data) => {
      callback(data);
    })
    .catch((err) => {
      throw err;
    });
};

const createProfileInMogo = function (inputData) {
  return new Promise((resolve, reject) => {
    const userData = new ProfileTable(inputData);

    userData.save()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const updateData = async function (profileId, data) 
{
  try {
    const updatedData = await ProfileTable.findByIdAndUpdate(profileId, data, { new: true }).exec();
    return updatedData;
  } catch (error) {
    throw error;
  }
};



// // Assume your crudModel has a method like this:
const findUser = async function (query) {
  try {
  const existingData = await ProfileTable.findById({_id:query});
  return existingData;
  } catch (error) {
    throw error;
  }
};

const getAllUser = function (callback) {
  const userData = ProfileTable.find({});
  userData.exec()
    .then((data) => {
      callback(data);
    })
    .catch((err) => {
      throw err;
    });
};

const getOneUserById = function (id,callback) {
  const userData = ProfileTable.find(id);
  userData.exec()
    .then((data) => {
      callback(data);
    })
    .catch((err) => {
      throw err;
    });
};



const updateprofileById = async function (id, data) {
  try {
    const updatedData = await ProfileTable.findByIdAndUpdate(id, data, { new: true }).exec();
    return updatedData;
  } catch (error) {
    throw error;
  }
};
// Assume your crudModel has a method like this:
const findUserId = async function (query) {
  try {
  const existingData = await ProfileTable.findOne(query);
  return existingData;
  } catch (error) {
    throw error;
  }
};
const deleteImageFromGallery = async function (profileId, gallaryname, imageId) {
  try {
    const profile = await ProfileTable.findById(profileId);
    console.log(gallaryname,'here gallery name')
    console.log(profile);
    // console.log(req.params.profileId);
    if (!profile) {
      throw new Error('Profile not found');
    }
    // let galleryPath;
    let gallery='';


    if (gallaryname == 'PhotoGallery') {
      // let gallaryname = gallaryname;
      gallery = profile.PhotoGallery;
      console.log("here is all gallary data", gallery);
      galleryPath = 'uploads/photo_gallery';
    } else if (gallaryname == 'NewsGallery') {
      gallery = profile.NewsGallery;
      console.log("here is all gallary data", gallery);
      galleryPath = 'uploads/news_gallery';
    } else {
      return { msg: 'Invalid gallery type' };
    }
    


    // // Find the index of the image to delete
    let imgName = '';
    console.log("here is imageid", imageId);
    const indexToDelete = gallery.findIndex((image) => {
      return image._id.toString() === imageId; // Use === for comparison
    });
    
    if (indexToDelete !== -1) {
      imgName = gallery[indexToDelete].filename;
      const parsedUrl = new URL(imgName);
      const imageName = path.basename(parsedUrl.pathname);
      console.log("gallary path is here",galleryPath);
      console.log("here is img name ::::", imageName);
      console.log("here is directory name",__dirname);
      console.log("here is gallerypath",galleryPath);
      console.log("here is image name",imageName);
      const imagePath = path.join(__dirname, '..',  galleryPath, imageName);
      console.log("here is image path completed",imagePath);
  
  
        fs.unlinkSync(imagePath);
      // // Save the updated profile with the image removed
       // Remove the image from the gallery array
    gallery.splice(indexToDelete, 1);

    // Log the modified profile to verify the change
    console.log('Modified profile:', profile);

    // Save the updated profile with the image removed
    await profile.save();
    return {msg:"Image Deleted Successfully"}
  
    } else {
      console.log("Image not found in the gallery");
    }

  } catch (err) {
    throw err;
  }
};



module.exports = {
  createData,
  updateData,
  findUser,
  getAllUser,
  getOneUserById,
  updateprofileById,
  findUserId,
  deleteImageFromGallery,
  createProfileInMogo

 
}