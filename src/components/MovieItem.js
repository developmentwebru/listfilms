import React from 'react'

class MovieItem extends React.Component {
    state = {
        willWatch: false
    }

    // componentWillUnmount() {
    //     console.log(this.props.movie.title)
    //     console.log('unmount',);
    // }

    render() {
        const { movie, removeMovie, addMovieToWillWatch, removeMovieFromWillWatch } = this.props
        return (
            <div className="card">
                <img
                    className='card-img-top'
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path ||
                        movie.poster_path}`} alt="" />
                <div className="card-body">
                    <h6 className="card-title">{movie.title}</h6>
                    <div className='d-flex justify-content-between align-items-center'>
                        <p className='mb-0'>Rating: {movie.vote_average}</p>
                        {this.state.willWatch ? (
                            <button
                                onClick={() => {
                                    this.setState({
                                        willWatch: false
                                    })
                                    removeMovieFromWillWatch(movie)
                                }}
                                type='button'
                                className='btn btn-success'>
                                Remove Will Watch
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    this.setState({
                                        willWatch: true
                                    })
                                    addMovieToWillWatch(movie)
                                }}
                                type='button'
                                className='btn btn-secondary'>
                                Add Will Watch
                            </button>
                        )}

                    </div>
                    <button onClick={removeMovie.bind(null, movie)}>Delete movie</button>
                </div>
            </div>
        )
    }
}



export default MovieItem
