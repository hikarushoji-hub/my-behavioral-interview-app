// src/app/api/generatePdf/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb } from 'pdf-lib';

export async function POST(req: NextRequest) {
  try {
    const { feedbackText } = await req.json();

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const { width, height } = page.getSize();
    
    page.drawText(feedbackText, {
      x: 50,
      y: height - 50,
      size: 12,
      color: rgb(0, 0, 0),
      maxWidth: width - 100,
      lineHeight: 16,
    });

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="feedback.pdf"',
      },
    });
  } catch (error) {
    console.error('PDF生成エラー:', error);
    return new NextResponse(JSON.stringify({ error: 'PDF生成に失敗しました' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
