import type {Metadata, Viewport} from "next";
import "./globals.css";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {AppBar} from "@/components/sidebar/app-bar";

export const metadata: Metadata = {
    title: "Meal Hacker",
    description: "Your personal AI meal planner",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
}

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning>
        <SidebarProvider>
            <AppBar/>
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
        </body>
        </html>
    );
}
