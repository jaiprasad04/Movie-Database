import './index.css'

const CastDetails = props => {
  const {characterDetails} = props
  const {name, characterName, profile, gender} = characterDetails

  const genderSpecilization =
    gender === 1
      ? 'https://qph.cf2.quoracdn.net/main-qimg-1664fff485408ef7ece9e82224baa5cc'
      : 'https://msfsouthasia.org/wp-content/uploads/2022/07/MicrosoftTeams-image-3.jpg'

  const profileImage = profile
    ? `https://image.tmdb.org/t/p/w500${profile}`
    : genderSpecilization

  return (
    <li className="cast-details-list-item">
      <img src={profileImage} alt="" className="cast-details-profile" />
      <div className="cast-details-names-container">
        <p className="cast-details-name">{name}</p>
        <p className="cast-details-character-name">{characterName}</p>
      </div>
    </li>
  )
}

export default CastDetails
