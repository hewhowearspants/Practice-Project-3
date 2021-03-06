const express=require('express');
const movieRoutes=express.Router();
const authHelpers=require('../services/auth/auth-helpers');

const moviesController=require('../controllers/movies-controller');

movieRoutes.get('/',moviesController.index);
movieRoutes.post('/',authHelpers.loginRequired,moviesController.create);

movieRoutes.get('/fav', authHelpers.loginRequired, moviesController.getFavorites);

movieRoutes.get('/:id',moviesController.show);
movieRoutes.put('/:id',authHelpers.loginRequired,moviesController.update);
movieRoutes.delete('/:id',authHelpers.loginRequired,moviesController.delete);
movieRoutes.post('/comments/:id',authHelpers.loginRequired,moviesController.createComment);
movieRoutes.get('/comments/:id',moviesController.showMovieComments);


movieRoutes.post('/:id/fav', authHelpers.loginRequired, moviesController.addFavorite);
movieRoutes.delete('/:id/fav', authHelpers.loginRequired, moviesController.deleteFavorite);

module.exports=movieRoutes;