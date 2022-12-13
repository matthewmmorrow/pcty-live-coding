import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Frontend Challenge</title>
      </Head>

      <main className={styles.container}>
        <h1 className='text-purple-900 text-center underline text-2xl'>
          Welcome!
        </h1>
      </main>
    </div>
  )
}
