import { transporter } from '@/config/email/email-smtp';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest){
   const { recipients, subject, text } = await req.json();

   try {
          const result = await transporter.sendMail({
            from: '"Persike" <persike@gamboasolutions.com.br>',
            to: recipients.join(','),
            subject: subject,
            text: text
          });
          return NextResponse.json({ message: 'Emails sent successfully!' }, { status: 200 });
        } catch (error) {
          return NextResponse.json({ message: 'Failed to send emails.' }, { status: 500 });
        }
}