import type {Metadata} from "next";
import "./globals.css";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {AppBar} from "@/components/sidebar/app-bar";

export const metadata: Metadata = {
    title: "Meal Hacker",
    description: "Your personal AI meal planner",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body>
        <SidebarProvider>
            <AppBar/>
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
        </body>
        </html>
    );
}
