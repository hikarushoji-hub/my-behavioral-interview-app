// src/components/Register/RegistrationSuccess.tsx
import { FaEnvelope } from 'react-icons/fa';
import styles from './RegistrationSuccess.module.css';
import Link from 'next/link';

const RegistrationSuccess = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <h2 className={styles.title}>確認メールを送信しました</h2>
        <p className={styles.subtitle}>
          メールに記載のリンクをクリックして、登録を完了してください。
        </p>
        <FaEnvelope className={styles.icon} />
        <p className={styles.message}>
          現時点では会員登録が完了していません。メールを確認し、記載されているリンクをクリックして登録を完了してください。
        </p>
        <Link href="/" passHref>
          <button className={styles.homeButton}>ホームに戻る</button>
        </Link>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
