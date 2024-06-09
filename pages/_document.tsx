import { Html, Head, Main, NextScript } from 'next/document';
import { useEffect } from 'react';
import { log } from '../lib/logger';

export default function Document() {
    useEffect(() => {
        log('_document component loaded');
    }, []);
    return (
        <Html>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
