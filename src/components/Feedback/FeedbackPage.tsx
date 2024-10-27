// src/components/Feedback/FeedbackPage.tsx
"use client";

import RegisterPrompt from './RegisterPrompt';
import DownloadButton from './DownloadButton';
import ReactMarkdown from 'react-markdown';
import styles from './FeedbackPage.module.css';

const FeedbackPage = () => {
  // マークダウン形式のフィードバックテキスト
  const feedbackText = `
# フィードバック内容
お疲れ様でした！面接のフィードバック内容は以下の通りです。

## 強み
- 技術スキルが十分であり、最新の技術にも対応している。
- コミュニケーション能力が高く、チームでの協調性が見られる。

## 改善点
- コードの可読性をもう少し意識すると良い。
- アルゴリズムの効率化について、さらに深掘りして学ぶとよい。

### おすすめの学習リソース
- [JavaScriptの深い理解](https://developer.mozilla.org/)
- [効率的なアルゴリズム設計](https://www.geeksforgeeks.org/)
  `;

  return (
    <div className={styles.container}>
      <RegisterPrompt />
      <div className={styles.feedbackContent}>
        <h2 className={styles.title}>フィードバック内容</h2>
        <div className={styles.feedbackBox}>
          <ReactMarkdown>{feedbackText}</ReactMarkdown>
        </div>
        <DownloadButton feedbackText={feedbackText} />
      </div>
    </div>
  );
};

export default FeedbackPage;
