import React, { useEffect, useState } from "react";

import GitUserRepos from "./GitUserRepos/GitUserRepos";
import "./GitUser.css";

const GitUser = (props) => {
  const userName = props.userName;
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    )
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.message === "Not Found") {
          setError(`Sorry No user found with username "${userName}"`);
          setUser(null);
        } else {
          setUser(responseData);
          setError(null);
        }
      })
      .catch((err) => {
        setError("Network error! can't fetch the data");
      });
  }, [userName]);

  const onClickHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {error && (
        <div onClick={onClickHandler} className="error">
          <h1>{error}</h1>
        </div>
      )}
      {user && (
        <div className="gituser">
          <div className="gituser__avatar">
            <img src={user.avatar_url} alt={user.name} />
            <a
              className="gituser__btn"
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Profile
            </a>
          </div>
          <div className="gituser__profile">
            <div className="gituser__profile__badges">
              <div className="gituser__profile__badge badge1">
                Public Repos: {user.public_repos}
              </div>
              <div className="gituser__profile__badge badge2">
                Public Gists: {user.public_gists}
              </div>
              <div className="gituser__profile__badge badge3">
                Followers: {user.followers}
              </div>
              <div className="gituser__profile__badge badge4">
                Following: {user.following}
              </div>
            </div>
            <div className="gituser__profile__info">
              <ul>
                <li>Company: {user.company ? user.company : "null"}</li>
                <li>Website/Blog: {user.blog ? user.blog : "null"}</li>
                <li>Location: {user.location ? user.location : "null"}</li>
                <li>Member Since: {user.created_at}</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {user && <GitUserRepos userName={userName} />}
    </React.Fragment>
  );
};

export default GitUser;
