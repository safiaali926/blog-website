import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import SocialMedia from "./SocialMedia";
 

export default function Navbar() {
  return (
    <header className=" flex items-center justify-between xs:flex-row py-2 border-b-2 border-[#9c1313] sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 px-4">
      <nav className=" flex md:flex md:items-center md:justify-center md:gap-x-24 font-bold ">
        <Link href={"/"} className="text-2xl text-[#535353] dark:text-light">
        Threads & <span className="text-2xl text-[#9c1313]">Trends</span>
        </Link>
        <Link href={"/blogs"} className="bg-accentDarkSecondary px-4 py-1 rounded-lg text-dark ">Blogs</Link>
      </nav>
      <SocialMedia />
      <ThemeToggle />
    </header>
  );
}