export default function Navbar() {
  return (
    <nav className="nav">
      <a href="/" className="site_title">
        Property Rental
      </a>
      <ul>
        <li>
          <a href="/buy">Buy</a>
        </li>
        <li>
          <a href="/rent">Rent</a>
        </li>
        <li>
          <a href="/share">Share</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </nav>
  );
}
