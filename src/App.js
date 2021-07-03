import React from 'react';
import './App.css';
import { moviesData } from './moviesData'
import MovieItem from './components/MovieItem';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: moviesData,
      moviesWillWatch: []
    }
  }

  removeMovie = (movie) => {
    const updateMovies = this.state.movies.filter(function (item) {
      return item.id !== movie.id;
    })
    console.log(updateMovies)
    this.setState({
      movies: updateMovies
    })
  }

  addMovieToWillWatch = movie => {
    // this.state.moviesWillWatch.push(movie)
    console.log(movie)
    // const updateMoviesWillWatch = [...this.state.moviesWillWatch]
    // updateMoviesWillWatch.push(movie);
    const updateMoviesWillWatch = [...this.state.moviesWillWatch, movie]


    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    })

  }

  removeMovieFromWillWatch = (movie) => {
    const updatemoviesWillWatch = this.state.moviesWillWatch.filter(function (item) {
      return item.id !== movie.id;
    })
    console.log(updatemoviesWillWatch)
    this.setState({
      moviesWillWatch: updatemoviesWillWatch
    })
  }

  render() {

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-9'>
            <div className='row'>
              {this.state.movies.map(movie => {
                return (
                  <div className='col-6 mb-4' key={movie.id}>
                    <MovieItem
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      movie={movie}
                      removeMovie={this.removeMovie}
                      removeMovieFromWillWatch={this.removeMovieFromWillWatch}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className='col-3'>
            <p>Will Watch: {this.state.moviesWillWatch.length}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
