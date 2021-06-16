const { User } = require('../models');

module.exports = {
	get_comment_username: async (id) => {
		try {
			const userData = await User.findByPk(id);
			const user = userData.get({ plain: true });
			console.log('user :>> ', user);
			return user.name;
		} catch (error) {
			console.log('error :>> ', error);
		}
	},
};
