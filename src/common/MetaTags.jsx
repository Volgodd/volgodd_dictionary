import { Helmet } from "react-helmet";

const MetaTags = () => {
  return (
    <Helmet>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Leckerli+One&family=Roboto:wght@400;500&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  );
};

export default MetaTags;
