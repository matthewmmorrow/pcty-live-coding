import Document, {Head, Html, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="icon" href="/favicon.ico"/>

                    <link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>

                    <meta property='og:title' content='Live Coding Demo'/>
                    <meta property='og:description' content='A challenge, done live'
                    />
                    <meta property='og:site_name' content='Live Coding Demo'/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}