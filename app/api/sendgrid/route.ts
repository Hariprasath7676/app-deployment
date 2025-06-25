import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    const apiKey = process.env.MAILGUN_API_KEY;
    const domain = 'mg.leadtap.ai';
    const mailgunUrl = `https://api.eu.mailgun.net/v3/${domain}/messages`;

    // Debug logging to check environment variables
    console.log('API Key exists:', !!apiKey);
    console.log('API Key length:', apiKey?.length);
    console.log('Domain:', domain);
    console.log('To email:', process.env.MAILGUN_TO_EMAIL || 'all-mail@leadtap.ai');
    
    // Additional debugging for API key format
    console.log('API Key starts with:', apiKey?.substring(0, 10) + '...');
    console.log('API Key ends with:', '...' + apiKey?.substring(apiKey.length - 4));

    // Check if API key is missing
    if (!apiKey) {
      console.error('MAILGUN_API_KEY environment variable is not set');
      return NextResponse.json({ error: 'Mailgun API key not configured' }, { status: 500 });
    }

    const formData = new URLSearchParams();
    formData.append('from', `Nilavan Realtors <no-reply@leadtap.ai>`);
    formData.append('to', process.env.MAILGUN_TO_EMAIL || 'swetha@leadtap.ai');
    formData.append('subject', 'New Contact Form Submission');
    formData.append('text', `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`);
   formData.append('html', `
   <div style="background:#f5f5f5;padding:40px 0;width:100%;">
     <div style="max-width:420px;margin:0 auto;background:#fff;border-radius:24px;padding:40px 32px 32px 32px;text-align:center;font-family:sans-serif;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
       <h2 style="margin:0 0 16px 0;font-size:24px;font-weight:700;letter-spacing:0.5px;">Nilavan Realtors</h2>
       <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
       <div style="text-align:left;margin-bottom:24px;">
         <p style="margin:0 0 16px 0;">Hey ${name || 'there'},</p>
         <p style="margin:0 0 16px 0;">You have a new contact form submission. Here are the details:</p>
         
           <p<strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Phone:</strong> ${phone}</p>
           <p><strong>Message:</strong> ${message}</p>
       
       </div>
      
       <div style="font-size:13px;color:#888;">Thanks,<br/>Nilavan Realtors Team</div>
     </div>
   </div>
   `) 

    // Debug Authorization header
    const authHeader = 'Basic ' + Buffer.from(`api:${apiKey}`).toString('base64');
    console.log('Authorization header format:', authHeader.substring(0, 20) + '...');
    console.log('Request URL:', mailgunUrl);

    const response = await fetch(mailgunUrl, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Mailgun full error response:', errorText);
      console.error('Response status:', response.status);
      console.error('Response headers:', Object.fromEntries(response.headers.entries()));

      throw new Error(`Mailgun error: ${errorText}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Full error:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
} 