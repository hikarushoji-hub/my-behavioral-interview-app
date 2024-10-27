// src/app/interview/InterviewChat.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaRobot, FaPaperPlane } from 'react-icons/fa';
import { generateAIResponse } from '../services/openaiService';

interface Message {
  role: 'interviewer' | 'user';
  content: string;
}

const InterviewChat = () => {
  const router = useRouter();
  const [sessionActive, setSessionActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleStartInterview = () => {
    setSessionActive(true);
    setMessages([
      { role: 'interviewer', content: '自己紹介をお願いします。' },
    ]);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    const aiResponse = await generateAIResponse(input);
    const aiMessage = { role: 'interviewer', content: aiResponse };
    setMessages((prevMessages) => [...prevMessages, aiMessage]);
  };

  // 面接終了処理
  const handleEndInterview = () => {
    router.push('/feedback');
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg space-y-4 border border-gray-300">
      {!sessionActive && (
        <button onClick={handleStartInterview} className="w-full bg-blue-800 text-white font-bold py-2 px-4 rounded">
          面接を開始
        </button>
      )}

      {sessionActive && (
        <>
          <div className="space-y-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">模擬面接 - 質問 1</h2>
            <p className="text-sm text-gray-500 mb-4">以下の質問に対して、具体的に回答してください。</p>

            {messages.map((message, index) => (
              <div key={index} className={`flex items-start ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'interviewer' && <FaRobot className="text-gray-500 mr-2" />}
                <div
                  className={`${
                    message.role === 'interviewer' ? 'bg-gray-200 text-left' : 'bg-blue-100 text-right'
                  } p-4 rounded-lg max-w-lg`}
                  style={{
                    marginLeft: message.role === 'interviewer' ? '0' : 'auto',
                    borderRadius: message.role === 'interviewer' ? '12px 12px 12px 0' : '12px 12px 0 12px',
                  }}
                >
                  <p>{message.content}</p>
                </div>
                {message.role === 'user' && <FaUser className="text-blue-500 ml-2" />}
              </div>
            ))}

            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow p-2 resize-none focus:outline-none"
                rows={1}
                placeholder="ここに回答を入力してください..."
              />
              <button onClick={handleSendMessage} className="ml-2 text-blue-600 flex-shrink-0">
                <FaPaperPlane size={20} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* 面接終了ボタンを外側に配置 */}
      {sessionActive && (
        <button onClick={handleEndInterview} className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded mt-6">
          面接を終了する
        </button>
      )}
    </div>
  );
};

export default InterviewChat;
