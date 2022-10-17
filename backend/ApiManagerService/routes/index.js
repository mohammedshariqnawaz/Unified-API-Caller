var express = require('express');
var router = express.Router();

//Get home page
router.get('/',(req,res)=>{
    res.send("Homepage")
});

module.exports = router;