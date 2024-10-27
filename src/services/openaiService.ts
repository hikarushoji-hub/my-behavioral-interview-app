import axios from 'axios';

const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

export const summarizeText = async (text: string): Promise<string> => {
  const messages = [
    { role: 'system', content: 'You are a helpful assistant that summarizes text.' },
    { role: 'user', content: `Summarize the following text in a concise manner:\n\n${text}` },
  ];

  const response = await axios.post(
    API_ENDPOINT,
    {
      model: 'gpt-4o-mini', // 使用するモデル（gpt-4o-miniに変更）
      messages: messages,
      max_tokens: 100,
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].message.content.trim();
};

// 名前、希望ポジション、経験、スキルを抽出する関数
export const extractProfileDetails = async (text: string): Promise<{ name: string; position: string; experience: string; skills: string }> => {
  const messages = [
    { role: 'system', content: 'エンジニア就活生の模擬面接をするためにユーザープロフィール情報が含まれたテキストから、指定された内容を抽出して。完全一致で記載されていなくても関連項目は読み取って' },
    { role: 'user', content: `Extract the following information from this profile:\n\n- Name\n- Desired Position\n- Experience\n- Skills\n\nText:\n${text}` },
  ];

  try {
    const response = await axios.post(
      API_ENDPOINT,
      {
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 200,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    const content = response.data.choices[0].message.content.trim();
    const name = content.match(/Name:\s*(.*)/)?.[1] || "N/A";
    const position = content.match(/Desired Position:\s*(.*)/)?.[1] || "N/A";
    const experience = content.match(/Experience:\s*(.*)/)?.[1] || "N/A";
    const skills = content.match(/Skills:\s*(.*)/)?.[1] || "N/A";

    return { name, position, experience, skills };
  } catch (error) {
    console.error("OpenAI API request error:", error.response?.data || error.message); // デバッグ用: エラー詳細を表示
    throw error;
  }
};


export const generateAIResponse = async (userMessage: string): Promise<string> => {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'あなたは面接官として、ユーザーの回答に応じて適切な質問をしてください。' },
        { role: 'user', content: userMessage },
      ],
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].message.content.trim();
};
