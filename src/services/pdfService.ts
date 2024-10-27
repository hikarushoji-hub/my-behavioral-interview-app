import * as pdfjsLib from 'pdfjs-dist/webpack';

export const extractTextFromPDF = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let textContent = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const text = await page.getTextContent();
    const pageText = text.items.map((item: any) => item.str).join(' ');
    textContent += pageText + '\n';
  }

  // 整形処理：連続した空白と不要な改行を整理
  const formattedText = textContent
    .replace(/\s+/g, ' ')       // 連続するスペースを1つにまとめる
    .replace(/\n\s*\n/g, '\n'); // 連続する改行を1つにまとめる

  return formattedText.trim();   // 前後の不要な空白を削除して返す
};
