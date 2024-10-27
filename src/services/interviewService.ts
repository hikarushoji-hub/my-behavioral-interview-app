// src/services/interviewService.ts
import { supabase } from './supabaseClient';
import { generateAIResponse } from './openaiService';

export const startInterviewSession = async (userId: string, sessionId: string, title: string) => {
  const { data, error } = await supabase
    .from('interviews')
    .insert({
      user_id: userId,
      session_id: sessionId,
      title,
      started_at: new Date(),
    });

  if (error) throw error;
  return data;
};


// メッセージを保存する関数
export const saveMessage = async (interviewId: string, content: string, senderType: 'user' | 'interviewer', parentId: string | null = null) => {
  const { data, error } = await supabase
    .from('messages')
    .insert({
      interview_id: interviewId,
      content,
      sender_type: senderType,
      parent_message_id: parentId,
      created_at: new Date(),
    });

  if (error) throw error;
  return data;
};

// ユーザーがメッセージを送信したときの処理
export const handleUserMessage = async (interviewId: string, userMessage: string) => {
  // ユーザーのメッセージを保存
  const userMessageData = await saveMessage(interviewId, userMessage, 'user');

  // AIのリプライを生成
  const aiReply = await generateAIResponse(userMessage);

  // AIのメッセージを保存
  const aiMessageData = await saveMessage(interviewId, aiReply, 'interviewer', userMessageData[0].id);

  return aiMessageData;
};
