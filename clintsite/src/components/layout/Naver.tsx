import { Link, useLocation } from "react-router";
import { Button } from "../../lib/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Settings, LogIn, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  authApi,
  useLogOutMutation,
  useUserInfoQuery,
} from "../../redux/featuer/auth/auth.api";
import { useAppDispatch } from "../../redux/hook";
import { role } from "../../constants/role";

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/tours", label: "Tours", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/admin", label: "", role: role.superAdmin },
];

export default function Naver() {
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { data } = useUserInfoQuery(undefined);
  const [logOut] = useLogOutMutation();
  const dispatch = useAppDispatch();

  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logOut(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
      dispatch(authApi.util.invalidateTags(["USER"]));
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    } else {
      setIsScrolled(false);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const isFixed = location.pathname === "/";

  return (
    <nav
      className={`
        ${isFixed ? "fixed top-0 left-0 w-full z-50 text-black" : "relative text-black"}
        transition-all duration-500
        ${isScrolled ? "bg-white/30 shadow-md  py-3" : "bg-transparent text-black py-3"}
      `}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold ">
          Travel
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-black">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    href={link.href}
                    className=" hover:text-cyan-400 transition-colors duration-300 font-medium"
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-3">
          {/* Settings */}
          <div className="relative text-black">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-100"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black border rounded-xl shadow-lg overflow-hidden z-50">
                <Link to="/Reset-Password">
                  <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                    Reset Password
                  </button>
                </Link>
                <Link to="/Change-Password">
                  <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                    Change Password
                  </button>
                </Link>
                <Link to="/Set-Password">
                  <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                    Set Password
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Login / Logout */}
          {data?.data?.email ? (
            <Button onClick={handleLogout} className="text-sm">
              Logout
            </Button>
          ) : (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-sm bg-cyan-500 gap-2 text-white"
            >
              <Link to="/login">
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-white/30 backdrop-blur-xl text-black px-6 py-4 space-y-4 transition-all duration-300">
          {navigationLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              onClick={() => setMobileMenu(false)}
              className="block text-lg font-medium  hover:text-cyan-400 transition"
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t border-gray-700 pt-4">
            {data?.data?.email ? (
              <Button
                onClick={handleLogout}
                className="w-full bg-cyan-500 text-white"
              >
                Logout
              </Button>
            ) : (
              <Button
                asChild
                className="w-full bg-cyan-500 text-white flex justify-center gap-2"
              >
                <Link to="/login">
                  <LogIn className="w-4 h-4" /> Login
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}



{/* Left side */ }


// <div className="flex items-center justify-between gap-2">
//   {/* Mobile menu trigger */}
//   <Popover>
//     <PopoverTrigger asChild>
//       <Button
//         className="group size-8 md:hidden"
//         variant="ghost"
//         size="icon"
//       >
//         <svg
//           className="pointer-events-none"
//           width={16}
//           height={16}
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M4 12L20 12"
//             className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
//           />
//           <path
//             d="M4 12H20"
//             className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
//           />
//           <path
//             d="M4 12H20"
//             className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
//           />
//         </svg>
//       </Button>
//     </PopoverTrigger>
//     <PopoverContent align="start" className="w-36 p-1 md:hidden">
//       <NavigationMenu className="max-w-none *:w-full">
//         <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
//           {navigationLinks.map((link, index) => {
//             const canView =
//               link.role === "PUBLIC" || link.role === data?.data?.role;

//             if (!canView) return null;

//             return (
//               <NavigationMenuItem key={index} className="w-full flex items-center justify-center">
//                 <NavigationMenuLink asChild className="py-1.5">
//                   <Link to={link.href}>{link.label || "Dashboard"}</Link>
//                 </NavigationMenuLink>
//               </NavigationMenuItem>
//             );
//           })}
//         </NavigationMenuList>
//       </NavigationMenu>
//     </PopoverContent>

//   </Popover>
//   {/* Main nav */}
//   <div className="flex justify-between items-center gap-6">
//     <Link to={"/"} className="text-primary hover:text-primary/90">
//       {/* <img className="hidden sm:block w-45 h-36 object-cover" src="/Untitled_design-removebg-preview.png" alt="" /> */}
//       <span className="text-2xl hidden sm:block">Travel</span>
//     </Link>
//     {/* Navigation menu */}
//     <NavigationMenu className="max-md:hidden ">
//       <NavigationMenuList className="">
//         {navigationLinks.map((link, index) => (
//           <NavigationMenuItem key={index}>
//             <NavigationMenuLink
//               href={link.href}
//               className="text-black hover:text-primary py-1.5 font-medium"
//             >

//               {link.label}
//             </NavigationMenuLink>
//           </NavigationMenuItem>
//         ))}
//       </NavigationMenuList>
//     </NavigationMenu>
//   </div>
// </div>
