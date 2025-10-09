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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined);

  const data = {
    navMain: getSidebarItems(userData?.data?.role),
  };

  return (
    <Sidebar {...props} className="">
      {/* Header */}
      <SidebarHeader className="items-center ">
        <Link to="/">
          <Logo />
        </Link>
      </SidebarHeader>

      {/* Main Content */}
      <SidebarContent className="bg-gradient-to-br text-white from-slate-900 via-blue-900 to-purple-900">
        {data?.navMain?.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-white">{group.title}</SidebarGroupLabel>
            <SidebarGroupContent className="space-y-3 text-white">
              <SidebarMenu className="space-y-3 text-white">
                {group?.items
                  ?.filter((item) => item.url) // শুধু যাদের url আছে
                  .map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton className="text-[16px] text-white" asChild>
                        <Link
                          to={item.url!} // non-null assertion
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

      {/* Sidebar Rail */}
      <SidebarRail />
    </Sidebar>
  );
}
