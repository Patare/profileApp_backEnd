const multer = require("multer");

// multer diskstoreage on the image path of the storage.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder;
         if (file.fieldname === "PoliticanPhoto") {
            folder = "./Uploads";
        } else if (file.fieldname === "PoliticalPartylogo") {
            folder = "./Uploads";
         } 

        //  else {
        //     folder = "./Uploads/user_photo/";
        // }
 

         let gallaryname=req.params.gallary;
         console.log("It is multer",gallaryname);

         if (gallaryname=== "PhotoGallery") {
            folder ="./Uploads/photo_gallery/";
        }else if(gallaryname=== "NewsGallery"){
            folder = "./Uploads/news_gallery/";
        }
      
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        // cb(null, `${file.originalname}`);
        cb(null, Date.now() + "--" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});

module.exports = upload;