import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

import classes from "../styles/ErrorPage.module.css";

function Custom404({ statusCode }) {
  const router = useRouter();

  function buttonHandler() {
    router.replace("/");
  }

  // if we get status code from the props render this components
  if (statusCode) {
    return (
      <Fragment>
        <Head>
          <title>Something went wrong</title>
        </Head>
        <div className={classes.content}>
          <h1>something went wrong please try agian later : {statusCode}</h1>
          <div className={classes.action}>
            <button onClick={buttonHandler} className={classes.button}>
              Return to Home
            </button>
          </div>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <div className={classes.content}>
        <h1>The page you are looking for is not available</h1>
        <div className={classes.action}>
          <button onClick={buttonHandler} className={classes.button}>
            Return to Home
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default Custom404;
