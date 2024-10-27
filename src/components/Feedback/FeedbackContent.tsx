// src/components/Feedback/FeedbackContent.tsx
import styles from './FeedbackContent.module.css';

const FeedbackContent = () => {
  return (
    <div className={styles.feedbackContainer}>
      <h2 className={styles.title}>フィードバック内容</h2>
      <p className={styles.content}>
        このセッションでの面接フィードバックをお送りします。
        より具体的なスキルの向上や改善点について参考にしてください。
      </p>
    </div>
  );
};

export default FeedbackContent;
