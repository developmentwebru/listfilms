import React from 'react';
import './App.css';
// import { moviesData } from './moviesData'
import MovieItem from './components/MovieItem';
import MovieTabs from './components/MovieTabs';
import { API_URL, API_KEY_3 } from './utils/api'
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "popularity.desc"
    }
  }

  componentDidMount() {
    console.log("didMount")
    this.getMovies()
    // console.log('after fetch')
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("didUpdate")
    console.log("prev", prevProps, prevState)
    console.log("this", this.props, this.state)
    if (prevState.sort_by !== this.state.sort_by) {
      this.getMovies()
    }
  }

  getMovies = () => {
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log('data', data)
        this.setState({
          movies: data.results
        })
      })
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

  updateSortBy = value => {
    this.setState({
      sort_by: value
    });
  };

 

  render() {
    console.log("render", this.state.sort_by)
    return (
      <div className='container'>
        <div className='row mt-4' >
          <div className='col-9'>
            <div className='row mb-4'>
              <div className='col-12'>
                <MovieTabs
                  sort_by={this.state.sort_by}
                  updateSortBy={this.updateSortBy} />
              </div>
            </div>
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
