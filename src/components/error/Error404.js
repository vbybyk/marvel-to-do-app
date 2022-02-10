import gif from "./marvel-404-gif.gif";

const ErrorPage = () => {
  return(
    <img src={gif} style={{display: "block", overflow: "hidden", width: "550px", height: "260px", objectFit: "cover"}}alt="error"/>
  )
}

export default ErrorPage;