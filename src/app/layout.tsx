import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	icons: ["/favicon.png"]
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className="h-full" lang="en">
			<body className={cn(inter.className, "min-h-screen bg-background font-sans antialiased")}>
				<TooltipProvider>
					{children}
				</TooltipProvider>
			</body>
		</html>
	);
}
