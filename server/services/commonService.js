const User = require('../models/userModel');

const fetchUserId = async (filter, fallbackEmail, stripeCustomerId) => {
    let user = await User.findOne(filter);

    if (!user && fallbackEmail) {
        user = await User.findOne({ email: fallbackEmail });

        if (user && stripeCustomerId) {
            await User.updateOne({ _id: user._id }, { stripeCustomerId });
        }
    }

    if (!user) {
        const error = new Error('User not found!');
        error.code = 404;
        throw error;
    }

    return user._id.toString();
};

module.exports = {
    fetchUserId,
};
