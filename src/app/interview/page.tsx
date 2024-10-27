// src/app/interview/page.tsx

"use client";

import InterviewChat from '../../components/InterviewChat'; // 面接チャットコンポーネントをインポート

const InterviewPage = () => {
  return (
    <div className="flex p-4">
      {/* メインコンテンツ - 対話エリア */}
      <main className="flex-1 bg-white p-6 rounded-lg">
        <InterviewChat /> {/* 面接開始ボタンと対話エリアが含まれたコンポーネント */}
      </main>
    </div>
  );
};

export default InterviewPage;
