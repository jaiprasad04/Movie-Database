import Loader from 'react-loader-spinner'
import './index.css'

const LoaderView = () => (
  <div className="loader">
    <Loader
      type="Oval"
      height={40}
      color="#009dff"
      className="custom-oval-loader"
    />
  </div>
)

export default LoaderView
