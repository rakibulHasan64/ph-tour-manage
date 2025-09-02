import { AppSidebar } from "../app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
;
import { Separator } from "../ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";


export default function DasbordLayout() {
   return (
      <SidebarProvider>
         <AppSidebar />
         <SidebarInset>
            <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
               <SidebarTrigger className="-ml-1" />
               <Separator orientation="vertical" className="mr-2 h-4" />
               <Breadcrumb>
                  <BreadcrumbList>
                     <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">
                           Building Your Application
                        </BreadcrumbLink>
                     </BreadcrumbItem>
                     <BreadcrumbSeparator className="hidden md:block" />
                     <BreadcrumbItem>
                        <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                     </BreadcrumbItem>
                  </BreadcrumbList>
               </Breadcrumb>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">
               {Array.from({ length: 24 }).map((_, index) => (
                  <div
                     key={index}
                     className="bg-muted/50 aspect-video h-12 w-full rounded-lg"
                  />
               ))}
            </div>
         </SidebarInset>
      </SidebarProvider>
   )
}
