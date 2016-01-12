'use strict';

const validator = require('validator'),
      mandrill  = require('mandrill-api/mandrill'),
      ip        = require('ip');

const mandrillClient = new mandrill.Mandrill(process.env.MANDRILL_SECRET);

module.exports = (subject, body, list) => {

  if (ip.address() !== process.env.SERVER_IP) {
    console.log('Im not the server so am not allowed to send emails!');
    return;
  }

  const followers = list.map((contact) => {
    if (validator.isEmail(contact)) {
      return {email: contact};
    }
    return;
  });

  const message = {
    'html': body,
    'subject': subject,
    'from_email': 'noreply@flytime.is',
    'from_name': 'FlyTime',
    'to': followers,
    'preserve_recipients': false,
    'merge_language': 'mailchimp',
    'important': true,
  };

  mandrillClient.messages.send({message: message}, (result) => {}, function(e) {
    // XXX Send alert
    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
  });
}
