"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

const MainPage = () => {
  const [name, setName] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    // デフォルト情報の取得
    const fetchProfileData = async () => {
      const { data, error } = await supabase.from('profiles').select('*').single();
      if (data) {
        setName(data.name || '');
        setEducation(data.education || '');
        setExperience(data.experience || '');
        setSkills(data.skills || '');
        setResumeUrl(data.resume_url || '');
      }
    };
    fetchProfileData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const { data, error } = await supabase.storage.from('resumes').upload(`public/${file.name}`, file);
    if (error) {
      console.error("File upload failed:", error);
      return;
    }
    setResumeUrl(data?.Key || '');
  };

  const handleStartInterview = () => {
    // 面接ページへ移動
    router.push('/interview');
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">面接準備</h2>

      {/* PDFアップロードエリア */}
      <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg mb-6 text-center bg-gray-100">
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        {file && <p>アップロードされたファイル: {file.name}</p>}
        <button onClick={handleUpload} className="btn-primary mt-4">アップロード</button>
      </div>

      {/* プロフィール情報編集セクション */}
      <div className="mb-6">
        <label>名前</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input" />

        <label>学歴</label>
        <input type="text" value={education} onChange={(e) => setEducation(e.target.value)} className="input" />

        <label>経験</label>
        <textarea value={experience} onChange={(e) => setExperience(e.target.value)} className="input" />

        <label>スキル</label>
        <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} className="input" />
      </div>

      {/* 面接開始ボタン */}
      <button onClick={handleStartInterview} className="btn-primary w-full mt-4">
        面接を開始する
      </button>
    </div>
  );
};

export default MainPage;
