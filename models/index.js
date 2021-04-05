const User = require('./user');
const Submission = require('./submission');

Submission.belongsToMany(User, {
    foreignKey: 'submission_id'
})

User.hasOne(Submission, {
    foreignKey: 'submission_id'
})


module.exports = {
    User, Submission
}