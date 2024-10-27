"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { extractTextFromPDF } from '../services/pdfService';
import { extractProfileDetails } from '../services/openaiService';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

const MainPage = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState('');
  const [pdfText, setPdfText] = useState('');
  const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      const text = await extractTextFromPDF(e.target.files[0]);
      setPdfText(text);
      console.log("PDFのテキスト:", text);
    }
  };

  const handleUseAI = async () => {
    if (!pdfText) return;

    const profileDetails = await extractProfileDetails(pdfText);
    setName(profileDetails.name);
    setPosition(profileDetails.position);
    setExperience(profileDetails.experience);
    setSkills(profileDetails.skills);

    console.log("構造化されたデータ:", profileDetails);
  };

  const handleStartInterview = () => {
    router.push('/interview');
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">面接準備</h2>

      <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg mb-6 text-center bg-gray-100">
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        {file && (
          <div className="flex items-center mt-4">
            <p>アップロードされたファイル: {file.name}</p>
            <button onClick={handleUseAI} className="btn-primary ml-4">AI入力補助を使う</button>
          </div>
        )}
      </div>

      <div className="mb-6">
        <label>名前</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input" />

        <label>希望ポジション</label>
        <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} className="input" />

        <label>経験</label>
        <textarea value={experience} onChange={(e) => setExperience(e.target.value)} className="input" />

        <label>スキル</label>
        <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} className="input" />
      </div>

      <button onClick={handleStartInterview} className="btn-primary w-full mt-4">
        面接を開始する
      </button>
    </div>
  );
};

export default MainPage;
