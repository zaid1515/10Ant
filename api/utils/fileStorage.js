const multer = require('multer');

// file storage
const storage = multer.diskStorage({
     // destination directory where uploaded files will be stored
     // req (request obj),file(uploaded file)
     destination: function (req, file, cb) {
          cb(null, 'tmp/');
     },
     //cb (callback func to indicate completion of operation,its name can also be given as done (function)).

     // filename to be used
     filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null, uniqueSuffix + "-" + file.originalname);
     }
})


const upload =multer({storage})

module.exports=upload