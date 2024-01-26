import './index.css'

const CrewDetails = props => {
  const {crewDetails} = props
  const {name, job, profile, gender} = crewDetails

  const genderSpecilization =
    gender === 1
      ? 'https://qph.cf2.quoracdn.net/main-qimg-1664fff485408ef7ece9e82224baa5cc'
      : 'https://msfsouthasia.org/wp-content/uploads/2022/07/MicrosoftTeams-image-3.jpg'

  const profileImage = profile
    ? `https://image.tmdb.org/t/p/w500${profile}`
    : genderSpecilization

  return (
    <li className="crew-details-list-item">
      <img src={profileImage} alt="" className="cast-details-profile" />
      <div className="crew-details-names-container">
        <p className="crew-details-name">{name}</p>
        <p className="crew-details-character-name">{job}</p>
      </div>
    </li>
  )
}

export default CrewDetails
