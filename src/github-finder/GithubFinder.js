import React, { useState } from "react";

import sprite from "../assets/images/sprites.svg";
import GitSearch from "./GitSearch/GitSearch";
import GitUser from "./GitUser/GitUser";
import "./GithubFinder.css";

const GithubFinder = () => {
  const [userName, setUserName] = useState(null);

  const onChangeHandler = (event) => {
    setUserName(event.target.value);
  };

  return (
    <div className="githubfinder">
      <div className="githubfinder__title">
        <svg className="git__svg">
          <use href={sprite + "#icon-github"} />
        </svg>
        <h1>Github Finder</h1>
      </div>
      <GitSearch onChangeHandler={onChangeHandler} />
      {userName && <GitUser userName={userName} />}
      <footer className="githubfinder__footer">Github Finder&copy;</footer>
    </div>
  );
};

export default GithubFinder;
