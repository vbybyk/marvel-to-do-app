import { Link } from "react-router-dom";
import ErrorPage from "../error/Error404";

const Error404 = () => {
  return(
    <div>
        <ErrorPage/>
        <p>Page is not found</p>
        <Link to="/">Main page</Link>
    </div>
  )
}
export default Error404;
