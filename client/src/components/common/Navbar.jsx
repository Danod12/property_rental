import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Property Rental</Link>
        </li>
        <li>
          <Link to="/rent">Rent</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}
