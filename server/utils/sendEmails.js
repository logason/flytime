'use strict';

const validator = require('validator'),
      mandrill  = require('mandrill-api/mandrill'),
      _         = require('lodash');

const mandrillClient = new mandrill.Mandrill(process.env.MANDRILL_SECRET);

module.exports = (subject, body, list) => {

  if (process.env.NODE_ENV !== 'production') {
    console.log("I'm not the server so am not allowed to send emails!");
    return;
  }

  const followers = _.map(list, (contact) => {
    if (validator.isEmail(contact)) {
      return {email: contact};
    }
    return;
  });

  const message = {
    'html': body,
    'subject': subject,
    'from_email': 'flytime@flytime.is',
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
