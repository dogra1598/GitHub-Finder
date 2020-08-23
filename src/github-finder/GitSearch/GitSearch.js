import React from "react";

import Input from "../../ui-element/Input/Input";
import "./GitSearch.css";

const GitSearch = (props) => {
  return (
    <div className="gitSearch">
      <div className="gitSearch__title">
        <h1>Search Github Users</h1>
      </div>
      <Input
        id="username"
        type="text"
        placeholder="Github username..."
        label="Enter a username to fetch a users profile info and repos"
        className="gitSearch__input"
        onChange={props.onChangeHandler}
      />
    </div>
  );
};

export default GitSearch;
