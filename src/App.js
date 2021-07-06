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
      sort_by: "popularity.desc",
      total_pages: 500,
      currentPage: 1
    }
  }

  componentDidMount() {
    console.log("didMount")
    this.getMovies()
    // console.log('after fetch')
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log("didUpdate")
    // console.log("prev", prevProps, prevState)
    // console.log("this", this.props, this.state)
    if (prevState.sort_by !== this.state.sort_by) {
      this.getMovies()
    }
    if (prevState.currentPage !== this.state.currentPage) {
      this.getMovies()
    }
  }

  getMovies = () => {
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.currentPage}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log('data', data)
        this.setState({
          movies: data.results,
          total_pages: data.total_pages,
          currentPage: data.page
        })
      })
  }

  removeMovie = (movie) => {
    const updateMovies = this.state.movies.filter(function (item) {
      return item.id !== movie.id;
    })
    //console.log(updateMovies)
    this.setState({
      movies: updateMovies
    })
  }

  addMovieToWillWatch = movie => {
    // this.state.moviesWillWatch.push(movie)
    //console.log(movie)
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
    // console.log(updatemoviesWillWatch)
    this.setState({
      moviesWillWatch: updatemoviesWillWatch
    })
  }

  updateSortBy = value => {
    this.setState({
      sort_by: value,
      currentPage: 1
    });
  };

  handleNext = () => {
    let changePage = this.state.currentPage + 1
    if (changePage >= this.state.total_pages) {
      this.setState({
        currentPage: this.state.total_pages
      })
    } else {
      this.setState({
        currentPage: changePage
      })
    }
  }

  handlePrev = () => {
    let changePage = this.state.currentPage - 1
    if (changePage <= 1) {
      this.setState({
        currentPage: 1
      })
    } else {
      this.setState({
        currentPage: changePage
      })
    }

  }



  render() {
    //console.log("render", this.state.sort_by)
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
            <nav aria-label="...">
              <ul className="pagination">
                <li className="page-item ">
                  <button className="page-link" onClick={this.handlePrev}> Previous</button>
                </li>
                <li className="page-item active" aria-current="page">
                  <button className="page-link" >{this.state.currentPage}</button></li>
                <li className="page-item">
                  <button className="page-link" >{this.state.total_pages}</button>
                </li>

                <li className="page-item">
                  <button className="page-link" onClick={this.handleNext}>Next</button>
                </li>
              </ul>
            </nav>
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
      </div >
    )
  }
}

export default App;
