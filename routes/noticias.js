const express = require('express')
const router = express.Router()
const Noticia = require('../models/noticia')

router.get('/', async(req, res)=>{
    // let condition = {}
    // if(!('user' in req.session)){
    //     condition = {category: 'public'}
    // }
    // const noticias = await Noticia.find(condition)
    const noticias = await Noticia.find({category: 'public'})
    res.render('noticias/index', {noticias})
})


module.exports = router

