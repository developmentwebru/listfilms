import React from 'react'

const MovieItem = (props) => {
    return (
        <div>
            <p>{props.movie.title}</p>
            <button onClick={props.removeMovie.bind(this, props.movie)}>Delet movie</button>
        </div>
    )
}

export default MovieItem
