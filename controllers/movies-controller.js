const Movie=require('../models/movie');

const movieController={};

movieController.index=(req,res)=>{
    Movie.findAll()
    .then(movies=>{
        res.json(movies)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
}

movieController.show=(req,res)=>{
    Movie.findById(req.params.id)
    .then(movie=>{
        res.json(movie)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
}

movieController.create=(req,res)=>{
    Movie.create({
        title:req.body.title,
        description:req.body.description,
        genre:req.body.genre,
    },req.user.id)
    .then(movie=>{
        res.json({
            message:'ok',
            data:movie,
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
};

movieController.update=(req,res)=>{
    Movie.update({
        title:req.body.title,
        description:req.body.description,
        genre:req.body.genre,
    },req.params.id)
    .then(movie=>{
        res.json({
            message:'ok',
            data:movie,
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
}

movieController.delete=(req,res)=>{
    Movie.destroy(req.params.id)
    .then(()=>{
        res.redirect('/movies');
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
}

module.exports=movieController;