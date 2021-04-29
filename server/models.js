const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

console.log("cool, now we're in the models.js file")

const MONGO_URI = "mongodb+srv://nikhilmassand:nmdb@communica2os.m4gae.mongodb.net/communica2os?retryWrites=true&w=majority"

console.log("we made it past the db declaration")

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'MultiCommunicado'
})
    .then(()=> console.log('Connected to Mongo DB'))
    .catch(err => console.log(err));

const Schema = mongoose.Schema;

const sentMessageSchema = new Schema({
    senderId: {type: String, required: true},
    senderLang: {type: String, required: true},
    senderUsername: {type: String, required: true},
    receiverUsername: {type: String, required: true},
    receiverId: {type: String, required: true},
    receiverLang: {type: String, required: true},
    input: {type: String, required: true}
});
const SentMess = mongoose.model('sent_messages', sentMessageSchema);


const transMessageSchema = new Schema({
    senderId: {type: String, required: true},
    senderLang: {type: String, required: true},
    senderUsername: {type: String, required: true},
    receiverUsername: {type: String, required: true},
    receiverId: {type: String, required: true},
    receiverLang: {type: String, required: true},
    input: {type: String, required: true}
});
const TransMess = mongoose.model('trans_messages', transMessageSchema);

const userSchema = new Schema({
    username: {type: String},
    password: {type: String},
    language: {type: String}
    // username: {type: String, required: true, unique: true},
    // password: {type: String, required: true}
});


userSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err,hash) => {
        if (err) return next (err);
        user.password = hash;
        return next();
    })
})

const User = mongoose.model('User', userSchema);

const sessionSchema = new Schema({
    cookieID: { type: String, required: true /* , unique: true */ },
    createdAt: { type: Date, expires: 30, default: Date.now }
});



const Session = mongoose.model('Session', sessionSchema);

module.exports = {
    SentMess,
    TransMess,
    User,
    Session
};




