import './index.css'

const FailureView = props => {
  const {retry} = props

  const onClickRetry = () => {
    retry()
  }

  return (
    <div className="failure-responsive-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We are having some trouble to complete your request. Please try again
      </p>
      <button type="button" className="failure-button" onClick={onClickRetry}>
        Retry
      </button>
    </div>
  )
}

export default FailureView
