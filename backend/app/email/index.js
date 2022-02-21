const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const emailTemplates = {
  INVITE: 'd-6d2fe36aee4e4a8cada08e09010b1a7f',
  SESSION: 'd-e0a62170963e41c882d714d870b4a5fc',
}

// Send email to recipientEmail by populating emailTemplate with templateData
const sendEmail = async (recipientEmail, emailTemplate, templateData) => {
  let result = [true, null];

  const msg = {
    to: recipientEmail,
    from: 'no-reply@em8130.vysio.ca',
    templateId: emailTemplate,
    dynamicTemplateData: {
      ...templateData,
      Sender_Name: "Vysio AI",
      Sender_Address: "200 University Ave W",
      Sender_City: "Waterloo",
      Sender_State: "Ontario",
      Sender_Zip: "N2L 3G5"
    }
  }

  await sgMail.send(msg).catch((error) => {
    console.log(error);
    result = [false, error];
  })
  
  return result
}

module.exports = {
  emailTemplates,
  sendEmail,
}
