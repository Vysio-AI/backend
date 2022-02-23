const nd = require("nanoid");
const emailService = require('../../email');

// Sends a test email using the email service
// Requires SENDGRID_API_KEY to be set
emailService.sendInviteEmail("peterdmarshall99@gmail.com", {
    client_first_name: "Peter",
    client_last_name: "Marshall",
    practitioner_first_name: "John",
    practitioner_last_name: "Doe",
    referral_code: nd.nanoid(10)
})