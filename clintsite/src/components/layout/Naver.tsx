

import { Link } from "react-router"
import Logo from "../../assets/icon/Logo"
import { Button } from "../../lib/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { ModeToggle } from "./Mode.Toggle"
import { authApi, useLogOutMutation, useUserInfoQuery } from "../../redux/featuer/auth/auth.api"
import { useAppDispatch } from "../../redux/hook"
import { role } from "../../constants/role"




// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/tours", label: "Tours", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/admin", label: "Dashboard", role: role.superAdmin },
  { href: "/user", label: "Dashboard", role: role.user },
];

export default function Naver() {

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
    <header className="border-b px-4 md:px-6 container mx-auto">
      <div className="flex h-16 items-center justify-between gap-4">
      
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
                        link.role ===  data?.data?.role && (
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
              <Logo />
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
  )
}
