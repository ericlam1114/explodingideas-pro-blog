import Image from "next/image";
import Link from "next/link";
import logoDark from "../public/images/logoDark.png";
import logo from "../public/images/logo.png";

const Header = () => {
  return (
    <div className="w-full h-20 font-titleFont sticky top-0 bg-yellow-300 z-50 px-4">
      <div className="max-w-7xl h-full mx-auto flex justify-between items-center">
        <Link href="/">
          <div>
            <Image width={120} height={120} src={logo} alt="logo" />
          </div>
        </Link>
        <div>
          <ul className="hidden lg:inline-flex gap-8 uppercase text-sm font-semibold">
            <li className="headerLi">
              <Link href="/">Home</Link>
            </li>
            <li className="headerLi">
              <Link href="/research">Research</Link>
            </li>
            <li className="headerLi"><Link href="/education">Education</Link></li>
            <li className="headerLi"><Link href="/network">Network</Link></li>
            <li className="headerLi"><a href="https://slack.com/" target="_blank">Community</a></li>
          </ul>
        </div>
        <div className="flex items-center gap-8 text-lg">
          <div className="flex items-center gap-1">
            👋
            <p className="text-sm font-medium">Hello Stranger!</p>
          </div>

          <button className="uppercase text-sm border-primaryColor bg-black text-white hover:border-secondaryColor px-4 py-2 hover:scale-95 hover:text-white rounded-md transition-all duration-300">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
