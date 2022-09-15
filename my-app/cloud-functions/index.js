const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('[YOUR SGMAIL API KEY]');

exports.helloFirestore = (event, context) => {
  const eventId = event.context.eventId;
  const emailRef = db.collection('sentEmails').doc(eventId);

  return shouldSendWithLease(emailRef).then(send => {
    if (send) {
      //Send email if the like field returns 25
      if (event.value.fields.likes.integerValue == 25) {
         const msg = {
            to: event.value.fields.mostrecentliker.stringValue, // This is email of most recent liker
            from: '[YOUR EMAIL HERE]', // Use the email address or domain you verified above
            subject: 'You Liked a Post',
            text: 'You were the 25th person to like a specific post!',
            html: '<strong>You were the 25th person to like a specific post!</strong>',
         };
         sgMail.send(msg)
         return markSent(emailRef)
      };
    }
  });

};
    
const leaseTime = 60 * 1000; // 60s

function shouldSendWithLease(emailRef) {
  return db.runTransaction(transaction => {
    return transaction.get(emailRef).then(emailDoc => {
      if (emailDoc.exists && emailDoc.data().sent) {
        return false;
      }
      if (emailDoc.exists && admin.firestore.Timestamp.now() < emailDoc.data().lease) {
        return Promise.reject('Lease already taken, try later.');
      }
      transaction.set(
          emailRef, {lease: new Date(new Date().getTime() + leaseTime)});
      return true;
    });
  });
}

function markSent(emailRef) {
  return emailRef.set({sent: true});
}