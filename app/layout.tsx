"use client";

import React, { ReactNode } from 'react';
import Link from 'next/link';
import './globals.css'; // Ensure the path points to the correct location

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <head>
                <title>Arb Master</title>
            </head>
            <body className="bg-gray-900 text-white min-h-screen">
                <div className="container mx-auto p-4">
                    <header className="mb-4">
                        <h1 className="text-3xl font-bold mb-4">Arb Master</h1>
                        <nav className="flex space-x-4">
                            <Link href="/"><button className="bg-blue-500 px-3 py-2 rounded">Chart</button></Link>
                            <Link href="/dash"><button className="bg-blue-500 px-3 py-2 rounded">Dash</button></Link>
                            <Link href="/logs"><button className="bg-blue-500 px-3 py-2 rounded">Logs</button></Link>
                            <Link href="/settings"><button className="bg-blue-500 px-3 py-2 rounded">Settings</button></Link>
                        </nav>
                    </header>
                    <main>{children}</main>
                </div>
            </body>
        </html>
    );
};

export default Layout;
