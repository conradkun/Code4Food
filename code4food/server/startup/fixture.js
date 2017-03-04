import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

if(true) {
    const users = [{
        username: 'justin',
        password: '1111',
        profile: {
            name: { first: 'Justin', last: 'Glibert' },
        }
    }];

    users.forEach(({ username, password, profile}) => {
        const userExists = Meteor.users.findOne({ 'username': username });

        if (!userExists) {
            const userId = Accounts.createUser({ username, password, profile });
        }
    });
}