
class EmailService {
  static smtpConfigOptionsSendgrid() {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey('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');
    return sgMail;
  }

  send(mailOptions) {
    return new Promise((resolve, reject) => {
      try {
        this.constructor.smtpConfigOptionsSendgrid().send(mailOptions);
        return resolve(true);
      } catch (err) {
        return reject(err);
      }
    });
  }
}

module.exports = EmailService;

