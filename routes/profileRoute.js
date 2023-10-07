var express = require('express');
var router = express.Router();
 const upload = require("../middleware/userImg");
var userController= require('../controllers/profileControllers');
const path = require('path');

router.post('/profile-register', upload.fields([
    { name: 'PoliticanPhoto' },
    { name: 'PoliticalPartylogo'},
  ]), userController.createData);

router.post('/:profileId/:gallary', upload.array('images', [
    {name:'PhotoGallery'},
   {name:" NewsGallery"}
             
 ]),userController.updateData);

 router.get('/getImage/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, '../Uploads', filename);
  // const imagePath = path.join('C:\Users\omsai\Downloads\Profilre form (2)\Profilre form/uploads/1695016143796--R-kalyan.jpeg');

  // Serve the image file
  res.sendFile(imagePath);
});

router.put('/updateprofileById/:id',upload.fields([
  { name: 'PoliticanPhoto' },
  { name: 'PoliticalPartylogo'},
]),userController.updateprofileById);


 router.get('/getAllRegisterUser',userController.getAllUser);
 router.get('/getOneProfileById/:id',userController.getOneUserById);


 router.get('/Uploads/:imgname', userController.getImageFromUploads)
router.get('/Uploads/:gallaryname/:imgname', userController.getImageFromGallery)
router.delete('/:profileId/:gallary/:imageid',userController.deleteImageById);
 module.exports = router;
  // router.post('/profile/:profileId',  upload.array('images'), async (req, res) => {
  //   try {
  //     const files = req.files;
  //     const descriptions = req.body.descriptions;
  //     const profileId = req.params.profileId;
  
  //     const profile = await Profile.findById(profileId);
  //     console.log(profile)

  
  //     // if (!profile) {
  //     //   return res.status(404).json({ error: 'Profile not found' });
  //     // }
  
  //     // for (let i = 0; i < files.length; i++) {
  //     //   profile.imageGallery.push({
  //     //     filename: files[i].filename,
  //     //     description: descriptions[i]
  //     //   });
  //     // }
  
  //   //   await profile.save();
  
  //   //   res.status(200).json({ message: 'Images uploaded and added to image gallery successfully' });
  //   } catch (error) {
  //     console.error('Error uploading images', error);
  //     res.status(500).json({ error: 'An error occurred' });
  //   }
  // });





// router.post('/updateOneprofileById/:id', upload.fields([

//   {name:'imageGallery'},
//    {name:'NewsGallery'}
// ]), userController.updateData);


// module.exports = router;