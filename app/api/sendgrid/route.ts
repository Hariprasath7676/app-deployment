import { NextResponse } from 'next/server';
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    const msg = {
      to: process.env.SENDGRID_TO_EMAIL!, // Replace with your email
      from: process.env.SENDGRID_FROM_EMAIL!, // Replace with your SendGrid verified sender
      subject: 'New Contact Form Submission',
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `,
      html: `
        <html>
  <body style="background: #f6f6f7; padding: 40px 0;">
    <div style="max-width: 480px; margin: 40px auto; background: #fff; border-radius: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); padding: 32px 32px 24px 32px; font-family: Arial, sans-serif;">
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="font-size: 22px; font-weight: bold; letter-spacing: 1px; color: #222;">NILAVAN REALTORS</div>
      </div>
      <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
      <div style="font-size: 16px; color: #222; margin-bottom: 24px;">
        <p style="margin: 0 0 16px 0;">You have a new contact form submission:</p>
        <p style="margin: 0 0 8px 0;"><strong>Name:</strong> ${name}</p>
        <p style="margin: 0 0 8px 0;"><strong>Email:</strong> ${email}</p>
        <p style="margin: 0 0 8px 0;"><strong>Phone:</strong> ${phone}</p>
        <p style="margin: 0 0 8px 0;"><strong>Message:</strong> ${message}</p>
      </div>
      <!-- Optional button, remove if not needed
      <div style="text-align: center;">
        <a href="#" style="display: inline-block; background: #2563eb; color: #fff; font-weight: 500; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-size: 16px;">View Submission</a>
      </div>
      -->
    </div>
  </body>
</html>
      `,
    };

    await sendgrid.send(msg);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
} 