// src/components/Feedback/RegisterPrompt.tsx
"use client";

import { useRouter } from 'next/navigation';
import styles from './RegisterPrompt.module.css';

const RegisterPrompt = () => {
  const router = useRouter();

  const handleRegister = () => {
    router.push('/register'); // ユーザー登録ページに遷移
  };

  return (
    <div className={styles.promptContainer}>
      <h2 className={styles.title}>ユーザー登録のご案内</h2>
      <p className={styles.description}>
        より詳細なフィードバックと追加機能をご利用いただくには、ユーザー登録をお勧めします。
      </p>
      <button onClick={handleRegister} className={styles.registerButton}>新規登録する</button>
    </div>
  );
};

export default RegisterPrompt;
