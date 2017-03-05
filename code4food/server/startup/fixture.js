import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

if(true) {
    const users = [{
        username: 'justin',
        password: '1111',
        profile: {
            name: { first: 'Justin', last: 'Glibert' },
            gold: 0,
            inventory: []
        }
    },
        {
            username: 'dewi',
            password: '1111',
            profile: {
                name: { first: 'Dewi Tim', last: 'Davies' },
                gold: 0,
                inventory: []
            }
        }];

    users.forEach(({ username, password, profile}) => {
        const userExists = Meteor.users.findOne({ 'username': username });

        if (!userExists) {
            const userId = Accounts.createUser({ username, password, profile });
        }
    });
}