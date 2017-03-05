/*
 quest = {id name difficulty duration user}
 pantry = {id name calories}
 subquest = {id questId name difficulty duration user}
 */

function nearestCalories(calories, pantry){
    let nearestVal=Math.abs(pantry[0].calories-calories);
    let nearestIndex=0;
    for (let i=1;i<pantry.length;i++){
        if (Math.abs(pantry[i].calories-calories)<nearestVal){
            nearestVal = Math.abs(pantry[i].calories-calories);
            nearestIndex=i;
        }
    }
    return pantry[nearestIndex].id;
}
function getQuest(id,quests){
    for (let i=0;i<quests.length;i++){
        if (quests[i]._id==id){
            return(quests[i]);
        }
    }
}
function getSubQuest(id,subquests){
    for (let i=0;i<subquests.length;i++){
        if (subquests[i]._id==id){
            return(subquests[i]);
        }
    }
}
function getItem(id,pantry){
    for (let i=0;i<pantry.length;i++){
        if (pantry[i]._id==id){
            return(pantry[i]);
        }
    }
}
function subQuests(id,subQuests){
    let matchingSubQuests = [];
    for (let i=0;i<subQuests.length;i++){
        if (subQuests[i].questId==id){
            matchingSubQuests.push(subQuests[i]);
        }
    }
    return matchingSubQuests;
}
function dropItem(questId,quests,pantry){
    let quest = getQuest(questId,quests);
    let minCal = minCalories(pantry);
    let maxCal = maxCalories(pantry);
    let calories = minCal+quest.difficulty*quest.duration*(maxCal-minCal)/9;
    let droppedItemId = nearestCalories(calories, pantry);
    return droppedItemId;
}
function minCalories (pantry) {
    let min = pantry[0].calories;
    for (i=1;i<pantry.length;i++) {
        if (pantry[i].calories<min){
            min = pantry[i].calories;
        }
    }
    return min;
}
function maxCalories (pantry) {
    let max = pantry[0].calories;
    for (let i=1;i<pantry.length;i++) {
        if (pantry[i].calories>max){
            max = pantry[i].calories;
        }
    }
    return max;
}
function subQuestValue(subQuestId,subQuests,pantry){
    let relevantSubQuests = subQuests(getSubQuest(subQuestId,subQuests).questId,subQuests);
    let sumDifDur = 0;
    for (let i=0;i<relevantSubQuests;i++){
        sumDifDur+=relevantSubQuests[i].difficulty*relevantSubQuests[i].duration;
    }
    let subQuest = getSubQuest(subQuestId,relevantSubQuests);
    return Math.ceil(subQuest.difficulty*subQuest.duration/(sumDifDur*10));
}
function caloriesToPrice(id,pantry){
    let x=minCalories(pantry);
    let y=maxCalories(pantry);
    if (x==y){
        return getItem(id,pantry).calories * 0.12;
    }
    let cal=getItem(id,pantry).calories;
    let a=(2*y-x)/(Math.pow((y-x),2));
    let b=-2*x*a;
    let c=(x*Math.pow(y,2))/Math.pow((y-x),2);
    return Math.ceil(0.10 * (a*Math.pow(cal,2)+b*cal+c));
}

export const GetShitDone = {
    dropItem: dropItem,
    subQuestValue: subQuestValue,
    caloriesToPrice: caloriesToPrice
};