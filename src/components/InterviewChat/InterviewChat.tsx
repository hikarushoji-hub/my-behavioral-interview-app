"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaRobot, FaPaperPlane } from 'react-icons/fa';
import { generateAIResponse } from '../../services/openaiService';
import styles from './InterviewChat.module.css';

interface Message {
  role: 'interviewer' | 'user';
  content: string;
}

const InterviewChat = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  // コンポーネントがマウントされたときに初期質問を追加
  useEffect(() => {
    setMessages([
      { role: 'interviewer', content: 'チーム開発で揉めた経験について教えてください。' },
    ]);
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    const aiResponse = await generateAIResponse(input);
    const aiMessage = { role: 'interviewer', content: aiResponse };
    setMessages((prevMessages) => [...prevMessages, aiMessage]);
  };

  const handleEndInterviewClick = () => {
    setShowConfirmation(true);
  };

  const confirmEndInterview = () => {
    setShowConfirmation(false);
    router.push('/feedback');
  };

  const cancelEndInterview = () => {
    setShowConfirmation(false);
  };

  return (
    <div className={styles.container}>
      <div className="space-y-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">模擬面接 - 質問 1</h2>
        <p className="text-sm text-gray-500 mb-4">以下の質問に対して、具体的に回答してください。</p>

        {messages.map((message, index) => (
          <div key={index} className={styles.message}>
            {message.role === 'interviewer' ? (
              <FaRobot className={styles.icon} />
            ) : (
              <FaUser className={styles.icon} />
            )}
            <div className={message.role === 'interviewer' ? styles.interviewerMessage : styles.userMessage}>
              <p>{message.content}</p>
            </div>
          </div>
        ))}

        <div className={styles.inputContainer}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={styles.textarea}
            rows={1}
            placeholder="ここに回答を入力してください..."
          />
          <button onClick={handleSendMessage} className={styles.sendButton}>
            <FaPaperPlane size={20} />
          </button>
        </div>
      </div>

      {/* 面接終了確認ダイアログ */}
      {showConfirmation && (
        <div className={styles.confirmationDialog}>
          <p>これで面接を終了しますか？</p>
          <button onClick={confirmEndInterview} className={styles.confirmButton}>
            終了する
          </button>
          <button onClick={cancelEndInterview} className={styles.cancelButton}>
            キャンセル
          </button>
        </div>
      )}

      <button onClick={handleEndInterviewClick} className={styles.endInterviewButton}>
        面接を終了する
      </button>
    </div>
  );
};

export default InterviewChat;
