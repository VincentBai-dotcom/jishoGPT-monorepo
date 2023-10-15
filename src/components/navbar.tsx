export default function NavBar() {
  return (
    <div className="navbar bg-base-100 absolute">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">KnowYourWord.ai</a>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Blog</a>
          </li>
          <li>
            <a>About</a>
          </li>
        </ul>
        <a className="btn mx-2">Sign In</a>
        <a className="btn mx-2">Upgrade</a>
      </div>
    </div>
  );
}
