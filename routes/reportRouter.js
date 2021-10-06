const router = require("express").Router();
const report = require("../models/productModel");

//View all books as a summary
router.get('/', async(req,res)=>{
    try{
        const allDetails = await report.find();
        res.status(200).send({data : allDetails});
    }catch(err){
        res.status(500).send({data : err});
    }
})

module.exports = router;
