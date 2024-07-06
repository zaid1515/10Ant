const SibApiV3Sdk = require('sib-api-v3-sdk');
// SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey=process.env.SEND_IN_BLUE_API_KEY

async function sendEmail(
  senderEmail,
  senderName,
  receiverEmail,
  receiverName,
  subject,
  content
) {
  try {
    // Initialize the API client with your API key
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.SEND_IN_BLUE_API_KEY;

    // Create an instance of the API class
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    // Define sender and receiver details
    const sender = { email: senderEmail, name: senderName };
    const receivers = [{ email: receiverEmail, name: receiverName }];

    // Send email
    const sendEmail = await apiInstance.sendTransacEmail({
      sender,
      to: receivers,
      subject,
      textContent: content,
      htmlContent: `<p>${content}</p>`,
    });

    console.log('Email sent successfully:', sendEmail);

    return true;
  } catch (error) {
    console.error('Error sending email:', error.message,error);
    return false;
  }
}

// Example usage:
// sendEmail(
//   'mohdabuzaid15@gmail.com',
//   'Ansari Mohd Abuzaid',
//   'abuzaid1326@gmail.com',
//   'Recipient Name',
//   'Test Email Subject',
//   'Hello, this is a test 2 email!'
// );

module.exports=sendEmail