"use client"

import * as React from "react"
import {useEffect} from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger,
    useSidebar
} from "@/components/ui/sidebar"
import {usePathname} from "next/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ClipboardList, LayoutList, NotebookText} from "lucide-react";

export function AppBar() {
    const pathname = usePathname()
    const {open, setOpenMobile} = useSidebar()

    // Hide sidebar on mobile when clicking an item
    useEffect(() => {
        setOpenMobile(false)
    }, [pathname, setOpenMobile])

    return (
        <Sidebar variant="inset" collapsible="icon">
            <SidebarHeader>
                <Avatar className="h-12 w-12 rounded-lg">
                    <AvatarImage src="/logo/256.png"/>
                    <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <h1 className="truncate font-semibold">Meal Hacker</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <p><LayoutList/> Рецепты</p>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <p><ClipboardList /> Список продуктов</p>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <p><NotebookText /> План на неделю</p>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail/>
            <SidebarFooter>
                <SidebarMenu>
                    {!open && (
                        <SidebarMenuItem>
                            <SidebarTrigger/>
                        </SidebarMenuItem>
                    )}
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
