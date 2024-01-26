import {Component} from 'react'

import {FaLongArrowAltRight} from 'react-icons/fa'

import LoaderView from '../LoaderView'
import CastDetails from '../CastDetails'
import CrewDetails from '../CrewDetails'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CastCrewDetails extends Component {
  state = {
    castList: [],
    crewList: [],
    visibleCastList: 12,
    visibleCrewList: 12,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCastCrewDetails()
  }

  getCastCrewDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.initial})
    const {castDetails} = this.props
    const {id} = castDetails

    const apiKey = '7232196b484463d86c0a78349527cfd8'
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`

    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      console.log(data.crew)

      const updatedCastData = data.cast.map(each => ({
        id: each.id,
        adult: each.adult,
        castId: each.cast_id,
        characterName: each.character,
        creditId: each.credit_id,
        knownDepartment: each.known_for_department,
        name: each.name,
        gender: each.gender,
        popularity: each.popularity,
        profile: each.profile_path,
      }))

      const updatedCrewData = data.crew.map(each => ({
        id: each.id,
        adult: each.adult,
        creditId: each.credit_id,
        job: each.job,
        name: each.name,
        gender: each.gender,
        popularity: each.popularity,
        profile: each.profile_path,
      }))

      this.setState({
        castList: updatedCastData,
        crewList: updatedCrewData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  handleCastShowMore = () => {
    const {castList, visibleCastList} = this.state
    const nextVisiblePhotos = visibleCastList + 12

    if (nextVisiblePhotos > castList.length) {
      this.setState({visibleCastList: castList.length})
    } else {
      this.setState({visibleCastList: nextVisiblePhotos})
    }
  }

  handleCrewShowMore = () => {
    const {crewList, visibleCrewList} = this.state
    const nextVisiblePhotos = visibleCrewList + 12

    if (nextVisiblePhotos > crewList.length) {
      this.setState({visibleCrewList: crewList.length})
    } else {
      this.setState({visibleCrewList: nextVisiblePhotos})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <LoaderView />
    </div>
  )

  renderCastCrewSuccessView = () => {
    const {castList, crewList, visibleCastList, visibleCrewList} = this.state
    const fullCastLength = castList.length === visibleCastList
    const fullCrewLength = crewList.length === visibleCrewList

    return (
      <div className="cast-crew-details-container">
        <div className="cast-crew-details-responsive-container">
          <>
            <h1 className="cast-details-heading">Cast Details</h1>
            <ul className="cast-details-list">
              {castList.slice(0, visibleCastList).map(eachCast => (
                <CastDetails
                  key={eachCast.castId}
                  characterDetails={eachCast}
                />
              ))}
            </ul>
            {fullCastLength ? (
              ''
            ) : (
              <button
                type="button"
                onClick={this.handleCastShowMore}
                className="view-more-button"
              >
                View More <FaLongArrowAltRight size={20} />
              </button>
            )}
          </>
          <>
            <h1 className="cast-details-heading">Crew Details</h1>
            <ul className="cast-details-list">
              {crewList.slice(0, visibleCrewList).map(eachCast => (
                <CrewDetails key={eachCast.creditId} crewDetails={eachCast} />
              ))}
            </ul>
            {fullCrewLength ? (
              ''
            ) : (
              <button
                type="button"
                onClick={this.handleCrewShowMore}
                className="view-more-button"
              >
                View More <FaLongArrowAltRight size={20} />
              </button>
            )}
          </>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <FailureView retry={this.getCastCrewDetails} />
    </div>
  )

  renderCastCrewPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCastCrewSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderCastCrewPage()}</div>
  }
}

export default CastCrewDetails
