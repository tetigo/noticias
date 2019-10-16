const express = require('express')
const router = express.Router()

const Noticia = require('../models/noticia')

//não está associado com nenhum endpoint então é
//chamado sempre que alguem tentar acessar 
//qualquer rota restrita e redirecionado de acordo
router.use((req, res, next)=>{
    if('user' in req.session){
        if(req.session.user.roles.indexOf('restrito') >= 0){
            return next()
        }else{
            res.redirect('/')
        }
    }else{
        res.redirect('/login')
    }
})

router.get('/', (req, res)=>{
    res.send('restrito')
})
router.get('/noticias', async(req, res)=>{
    const noticias = await Noticia.find({category: 'private'})
    res.render('noticias/restrito', {noticias})
})


module.exports = router




