// src/components/Register/Register.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './Register.module.css';
import RegistrationSuccess from './RegistrationSuccess';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const handleRegister = async () => {
    setErrorMessage('');

    if (!email || !password || !confirmPassword) {
      setErrorMessage("全てのフィールドを入力してください。");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("パスワードが一致しません。");
      return;
    }

    // ここでメール認証の仮実装
    setRegistrationComplete(true);
  };

  if (registrationComplete) {
    return <RegistrationSuccess />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>新規登録</h2>
      <p className={styles.subtitle}>アカウントを作成してください。</p>

      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        placeholder="パスワード（確認用）"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleRegister} className={styles.registerButton}>
        登録する
      </button>

      <p className={styles.linkText}>
        アカウントをお持ちの方は <Link href="/login">ログインはこちら</Link>
      </p>
    </div>
  );
};

export default Register;
