import { useRouter } from "next/router";
import Card from "../ui/Card";

import classes from "./RepositoryDetails.module.css";

function RepositoryDetials({ data }) {
  const router = useRouter();

  // changing date format
  const createdDate = data.createdAt
    .slice(0, 10)
    .split("-")
    .reverse()
    .join("-");

  // changing date format
  const pushedDate = data.pushedAt.slice(0, 10).split("-").reverse().join("-");

  // creating list of topics
  const topics = data.repositoryTopics.edges.map((el) => (
    <span className={classes.topic} key={el.node.topic.name}>
      {el.node.topic.name}
    </span>
  ));

  function buttonHandler() {
    router.push("/");
  }

  return (
    <Card>
      <div className={classes.content}>
        <h2 className={classes.title}>{data.nameWithOwner}</h2>

        <p className={classes.description}>
          <b>Description:</b> {data.description}
        </p>

        {topics.length > 0 && <div className={classes.topics}>{topics}</div>}

        {data.primaryLanguage && (
          <p className={classes.language}>
            <b>Primary Language: </b>
            {data.primaryLanguage.name}
          </p>
        )}

        <p className={classes.date}>
          <b>Created Date: </b>
          {createdDate}
        </p>

        <p className={classes.date}>
          <b>Last Pushed Date: </b>
          {pushedDate}
        </p>

        <p className={classes.count}>
          <b>Number Of Forks: </b> {data.forks.totalCount}
        </p>

        <p className={classes.count}>
          <b>Number Of Stars: </b> {data.stargazers.totalCount}
        </p>

        <div className={classes.actions}>
          <a href={data.url} target="_blank" rel="noreferrer">
            Head To Github Repository
          </a>
          <button onClick={buttonHandler}>Home Page</button>
        </div>
      </div>
    </Card>
  );
}

export default RepositoryDetials;
