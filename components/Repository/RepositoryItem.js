import { useRouter } from "next/router";
import Card from "../ui/Card";

import classes from "./RepositoryItem.module.css";

function Reposity(props) {
  const router = useRouter();

  function showDetails() {
    router.push(`/repository/${props.id}`);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.title}>
          <h4>{props.name}</h4>
        </div>

        <div className={classes.content}>
          <p>{props.desc}</p>
        </div>

        <div className={classes.actions}>
          <button onClick={showDetails}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default Reposity;
