import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="fixed top-0 left-0 w-full bg-white border-b border-black/20 z-[999] h-16 flex justify-center items-center">
      <Link to={"/"}>
        <img src="/images/logo2.svg" alt="Moodie Logo" width={80} />
      </Link>
    </div>
  );
}

export default Header;
