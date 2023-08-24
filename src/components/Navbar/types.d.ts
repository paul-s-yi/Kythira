export interface NavLinkProps {
  href: string;
  title: string;
  className: string;
  isDropdown?: boolean;
  menuItems?: NavLinkProps[];
}
