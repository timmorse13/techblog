const User = require('./user');
const Submission = require('./submission');

Submission.belongsTo(User, {
    foreignKey: 'submission_id'
})

User.hasMany(Submission, {
    foreignKey: 'submission_id'
})


module.exports = {
    User, Submission
}