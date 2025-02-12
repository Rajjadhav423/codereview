// const express=require('express')
// const { generateResonseController } = require('../controllers/ai.controller')

// const router=express.Router()

// router.post('/get-response',generateResonseController)

// module.exports=router


const express = require('express');
const { generateResponseController } = require('../controllers/ai.controller');

const router = express.Router();
router.post('/get-response', generateResponseController); 

module.exports = router;
