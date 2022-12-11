const express=require('express');
const Router=express.Router();
const Club=require('../model/club.js')

Router.get('/',(err,res)=>{
    res.render('index')
})


//create/insert data




Router.post('/add',(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;


    //console.log(name,email)


    const club = new Club({
        name,
        email
    })
    club.save(err=>{
        if(err){
            console.log("err is ")
        }
        else{
            res.redirect('/')
        }
    })

})

//find data


Router.get('/show',(req,res)=>{
    Club.find((err,docs)=>{
        if(err) throw err;
      res.render('show',{
        students:docs
      })
    })
})


//update

Router.get('/edit/:id',(req,res)=>{
   // console.log(req.params.id)
   Club.findOneAndUpdate({_id:req.params.id},req.body,{new:true},(err,docs)=>{
    if(err){
        console.log("cant update")
    }
    else{
        res.render('edit',{studentdata:docs})
    }
   })
})


//edit

Router.post('/edit/:id',(req,res)=>{
    Club.findByIdAndUpdate({_id:req.params.id},req.body,(err,docs)=>{
        if(err){
            console.log("err")
        }
        else{
            res.redirect('/show')
        }
    })
})


//Del data
Router.get('/delete/:id',(req,res)=>{
    Club.findByIdAndDelete({_id:req.params.id},req.body,(err,docs)=>{
        if(err){
            console.log("Err is")
        }
        else{
            console.log("Deleted")
            res.redirect('/show')
        }
    })
})

module.exports=Router;