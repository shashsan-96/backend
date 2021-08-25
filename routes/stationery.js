const express = require('express');
const stationery= require('../models/Stationery');
const multer = require("multer")
const stationeryrouter=express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "client/public/uploads/");
    },

    filename: (req, file, cb) => {
        cb(null,file.originalname);
    }
})
const upload = multer({storage:storage});

//savestationery
stationeryrouter.post('/stationery/save',upload.single("Img"),(req,res)=>{
    const newstationery = new stationery({//create object from model class
        StationeryId:req.body.StationeryId,
        Title:req.body.Title,
        ISBN:req.body.ISBN,
        Category:req.body.Category,
        Price:req.body.Price,
        Description:req.body.Description,
        Img:req.file.originalname

    });

    //pass data through model class to db
    // check whether unsucess
    newstationery.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err

            });
          }
          //success response send to frontend
          return res.status(200).json({
              success:"stationery saved successfully"

          });
    });
});

//get posts

stationeryrouter.get('/stationery',(req,res) =>{
    stationery.find().exec((err,stationery)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingstationery:stationery
        });
        });
    });

    //get specific stationery

    stationeryrouter.get("/stationery/:id",(req,res)=>{//fetch the id in request as a parameter
        let stationeryId= req.params.id;
        stationery.findById(stationeryId,(err,stationery)=>{
            if(err){
                return res.status(400).json({success:false,err});
            }
            return res.status(200).json({
                success:true,
                stationery
            });
            
        });
    });



    //update stationery without photo

    stationeryrouter.put('/stationery/other/:id',(req,res)=>{//we use id because we need to update specific stationery
        stationery.findByIdAndUpdate(
            req.params.id,{
                $set:req.body
            },
            (err,stationery)=>{
                if(err){
                return res.status(400).json({
                    error:err
                });
            }

            return res.status(200).json({

                success:"updated successfully"
        });
        }
        );
    });


//update stationery with photo

stationeryrouter.put('/stationery/update/:id',upload.single("Img"),(req,res)=>{//we use id because we need to update specific stationery
    stationery.findByIdAndUpdate(
            req.params.id)
            .then((stationery)=>{
       stationery.StationeryId=req.body.StationeryId;
       stationery.Title=req.body.Title;
       stationery.ISBN=req.body.ISBN;
       stationery.Category=req.body.Category;
       stationery.Price=req.body.Price;
       stationery.Description=req.body.Description;
       stationery.Img=req.file.originalname;
        

       stationery
        .save()
        .then(()=>res.json("updated succesfully"))
        .catch(err=>res.status(400).json(`Error:${err}`));
            })
            .catch(err=>res.status(400).json(`Error:${err}`));
        });


            
               

    //deletestationery

   stationeryrouter.delete('/stationery/delete/:id',(req,res) =>{
       stationery.findByIdAndRemove(req.params.id).exec((err,deletedstationery)=>{
            if(err)return res.status(400).json({
                message:"deleted unsuccessfull",err
            });

            return res.json({
                message:"delete successfully",deletedstationery
            });
        });
    });


    
//customer view

stationeryrouter.get('/display',(req,res) =>{
   stationery.find().exec((err,stationery)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingstationery:stationery
        });
        });
    });


    

    //deletestationery

   stationeryrouter.delete('/stationery/delete/:id',(req,res) =>{
       stationery.findByIdAndRemove(req.params.id).exec((err,deletedstationery)=>{
            if(err)return res.status(400).json({
                message:"deleted unsuccessfull",err
            });

            return res.json({
                message:"delete successfully",deletedstationery
            });
        });
    });

module.exports =stationeryrouter; 