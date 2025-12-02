import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// Define the shape of the data that we expect to receive
interface ReservationData {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  comment: string;
}

export async function POST(req: Request) {
  try {
    // Parse the incoming JSON data
    const data: ReservationData = await req.json();

    // Extract the reservation details
    const { name, phone, date, time, guests, comment } = data;

    // Create the email content
    const emailContent = `
      <h3>New Reservation</h3>
      <p><strong>Имя:</strong> ${name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Дата:</strong> ${date}</p>
      <p><strong>Время:</strong> ${time}</p>
      <p><strong>Количество :</strong> ${guests}</p>
      <p><strong>Comment:</strong> ${comment}</p>
    `;

    // Create the Nodemailer transporter (example using Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can replace it with another service like SendGrid
      auth: {
        user: process.env.EMAIL_USER, // your email address
        pass: process.env.EMAIL_PASSWORD, // your email password or an app-specific password
      },
    });

    // Set up the email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // your email address
      to: process.env.RECIPIENT_EMAIL, // recipient's email address (restaurant)
      subject: 'New Reservation',
      html: emailContent, // HTML content for the email
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond with a success message
    return NextResponse.json({ message: 'Reservation successfully sent!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
