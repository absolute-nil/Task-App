const sgMail = require("@sendgrid/mail")

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "nikhil19@somaiya.edu",
        subject: "Welcome to the Task Manager App",
        text: `Hey ${name}, thankyou for joining our service. Let me know how you get along`
    })
    
}

const sendExitEmail = (email,name) =>{
    sgMail.send({
        to: email,
        from: "nikhil19@somaiya.edu",
        subject: "Sorry to see you go!",
        text: `Goodbye ${name}, thankyou for using our app. Is there anything we could have done to improve your experience?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendExitEmail
}