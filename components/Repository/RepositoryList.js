import Reposity from "./RepositoryItem";

import classes from "./RepositoryList.module.css";

function RepositoryList(props) {
  let results = [];

  // return this code when no results are available to show
  if (props.data.length === 0) {
    return (
      <div className={classes.noData}>
        <p>No results to show</p>
      </div>
    );
  }

  if (props.data.length > 0) {
    return (
      <ul className={classes.list}>
        {
          (results = props.data.map((repo) => (
            <Reposity
              key={repo.node.id}
              name={repo.node.nameWithOwner}
              desc={repo.node.description}
              id={repo.node.id}
              language={repo.node.primaryLanguage}
            />
          )))
        }
      </ul>
    );
  }
}

export default RepositoryList;
