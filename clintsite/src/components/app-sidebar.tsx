import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./ui/sidebar";

import { Link } from "react-router";
import Logo from "../assets/icon/Logo";
import { getSidebarItems } from "../utils/getSidberItem";
import { useUserInfoQuery } from "../redux/featuer/auth/auth.api";

// ✅ AppSidebar component
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined);

  console.log(`User role: ${userData?.data?.role}`);

  const data = {
    navMain: getSidebarItems(userData?.data?.role),
  };

  return (
    <Sidebar {...props}>
      {/* ---- Header ---- */}
      <SidebarHeader className="items-center">
        <Link to="/">
          <Logo />
        </Link>
      </SidebarHeader>

      {/* ---- Main Content ---- */}
      <SidebarContent>
        {data?.navMain?.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent className="space-y-3">
              <SidebarMenu className="space-y-3">
                {group?.items?.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton className="text-[16px]" asChild>
                      <Link
                        to={item.url}
                        className="flex items-center gap-3 text-base hover:text-blue-600 transition-colors"
                      >
                        {item.icon && <item.icon size={20} />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>


      {/* ---- Sidebar Rail ---- */}
      <SidebarRail />
    </Sidebar>
  );
}
