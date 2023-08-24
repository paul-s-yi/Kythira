"use client";
import { useState } from "react";
import useModeToggle from "../hooks/useModeToggle";
import NavLink from "./NavLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { NavLinkProps } from "./types";
import { Popover, Transition } from "@headlessui/react";
const Navbar = () => {
  const [mode, setMode] = useModeToggle();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleBurgerClick = () => {
    setIsOpen(!isOpen);
  };

  const navLinkItems: NavLinkProps[] = [
    {
      title: "Kythira",
      href: "/",
      className: "mr-4",
    },
    {
      title: "Product",
      href: "/product",
      className: "mx-4",
      isDropdown: true,
      menuItems: [
        {
          title: "Analytics",
          href: "/product/analytics",
          className: "",
        },
      ],
    },
    {
      title: "Resources",
      href: "/resources",
      className: "mx-4",
      isDropdown: true,
      menuItems: [
        {
          title: "Resource Center",
          href: "/resources",
          className: "",
        },
        {
          title: "Documentation",
          href: "/docs",
          className: "",
        },
      ],
    },
  ];

  const BurgerMenu = () => {
    return (
      <button
        className="flex-col justify-center items-center hidden lg:flex"
        onClick={handleBurgerClick}
      >
        <span
          className={`bg-dark dark:bg-light block transition-all duration-250 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light block transition-all duration-250 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light block transition-all duration-250 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
          }`}
        ></span>
      </button>
    );
  };

  return (
    <header className="w-full px-16 py-8 font-medium flex items-center justify-between relative dark:text-light z-10">
      <BurgerMenu />
      <div className="w-full flex justify-between items-center">
        <nav className="flex flex-row">
          {navLinkItems.map((item, idx) => {
            if (item.menuItems) {
              return (
                <Popover className="relative" key={`${item.title}-menu-${idx}`}>
                  {({ open }) => (
                    <>
                      <Popover.Button className="mx-4">
                        {`${item.title} `}
                        {open ? (
                          <FontAwesomeIcon icon={faChevronUp} />
                        ) : (
                          <FontAwesomeIcon icon={faChevronDown} />
                        )}
                      </Popover.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-75 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-100 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-75 opacity-0"
                      >
                        <Popover.Panel className="absolute z-10 mt-3 w-screen transform px-4 grid grid-cols-2">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                              {item.menuItems?.map((subItem, subIdx) => {
                                return (
                                  <NavLink
                                    key={`${subItem.title}-panel-item-${subIdx}`}
                                    {...subItem}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              );
            }
            return <NavLink key={`${item.title}-${idx}`} {...item} />;
          })}
        </nav>
        <nav className="flex items-center justify-center flex-wrap">
          <button
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            className={`flex items-center justify-center rounded-full p-1 ${
              mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
            }`}
          >
            {mode === "dark" ? (
              <FontAwesomeIcon icon={faSun} className={"fill-dark"} />
            ) : (
              <FontAwesomeIcon icon={faMoon} className={"fill-dark"} />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
