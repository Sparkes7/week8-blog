import style from "./NavBar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className={style.nav}>
      <Link
        href="/"
        className={
          pathname === "/"
            ? " bg-green-700 border-b-5 border-b-green-700"
            : "border-b-5 border-b-green-700"
        }
      >
        Home
      </Link>
      <Link
        href="/blog"
        className={
          pathname === "/blog"
            ? " bg-blue-700 border-b-5 border-b-blue-700"
            : " border-b-5 border-b-blue-700"
        }
      >
        blog
      </Link>
      <Link
        href="/contact"
        className={
          pathname === "/contact"
            ? " bg-yellow-700 border-b-5 border-b-yellow-700"
            : " border-b-5 border-b-yellow-700"
        }
      >
        contact
      </Link>
    </nav>
  );
}
