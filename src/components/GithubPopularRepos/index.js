import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    repoList: [],
    activeLanguage: languageFiltersData[0].id,
    isLoading: true,
    failedResponse: false,
  }

  componentDidMount() {
    this.getRepos()
  }

  changeRepo = activeLanguage => {
    this.setState({activeLanguage, isLoading: true}, this.getRepos)
  }

  getRepos = async () => {
    const {activeLanguage} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`

    const response = await fetch(apiUrl)
    if (response.ok !== true) {
      this.setState({isLoading: false, failedResponse: true})
    } else {
      const data = await response.json()

      const updatedData = data.popular_repos.map(each => ({
        id: each.id,
        name: each.name,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({repoList: updatedData, isLoading: false})
    }
  }

  render() {
    const {repoList, isLoading, activeLanguage, failedResponse} = this.state

    return (
      <div className="bg-con">
        <h1 className="popular-heading">Popular</h1>
        <ul className="header">
          {languageFiltersData.map(language => (
            <LanguageFilterItem
              key={language.id}
              languages={language}
              changeRepo={this.changeRepo}
              isActive={language.id === activeLanguage}
            />
          ))}
        </ul>
        <div>
          {isLoading ? (
            <div data-testid="loader">
              <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
            </div>
          ) : (
            <div>
              {failedResponse ? (
                <div className="not-fetch">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
                    alt="failure view"
                    className="fail"
                  />
                </div>
              ) : (
                <ul className="repo-con">
                  {repoList.map(eachRepo => (
                    <RepositoryItem
                      key={eachRepo.id}
                      activeLanguage={eachRepo}
                    />
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
