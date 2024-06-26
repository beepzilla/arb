import React, { ReactNode, useEffect } from 'react';  // Added useEffect import
import Head from 'next/head';
import Link from 'next/link';
import { log } from '../lib/logger';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    useEffect(() => {
        log('Layout component mounted');
    }, []);

    return (
        <>
            <Head>
                <title>My App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header style={{ position: 'fixed', top: 0, width: '100%', backgroundColor: '#fff', zIndex: 1000 }}>
                <nav>
                    <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
                        <li style={{ margin: '0 10px' }}>
                            <Link href="/">
                                <button>Home</button>
                            </Link>
                        </li>
                        <li style={{ margin: '0 10px' }}>
                            <Link href="/dash">
                                <button>Dashboard</button>
                            </Link>
                        </li>
                        <li style={{ margin: '0 10px' }}>
                            <Link href="/logs">
                                <button>Logs</button>
                            </Link>
                        </li>
                        <li style={{ margin: '0 10px' }}>
                            <Link href="/settings">
                                <button>Settings</button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main style={{ marginTop: '60px' }}>
                {children}
            </main>
        </>
    );
};

export default Layout;
