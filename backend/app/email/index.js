const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Sends an invite email using our custom SendGrid template
// Params:
//  recipientEmail: Email of user to be invited
//  templateData: JSON object with data for SendGrid template
//    ex. {
//      client_first_name: "Peter",
//      client_last_name: "Marshall",
//      practitioner_first_name: "John",
//      practitioner_last_name: "Doe",
//      referral_code: Referral code generated for invite
//    }
// Returns Array [success, error] with types [bool, Object | null]
const sendInviteEmail = (recipientEmail, templateData) => {
  const msg = {
    to: recipientEmail,
    from: 'invite@em8130.vysio.ca',
    templateId: 'd-6d2fe36aee4e4a8cada08e09010b1a7f',
    dynamicTemplateData: {
      ...templateData,
      Sender_Name: "Vysio AI",
      Sender_Address: "200 University Ave W",
      Sender_City: "Waterloo",
      Sender_State: "Ontario",
      Sender_Zip: "N2L 3G5"
    }
  }
  sgMail
  .send(msg)
  .then(() => {
    console.log(`Invite email sent to: ${recipientEmail}`)
    return [true, null]
  })
  .catch((error) => {
    return [false, error]
  })
}

module.exports = {
  sendInviteEmail,
}