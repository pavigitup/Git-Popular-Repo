import './index.css'

const RepositoryItem = props => {
  const {activeLanguage} = props
  const {
    id,
    avatarUrl,
    starsCount,
    issuesCount,
    forksCount,
    name,
  } = activeLanguage

  return (
    <li key={id} className="li">
      <img src={avatarUrl} alt={name} />

      <div className="li-con">
        <h1 className="name">{name}</h1>
        <div className="stars-para">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="icon"
          />
          <p>{starsCount}</p>
        </div>
        <div className="stars-para">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="icon"
          />
          <p>{forksCount}</p>
        </div>
        <div className="stars-para">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="icon"
          />
          <p>{issuesCount}</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
