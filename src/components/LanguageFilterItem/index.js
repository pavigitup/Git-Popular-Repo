import './index.css'

const LanguageFilterItem = props => {
  const {languages, changeRepo, isActive} = props
  const {id, language} = languages

  const changeLanguageRepo = () => {
    changeRepo(id)
  }

  return (
    <li key={id}>
      <button
        type="button"
        onClick={changeLanguageRepo}
        className={isActive ? 'button' : ''}
      >
        <p>{language}</p>
      </button>
    </li>
  )
}

export default LanguageFilterItem
