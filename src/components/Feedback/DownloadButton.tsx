// src/components/Feedback/DownloadButton.tsx

import jsPDF from 'jspdf';

interface DownloadButtonProps {
  feedbackText: string;
}

const DownloadButton = ({ feedbackText }: DownloadButtonProps) => {
  const handleDownload = () => {
    try {
      // jsPDFインスタンスを作成
      const doc = new jsPDF();

      // テキスト情報をPDFに追加
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(feedbackText, 10, 10);

      // PDFのダウンロード
      doc.save('feedback.pdf');
    } catch (error) {
      console.error('PDFの生成に失敗しました:', error);
    }
  };

  return (
    <button onClick={handleDownload} className="btn-primary">
      フィードバックをダウンロード
    </button>
  );
};

export default DownloadButton;
