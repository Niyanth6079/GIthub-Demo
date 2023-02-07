import classes from "./Header.module.css";

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Github Demo</div>
    </header>
  );
}

export default Header;
