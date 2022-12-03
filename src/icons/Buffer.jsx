import { Helmet } from "react-helmet";
import styles from "./IconsStyles.module.scss";

const Buffer = () => {
  return (
    <div>
      <Helmet>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      </Helmet>

      <span className={styles.bufferIcon}>description</span>
    </div>
  );
};

export default Buffer;
