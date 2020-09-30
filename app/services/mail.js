var InternxtMailer = require('storj-service-mailer');

module.exports = (Model, App) => {

  const mailInstance = () => {
    return new InternxtMailer({
      host: process.env.STORJ_MAILER_HOST,
      port: process.env.STORJ_MAILER_PORT,
      secure: process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production',
      auth: {
        user: process.env.STORJ_MAILER_USERNAME,
        pass: process.env.STORJ_MAILER_PASSWORD,
      },
      from: 'hello@internxt.com',
    });
  }

  const sendInvitationMail = (emailTo, user) => {
    const mailer = mailInstance()
    return new Promise((resolve, reject) => {
      mailer.dispatch(
        emailTo,
        'referral',
        {
          template: 'referral',
          go: { in: 'here' },
          senderUser: user.name,
          url: 'https://internxt.com/?ref=' + user.uuid
        },
        function (err) {
          if (!err) {
            console.log(`Mail sent to ${emailTo}!`);
            resolve()
          } else {
            console.error(`Error sending mail to ${emailTo}`);
            console.error(err);
            reject(err)
          }
        }
      );
    })
  }

  return {
    Name: 'Mail',
    sendInvitationMail
  }
}