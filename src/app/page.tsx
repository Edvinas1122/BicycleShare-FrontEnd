import Image from 'next/image'
import styles from './page.module.css'
import InfoPage from '@/components/infoPage'

export default async function Home() {
  return (
    <main className={styles.main}>
      <InfoPage />
    </main>
  )
}
