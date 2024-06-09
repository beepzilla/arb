import '../app/globals.css';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { log } from '../lib/logger';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        log('_app component loaded');
    }, []);
    return <Component {...pageProps} />;
}

export default MyApp;
