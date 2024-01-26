import {Component} from 'react'

import Header from '../Header'
import LoaderView from '../LoaderView'
import MovieItem from '../MovieItem'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchMovies extends Component {
  state = {
    searchedMoviesList: [],
    pagesList: [],
    searchInput: '',
    paginationNumber: 1,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getSearchMovies()
  }

  getSearchMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, paginationNumber} = this.state
    const apiKey = '7232196b484463d86c0a78349527cfd8'
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchInput}&page=${paginationNumber}`

    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      // console.log(data)

      const updatedData = data.results.map(eachMovie => ({
        id: eachMovie.id,
        adult: eachMovie.adult,
        originalLanguage: eachMovie.original_language,
        backdropPath: eachMovie.backdrop_path,
        posterPath: eachMovie.poster_path,
        overview: eachMovie.overview,
        title: eachMovie.title,
        popularity: eachMovie.popularity,
        releaseDate: eachMovie.release_date,
        ratingAverage: eachMovie.vote_average,
        ratingCount: eachMovie.vote_count,
      }))

      // console.log(updatedData)

      const pageData = {
        page: data.page,
        totalPages: data.total_pages,
        totalResults: data.total_results,
      }

      this.setState({
        searchedMoviesList: updatedData,
        pagesList: pageData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onSearchInput = text => {
    this.setState({searchInput: text}, this.getSearchMovies)
  }

  onClickPrevious = () => {
    const {paginationNumber} = this.state
    if (paginationNumber > 1) {
      this.setState(
        prevState => ({paginationNumber: prevState.paginationNumber - 1}),
        this.getSearchMovies,
      )
    }
  }

  onClickNext = () => {
    const {paginationNumber, pagesList} = this.state
    if (paginationNumber < pagesList.totalPages) {
      this.setState(
        prevState => ({
          paginationNumber: prevState.paginationNumber + 1,
        }),
        this.getSearchMovies,
      )
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <LoaderView />
    </div>
  )

  renderFailureView = () => <FailureView retry={this.getSearchMovies} />

  renderSuccessView = () => {
    const {
      searchedMoviesList,
      searchInput,
      pagesList,

      paginationNumber,
    } = this.state

    return (
      <>
        {searchedMoviesList.length === 0 ? (
          <div className="no-search-view">
            <img
              src="https://res.cloudinary.com/dkwwcq9yc/image/upload/v1702828264/Group_7394_zkdmin.png"
              alt="no movies"
              className="no-search-result-img"
            />
            <p className="no-search-description">
              Your search for {searchInput} did not find any matches.
            </p>
          </div>
        ) : (
          <>
            <p className="total-results">
              Total Results:{' '}
              <span className="total-movies">
                {pagesList.totalResults} Movies
              </span>
            </p>
            <ul className="searched-movie-item-list">
              {searchedMoviesList.map(eachMovie => (
                <MovieItem key={eachMovie.id} videosList={eachMovie} />
              ))}
            </ul>
            <div className="pagination-container">
              <button
                type="button"
                onClick={this.onClickPrevious}
                className="pagination-button"
              >
                Prev
              </button>
              <p className="pagination-number">
                Page {paginationNumber} of {pagesList.totalPages}
              </p>
              <button
                type="button"
                onClick={this.onClickNext}
                className="pagination-button"
              >
                Next
              </button>
            </div>
          </>
        )}
      </>
    )
  }

  renderEmptyView = () => {
    const {searchInput} = this.state
    const isEmpty = searchInput === ''

    return (
      <>
        {isEmpty ? (
          <>
            <p className="no-search-description">
              Search by Movie Name and click Search button
            </p>
          </>
        ) : (
          this.renderSuccessView()
        )}
      </>
    )
  }

  renderSearchResults = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderEmptyView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header onSearchInput={this.onSearchInput} />
        <div className="search-movie-container">
          <div className="searched-movie-container">
            {this.renderSearchResults()}
          </div>
        </div>
      </>
    )
  }
}

export default SearchMovies
