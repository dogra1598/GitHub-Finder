import React, { useState, useEffect } from "react";

import "./GitUserRepos.css";

const reposCount = 5;
const reposSort = "created: asc";

const GitUserRepos = (props) => {
  const userName = props.userName;
  const [repos, setRepos] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${userName}/repos?per_page=${reposCount}&sort=${reposSort}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    )
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.message === "Not Found") {
          setRepos(null);
        } else {
          setRepos(responseData);
        }
      })
      .catch((err) => console.log(err));
  }, [userName]);

  let reposList = null;
  if (repos) {
    reposList = repos.map((repo) => {
      return (
        <div key={repo.id} className="repo">
          <ul>
            <li>
              <div className="repo__name">
                <h2>{repo.name}</h2>
              </div>
              <div className="repo__badges">
                <div className="repo__badge">
                  Stars: {repo.stargazers_count}
                </div>
                <div className="repo__badge">Watchers: {repo.watchers}</div>
                <div className="repo__badge">Forks: {repo.forks_count}</div>
              </div>
            </li>
          </ul>
        </div>
      );
    });
  }

  return (
    <React.Fragment>
      {reposList && <div className="repos__heading">
        <h1>Latest repos</h1>
      </div>}
      {reposList && reposList}
    </React.Fragment>
  );
};

export default GitUserRepos;
