import {Mongo} from 'meteor/mongo';
import {GetShitDone} from '../get_shit_done';
export const Food = new Mongo.Collection('food');

Meteor.methods({
    'addFood': function ({name, calories}) {
        let id = this.userId;
        return Food.insert({
            user: id,
            name,
            calories
        })
    },
    'buy': function (foodId) {
        let food = Food.findOne({_id: foodId});
        if (food.user !== this.userId) {
            throw new Meteor.Error("wrong-user", "this is not the creator of this pantry's item");
        }
        let gold = Meteor.users.findOne({_id : this.userId}).profile.gold;
        if (food.calories > gold) {
            throw new Meteor.Error("not-enough-gold", "you don't have enough gold");
        }
        Meteor.users.update(this.userId, {$set: {"profile.gold": Math.round(gold - GetShitDone.caloriesToPrice(food._id, Food.find({user: this.userId}).fetch()))}});
        return Food.remove({_id: foodId});
    },
});
