export default function Header() {
  return (
    <header className="header">
      <div className="app-title">Retirement Planner</div>
      <nav className="header-nav">
        <ul>
          <li>My snapshots</li>
          <li>My scenarios</li>
          <li>Learn more ?</li>
        </ul>
      </nav>
      <div className="user-icon"></div>
    </header>
  );
}
