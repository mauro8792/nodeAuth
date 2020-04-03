var nodemailer = require('nodemailer');

exports.emailSend=(userCode,callBack)=>{
    const code = userCode.code;
    const email = userCode.email;   
    
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.USER_MAIL,                   
          pass: process.env.USER_PASS 
        }
      }); 
      var mailOptions = {
        from: process.env.USER_MAIL,
        to: email,
        subject: 'Sending Email using Node.js',
        text: `Para poder recuperar la contraseña por favor
         ingrese a este link: http://localhost:3001/resetPassword?code=${code}`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}


