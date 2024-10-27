"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  return (
    <header className="header">
      {/* 左側のロゴとサービス名 */}
      <div className="logo-container" onClick={() => router.push('/')}>
        <Image src="/logo.png" alt="サービスロゴ" width={40} height={40} /> {/* ロゴ画像 */}
        <span className="service-name">GEEK OFFER 模擬面接</span>
      </div>

      {/* 右側のナビゲーションリンク */}
      <div className="nav-links">
        <Link href="/login">ログイン</Link>
        <Link href="/register">新規登録</Link>
      </div>
    </header>
  );
};

export default Header;
