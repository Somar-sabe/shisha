const testMailOptions = {
  from: 'sabesofteng@gmail.com',
  to: 'ycontact@holster-tobacco.com', // Test email
  subject: 'Test Email',
  text: 'This is a test email.',
};

await transporter.sendMail(testMailOptions);
console.log('Test email sent');
