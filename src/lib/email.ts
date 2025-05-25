import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface WelcomeEmailProps {
  email: string;
  firstName?: string;
}

export async function sendWelcomeEmail({ email }: WelcomeEmailProps) {
  const name = email.split('@')[0];
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Beam Team <contact@just-beam.me>',
      to: [email],
      subject: 'You\'re in. Beam is coming.',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Beam</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #1a1a1a;
              background: linear-gradient(135deg, #f8fffe 0%, #f0fdf4 100%);
              margin: 0;
              padding: 20px;
            }
            
            .email-container {
              max-width: 560px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
              border: 1px solid #e5e7eb;
            }
            
            .header {
              background: linear-gradient(135deg, #327b40 0%, #2d6a36 100%);
              padding: 40px 32px;
              text-align: center;
              position: relative;
              overflow: hidden;
            }
            
            .header::before {
              content: '';
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
              background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
              animation: float 6s ease-in-out infinite;
            }
            
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-10px) rotate(5deg); }
            }
            
            .logo-container {
              position: relative;
              z-index: 2;
              margin-bottom: 16px;
            }
            
            .logo {
              width: 64px;
              height: 64px;
              margin: 0 auto;
              background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%);
              backdrop-filter: blur(10px);
              border-radius: 50% 40% 60% 30% / 40% 60% 30% 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 2px solid rgba(255, 255, 255, 0.3);
              position: relative;
              overflow: hidden;
            }
            
            .logo::before {
              content: '';
              position: absolute;
              top: 20%;
              left: 20%;
              width: 60%;
              height: 60%;
              background: rgba(255, 255, 255, 0.4);
              border-radius: 60% 40% 70% 30% / 50% 60% 40% 70%;
              animation: blob-morph 4s ease-in-out infinite alternate;
            }
            
            .logo::after {
              content: 'B';
              position: absolute;
              color: white;
              font-size: 28px;
              font-weight: 700;
              z-index: 2;
            }
            
            @keyframes blob-morph {
              0% { 
                border-radius: 60% 40% 70% 30% / 50% 60% 40% 70%;
                transform: rotate(0deg) scale(1);
              }
              100% { 
                border-radius: 40% 60% 30% 70% / 60% 40% 70% 50%;
                transform: rotate(10deg) scale(1.1);
              }
            }
            
            .brand-name {
              color: white;
              font-size: 32px;
              font-weight: 700;
              margin: 0;
              position: relative;
              z-index: 2;
              letter-spacing: -0.5px;
            }
            
            .content {
              padding: 48px 32px;
            }
            
            .greeting {
              font-size: 24px;
              font-weight: 600;
              color: #1a1a1a;
              margin-bottom: 32px;
            }
            
            .main-message {
              font-size: 18px;
              color: #374151;
              margin-bottom: 24px;
              line-height: 1.7;
            }
            
            .highlight {
              color: #327b40;
              font-weight: 600;
            }
            
            .cta-container {
              background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
              border: 1px solid #bbf7d0;
              border-radius: 16px;
              padding: 32px;
              margin: 32px 0;
              text-align: center;
            }
            
            .cta-title {
              font-size: 20px;
              font-weight: 600;
              color: #327b40;
              margin-bottom: 12px;
            }
            
            .cta-email {
              display: inline-block;
              background: #327b40;
              color: white;
              text-decoration: none;
              padding: 14px 28px;
              border-radius: 12px;
              font-size: 16px;
              transition: all 0.3s ease;
              box-shadow: 0 4px 12px rgba(50, 123, 64, 0.3);
            }
            
            .cta-email:hover {
              background: #2d6a36;
              transform: translateY(-2px);
              box-shadow: 0 6px 20px rgba(50, 123, 64, 0.4);
            }
            
            .signature {
              margin-top: 40px;
              padding-top: 32px;
              border-top: 1px solid #e5e7eb;
            }
            
            .signature-text {
              font-size: 16px;
              color: #374151;
              margin-bottom: 8px;
            }
            
            .team-name {
              font-size: 18px;
              font-weight: 600;
              color: #1a1a1a;
              margin-bottom: 8px;
            }
            
            .website {
              color: #327b40;
              text-decoration: none;
              font-weight: 500;
              font-size: 16px;
            }
            
            .website:hover {
              text-decoration: underline;
            }
            
            .footer {
              background: #f9fafb;
              padding: 24px 32px;
              text-align: center;
              border-top: 1px solid #e5e7eb;
            }
            
            .footer-text {
              font-size: 14px;
              color: #6b7280;
            }
            
            @media (max-width: 600px) {
              body {
                padding: 10px;
              }
              
              .content {
                padding: 32px 24px;
              }
              
              .header {
                padding: 32px 24px;
              }
              
              .greeting {
                font-size: 22px;
              }
              
              .main-message {
                font-size: 16px;
              }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <div class="logo-container">
                <div class="logo"></div>
              </div>
              <h1 class="brand-name">Beam</h1>
            </div>
            
            <div class="content">
              <div class="greeting">Hey ${name},</div>
              
              <div class="main-message">
                <strong>You're on the list.</strong>
              </div>
              
              <div class="main-message">
                Beam is for people who want to <span class="highlight">connect — fast, nearby, and without the fluff</span>. When we launch, you'll be one of the first to get access.
              </div>
              
              <div class="cta-container">
                <div class="cta-title">Want early beta access?</div>
                <a href="mailto:suhayrid6@gmail.com" class="cta-email">Email us: suhayrid6@gmail.com</a>
              </div>
              
              <div class="signature">
                <div class="signature-text">Talk soon,</div>
                <div class="team-name">Beam Team</div>
                <a href="https://just-beam.me" class="website">just-beam.me</a>
              </div>
            </div>
            
            <div class="footer">
              <div class="footer-text">You're receiving this because you signed up for the Beam waitlist.</div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Hey ${name},

You're on the list.

Beam is for people who want to connect — fast, nearby, and without the fluff. When we launch, you'll be one of the first to get access.

Want early beta access?
Email us: contact@just-beam.me

Talk soon,
– Beam Team
just-beam.me`
    });

    if (error) {
      console.error('Failed to send welcome email:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
} 