"use client";

import React, { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <head>
                <title>BEEPZILLA&apos;s ARBITRAGE TRACKING TOOL</title>
            </head>
            <body>
                <div>
                    <header>
                        <h1>BEEPZILLA&apos;s ARBITRAGE TRACKING TOOL</h1>
                        <nav>
                            <ul>
                                <li><Link href="/">Chart</Link></li>
                                <li><Link href="/dash">Dash</Link></li>
                                <li><Link href="/logs">Logs</Link></li>
                                <li><Link href="/settings">Settings</Link></li>
                            </ul>
                        </nav>
                    </header>
                    <main>{children}</main>
                </div>
            </body>
        </html>
    );
};

export default Layout;
