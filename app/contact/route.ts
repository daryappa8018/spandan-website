// app/api/contact/route.ts
// Contact form submission API

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// For email sending, you can use Resend, SendGrid, or Nodemailer
// This example uses basic email validation and logging to database

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Store in database for admin review (optional - create ContactSubmission model)
    // await prisma.contactSubmission.create({
    //   data: {
    //     name: body.name,
    //     email: body.email,
    //     subject: body.subject,
    //     message: body.message,
    //     ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
    //     userAgent: request.headers.get('user-agent') || 'unknown',
    //   },
    // });

    // Send email notification (using Resend as example)
    // Uncomment and configure when you have email service setup
    /*
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const settings = await prisma.siteSetting.findFirst({
      where: { key: 'site_email' },
    });

    await resend.emails.send({
      from: 'noreply@yourdomain.com',
      to: settings?.value || 'admin@example.com',
      subject: `Contact Form: ${body.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${body.name} (${body.email})</p>
        <p><strong>Subject:</strong> ${body.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message.replace(/\n/g, '<br>')}</p>
      `,
    });
    */

    // For now, just return success (emails will be sent when configured)
    return NextResponse.json(
      { 
        success: true,
        message: 'Message received. We will respond via email within 2-3 business days.'
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try emailing us directly.' },
      { status: 500 }
    );
  }
}