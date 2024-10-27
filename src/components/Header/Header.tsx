"use client";

import Link from 'next/link';
import styles from './Header.module.css';
import Image from 'next/image';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image src="/logo.png" alt="Service Logo" width={40} height={40} />
        <span className={styles.serviceName}>GEEK OFFER 模擬面接</span>
      </div>
      <nav className={styles.navLinks}>
        <Link href="/login">ログイン</Link>
        <Link href="/register">新規登録</Link>
      </nav>
    </header>
  );
};

export default Header;
