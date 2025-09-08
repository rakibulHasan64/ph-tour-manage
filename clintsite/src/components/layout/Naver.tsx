

import { Link } from "react-router"
import { Button } from "../../lib/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { ModeToggle } from "./Mode.Toggle"
import { authApi, useLogOutMutation, useUserInfoQuery } from "../../redux/featuer/auth/auth.api"
import { useAppDispatch } from "../../redux/hook"
import { role } from "../../constants/role"
import { Settings } from "lucide-react"
import { useState } from "react"




// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/tours", label: "Tours", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/admin", label: "", role: role.superAdmin },

];

export default function Naver() {
  const [open, setOpen] = useState(false);
  const {data } = useUserInfoQuery(undefined);
  const [logOut] = useLogOutMutation();
  const dispatch=useAppDispatch()
  console.log("user email me", data?.data?.email, data?.data?.role);

  const hadleLogout = async () => {
    try {
      await logOut(undefined).unwrap();
      dispatch(authApi.util.resetApiState()); // সব cache clear
       // 👈 user info আবার আনবে
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="bg-white/5">
      <header className="border-b border-black px-4 md:px-6 container mx-auto ">
        <div className="flex  h-[90px] items-center justify-between gap-4">

          {/* Left side */}
          <div className="flex items-center gap-2">
            {/* Mobile menu trigger */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group size-8 md:hidden"
                  variant="ghost"
                  size="icon"
                >
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-36 p-1 md:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                    {navigationLinks.map((link, index) => (
                      <>

                        {
                          link.role === "PUBLIC" && (
                            <NavigationMenuItem key={index} className="w-full">
                              <NavigationMenuLink
                                asChild
                                className="py-1.5"

                              >
                                <Link to={link.href}>{link.label}</Link>

                              </NavigationMenuLink>
                            </NavigationMenuItem>

                          )

                        }

                        {
                          link.role === data?.data?.role && (
                            <NavigationMenuItem key={index} className="w-full">
                              <NavigationMenuLink
                                asChild
                                className="py-1.5"

                              >
                                <Link to={link.href}>{link.label}</Link>

                              </NavigationMenuLink>
                            </NavigationMenuItem>

                          )

                        }


                        {
                          link.role === "PUBLIC" && (
                            <NavigationMenuItem key={index} className="w-full">
                              <NavigationMenuLink
                                asChild
                                className="py-1.5"

                              >
                                <Link to={link.href}>{link.label}</Link>

                              </NavigationMenuLink>
                            </NavigationMenuItem>

                          )

                        }


                      </>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
            {/* Main nav */}
            <div className="flex items-center gap-6">
              <a href="#" className="text-primary hover:text-primary/90">
                <img className="w-45 h-36 object-cover" src="/Untitled_design-removebg-preview.png" alt="" />
              </a>
              {/* Navigation menu */}
              <NavigationMenu className="max-md:hidden">
                <NavigationMenuList className="gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        href={link.href}
                        className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                      >

                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          {/* Right side */}
          <div className="flex items-center gap-2">
            <ModeToggle />

            <div className="relative inline-block text-left">
              {/* Settings button */}
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-100"
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>

              {/* Dropdown menu */}
              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg overflow-hidden z-50">
                  <Link to={"/Forgot-Password"}>  <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                    Forgot Password
                  </button></Link>
                  <Link to={"/Reset-Password"}><button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                    Reset Password
                  </button></Link>
                  <Link to={"/Change-Password"}><button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                    Change Password
                  </button></Link>

                  <Link to={"/Change-Password"}><button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                    Set Password
                  </button></Link>
                </div>
              )}
            </div>

            {data?.data?.email ? (
              <Button onClick={hadleLogout} variant="outline" size="sm" className="text-sm">
                LogOut
              </Button>
            ) : (
              <Button asChild variant="ghost" size="sm" className="text-sm bg-cyan-500">
                <Link to={"/login"}>Login</Link>
              </Button>
            )}




          </div>
        </div>
      </header>
    </div>
  )
}
