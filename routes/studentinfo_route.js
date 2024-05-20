const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerConfig'); 
const studentInfoSController = require('../controllers/student_info/index');
const { uploadToCloudinary } = require('../middleware/Cloudinary'); 

router.get('/student/list', studentInfoSController.getStudentinfo);
router.post('/student/create', upload.array('image', 3), uploadToCloudinary, studentInfoSController.createStudentinfo);
router.put('/student/:id', upload.single('image'), uploadToCloudinary, studentInfoSController.updateStudentInfo);
router.delete('/student/:id', studentInfoSController.deleteStudentInfo); 

module.exports = router;
