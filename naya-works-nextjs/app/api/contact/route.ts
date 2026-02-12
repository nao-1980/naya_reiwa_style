import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // バリデーション
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    // メール送信
    const { error } = await resend.emails.send({
      from: 'NAYA WORKS お問い合わせ <onboarding@resend.dev>',
      to: 'nao526yolo@gmail.com', // TODO: 本番はnao@naya-works.jpに変更
      replyTo: email,
      subject: `【NAYAwebサイトよりご相談】${name}様`,
      text: `お名前: ${name}\nメールアドレス: ${email}\n\nお問い合わせ内容:\n${message}`,
      html: `
        <h2>お問い合わせがありました</h2>
        <p><strong>お名前:</strong> ${name}</p>
        <p><strong>メールアドレス:</strong> <a href="mailto:${email}">${email}</a></p>
        <h3>お問い合わせ内容:</h3>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'メール送信に失敗しました' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
