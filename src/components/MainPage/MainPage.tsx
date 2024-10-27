"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { extractTextFromPDF } from '../../services/pdfService';
import { extractProfileDetailsAsJson } from '../../services/openaiService';
import styles from './MainPage.module.css';

const MainPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // エラーメッセージの状態

  // PDFのアップロードとテキスト抽出
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      const text = await extractTextFromPDF(e.target.files[0]);
      setResumeText(text);
      console.log("PDFのテキスト:", text);
    }
  };

  // AIによるプロフィールの入力支援
  const handleUseAI = async () => {
    if (!resumeText) return;

    const profileDetails = await extractProfileDetailsAsJson(resumeText);
    setName(profileDetails.name);
    setPosition(profileDetails.desired_position);
    setExperience(profileDetails.experience);
    setSkills(profileDetails.skills);
    console.log("構造化されたデータ:", profileDetails);
  };

  // 面接開始ボタンのハンドラ
  const handleStartInterview = () => {
    // 必須項目がすべて入力されているか確認
    if (!name || !position || !experience || !skills) {
      setErrorMessage('すべての項目を埋めてください');
    } else {
      setErrorMessage('');
      // 面接ページに遷移
      router.push('/interview');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>面接準備</h2>

      {/* エラーメッセージ表示 */}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

      {/* PDFアップロードエリア */}
      <div className={styles.uploadContainer}>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        {file && (
          <button onClick={handleUseAI} className={styles.aiButton}>
            AI入力補助を使う
          </button>
        )}
      </div>

      {/* プロフィール情報編集セクション */}
      <div className={styles.form}>
        <label className={styles.label}>名前</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          placeholder="例: 山田 太郎"
        />

        <label className={styles.label}>希望ポジション</label>
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className={styles.input}
          placeholder="例: ソフトウェアエンジニア"
        />

        <label className={styles.label}>経験</label>
        <textarea
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className={`${styles.input} ${styles.textarea}`}
          placeholder="例: 3年以上のJava開発経験"
        />

        <label className={styles.label}>スキル</label>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className={styles.input}
          placeholder="例: Java, React, SQL"
        />
      </div>

      {/* 面接開始ボタン */}
      <button onClick={handleStartInterview} className={styles.startInterviewButton}>
        面接を開始する
      </button>
    </div>
  );
};

export default MainPage;
