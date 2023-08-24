import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faC, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { NavLinkProps } from "./types";
import { forwardRef } from "react";
const NavLink = forwardRef((props: NavLinkProps, ref) => {
  const { href, className, title, isDropdown } = props;
  const pathname = usePathname();
  const spacing = isDropdown ? " " : "";
  return (
    <Link
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      className={`${className} relative group`}
    >
      {`${title}${spacing}`}
      <span
        className={`h-[10px] inline-block bg-dark dark:bg-light absolute left-0 -bottom-0.5 group-hover:w-full transition:[width] ease duration-250 ${
          pathname === href ? "w-full" : "w-0"
        }
      `}
      >
        &nbsp;
      </span>
      {isDropdown ? <FontAwesomeIcon icon={faChevronDown} /> : null}
    </Link>
  );
});

export default NavLink;
