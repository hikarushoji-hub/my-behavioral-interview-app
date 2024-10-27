import axios from 'axios';

const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

// テキストの要約関数
export const summarizeText = async (text: string): Promise<string> => {
  const messages = [
    { role: 'system', content: 'You are a helpful assistant that summarizes text.' },
    { role: 'user', content: `Summarize the following text in a concise manner:\n\n${text}` },
  ];

  const response = await axios.post(
    API_ENDPOINT,
    {
      model: 'gpt-4o-mini',
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


// 名前、希望ポジション、経験、スキルをJSON形式で抽出する関数
export const extractProfileDetailsAsJson = async (text: string): Promise<{ name: string; desired_position: string; experience: string; skills: string }> => {
  const messages = [
    {
      role: 'system',
      content: 'エンジニア就活生の模擬面接をするために、与えられたテキストからプロフィール情報を抽出し、コードブロックや装飾なしで純粋なJSONオブジェクトとして返してください。フィールドは"name"、"desired_position"、"experience"、"skills"としてください。'
    },
    {
      role: 'user',
      content: `以下のテキストから必要なプロフィール情報を抽出してください:\n\n${text}`
    },
  ];

  try {
    const response = await axios.post(
      API_ENDPOINT,
      {
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 300,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // JSONコードブロックを取り除く処理
    let content = response.data.choices[0].message.content.trim();
    content = content.replace(/```json|```/g, ''); // "```json"や"```"を削除

    const jsonResponse = JSON.parse(content);
    return {
      name: jsonResponse.name || "",
      desired_position: jsonResponse.desired_position || "",
      experience: jsonResponse.experience || "",
      skills: jsonResponse.skills || "",
    };
  } catch (error) {
    console.error("OpenAI API JSON extraction error:", error.response?.data || error.message);
    return { name: "", desired_position: "", experience: "", skills: "" };
  }
};


// 面接官の応答生成関数
export const generateAIResponse = async (userMessage: string): Promise<string> => {
  const response = await axios.post(
    API_ENDPOINT,
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
