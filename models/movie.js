const db=require('../db/config');

const Movie={};

Movie.findAll=()=>{
    return db.query('SELECT * FROM movies');
}

Movie.findById=(id)=>{
    return db.oneOrNone(`
    SELECT * FROM movies
    WHERE id=$1
    `,[id]);
}

Movie.create=(movie,userid)=>{
    return db.one(`
    INSERT INTO movies
    (title,description,genre,user_id)
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `,[movie.title,movie.description,movie.genre,userid]);
}

Movie.update=(movie,id)=>{
    return db.one(`
    UPDATE movies SET
    title=$1,
    description=$2,
    genre=$3
    WHERE id=$4
    RETURNING *
    `,[movie.title,movie.description,movie.genre,id])
}

Movie.destroy=(id)=>{
    return db.none(`
    DELETE FROM movies
    WHERE id=$1
    `,[id]);
}


Movie.showMovieComments=movieid=>{
    return db.query(`
    SELECT * FROM comments
    WHERE movie_id=$1
    `,[movieid]);
}

Movie.createComment=(comment,username,movieid)=>{
    return db.one(`
    INSERT INTO comments
    (text,user_name,movie_id)
    VALUES($1,$2,$3)
    RETURNING *
    `,[comment.text,username,movieid]);
}

Movie.getFavorites = (userId) => {
    return db.query(`
        SELECT * FROM favorites
        WHERE user_id = $1
    `, [userId]);
}

Movie.addFavorite = (movieId, userId) => {
    return db.one(`
        INSERT INTO favorites
        (movie_id, user_id)
        VALUES ($1, $2)
        RETURNING *
    `, [movieId, userId]);
}

Movie.deleteFavorite = (movieId, userId) => {
    return db.none(`
        DELETE FROM favorites
        WHERE movie_id = $1 AND user_id = $2
    `, [movieId, userId]);
}

module.exports=Movie;