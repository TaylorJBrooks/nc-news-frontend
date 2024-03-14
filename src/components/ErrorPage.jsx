import { Link } from "react-router-dom";

export default function ErrorPage({error}) {
  return error ?  (
    <h2>{error.data.msg}</h2>
  ) : (
    <div className="error-page">
      <h2>Oh no, it looks like this page doesn't exist anymore.</h2>
      <p>It might have moved or been deleted.</p>
      <Link to='/' id='home-link'>Click here to go back and try again</Link>
    </div>
  )
}
