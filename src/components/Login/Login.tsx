// src/components/Login/Login.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage("メールアドレスとパスワードを入力してください。");
      return;
    }
    // ここにログイン処理を追加
    console.log("ログイン処理実行");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>ログイン</h2>
      <p className={styles.subtitle}>アカウントにサインインしてください。</p>

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
      <button onClick={handleLogin} className={styles.loginButton}>
        ログイン
      </button>

      <p className={styles.linkText}>
        アカウントをお持ちでない方は <Link href="/register">新規登録はこちら</Link>
      </p>
    </div>
  );
};

export default Login;
