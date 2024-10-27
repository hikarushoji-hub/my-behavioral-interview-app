"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import html2pdf from 'html2pdf.js';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState('');
  const feedbackRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // デフォルトのフィードバックメッセージを設定
    const defaultFeedback = 'お疲れ様でした！面接に対しての総合的な評価として、以下の点に注目していただきたいと思います：具体例を交えた回答が非常に効果的でしたが、もう少し詳細な技術的説明を追加するとさらに良くなります。';
    setFeedback(defaultFeedback);

    // 認証状態の確認
    const checkAuthStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuthStatus();
  }, []);

  // PDFのダウンロード機能
  const handleDownloadPDF = () => {
    if (!isAuthenticated) {
      // 未認証の場合は会員登録ページにリダイレクト
      router.push('/register');
      return;
    }

    if (feedbackRef.current) {
      const element = feedbackRef.current;
      const options = {
        margin: 1,
        filename: 'feedback.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      };
      html2pdf().set(options).from(element).save();
    }
  };

  // ユーザー登録ページに遷移
  const handleRegisterRedirect = () => {
    router.push('/register');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-8">
      {/* フィードバック内容 */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">フィードバック内容</h2>
        <div ref={feedbackRef}>
          <p className="text-gray-700">{feedback}</p>
        </div>
        <div className="text-right mt-4">
          <button 
            onClick={handleDownloadPDF} 
            className="bg-gray-800 text-white font-bold py-2 px-4 rounded inline-flex items-center space-x-2"
          >
            <span>📥 フィードバックをダウンロード</span>
          </button>
        </div>
      </div>

      {/* ユーザー登録推奨エリア */}
      <div className="text-center bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-md">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">ユーザー登録のご案内</h3>
        <p className="text-gray-600 mb-6">
          より詳細なフィードバックと追加機能をご利用いただくには、ユーザー登録をお勧めします。
        </p>
        <button 
          onClick={handleRegisterRedirect} 
          className="bg-black text-white font-bold py-3 px-6 rounded text-lg flex items-center justify-center space-x-2"
        >
          <span>🔑 ユーザー登録</span>
        </button>
      </div>
    </div>
  );
};

export default FeedbackPage;
