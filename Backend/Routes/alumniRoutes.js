const express= require('express');
const router = express.Router();
const multer = require('multer');
const {getAllAlumni,searchAlumni,addAlumni} = require('../Controllers/alumniController');
const {protect} =require('../Middleware/authMiddleware');

router.get('/',protect,getAllAlumni);
router.get('/search',protect,searchAlumni);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');  // Set upload directory
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);  // Generate unique filename
    }
  });
  const upload = multer({ storage: storage });
  
  // Route to add a new alumni
  router.post('/add', upload.single('profilePicture'),protect, addAlumni);

module.exports = router;