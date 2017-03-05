import {Mongo} from 'meteor/mongo';

export const Quest = new Mongo.Collection('quest');
export const SubQuest = new Mongo.Collection('sub_quest');
import {Food} from './food';
import {GetShitDone} from '../get_shit_done';

//TODO Add simpleSchema
Meteor.methods({
    'addQuest': function ({name, difficulty, duration}) {
        let id = this.userId;
        return Quest.insert({
            user: id,
            name,
            difficulty,
            duration,
            completed: false
        })
    },
    'addSubQuest': function ({questId, name, difficulty, duration}) {
        let quest = Quest.findOne({_id: questId});
        let id = this.userId;
        if (quest.user !== this.userId) {
            throw new Meteor.Error("wrong-user", "this is not the creator of the quest");
        }
        return SubQuest.insert({
            user: id,
            quest: questId,
            name,
            difficulty,
            duration,
            completed: false
        });
    },
    'editQuest': function (id, {name, difficulty, duration}) {
        let quest = Quest.findOne({_id: id});
        if (quest.user !== this.userId) {
            throw new Meteor.Error("wrong-user", "this is not the creator of the quest");
        }
        console.log("updating");
        return Quest.update(id, {
            $set: {name, difficulty, duration}
        });
    },
    'editSubQuest': function (id, {name, difficulty, duration}) {
        let subQuest = SubQuest.findOne({_id: id});
        if (subQuest.user !== this.userId) {
            throw new Meteor.Error("wrong-user", "this is not the creator of the quest");
        }
        return SubQuest.update(id, {
            $set: {name, difficulty, duration}
        });
    },
    'completeQuest': function (questId) {
        let quest = Quest.findOne({_id: questId});
        if (this.userId !== quest.user) {
            throw new Meteor.Error("wrong-user", "this is not the creator of the quest");
        }
        return Quest.update({_id: questId}, {
            $set: {
                completed: true
            }
        });
    },
    'completeAllSubQuest': function (questId) {
        let subQuests = SubQuest.find({quest: questId}).fetch();
        console.log(subQuests);
        subQuests.map((q) => {

            let gold = GetShitDone.subQuestValue(q._id, SubQuest.find({user: this.userId}).fetch(),
                Quest.find({user: this.userId}).fetch(), Food.find({user: this.userId}).fetch());
            Meteor.users.update(this.userId, {$inc: {"profile.gold": gold}});

            return SubQuest.update(q._id, {
                $set: {
                    completed: true
                }
            })
        });

    },
    'completeSubQuest': function (subQuestId) {
        let subQuest = SubQuest.findOne({_id: subQuestId});
        if (this.userId !== subQuest.user) {
            throw new Meteor.Error("wrong-user", "this is not the creator of the quest");
        }

        let gold = GetShitDone.subQuestValue(subQuestId, SubQuest.find({user: this.userId}).fetch(),
            Quest.find({user: this.userId}).fetch(), Food.find({user: this.userId}).fetch());
        Meteor.users.update(this.userId, {$inc: {"profile.gold": gold}});
        return SubQuest.update(subQuestId, {
            $set: {
                completed: true
            }
        });
    },
});
