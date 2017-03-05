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
function getSubQuests(id,subQuests){
    let matchingSubQuests = [];
    for (let i=0;i<subQuests.length;i++){
        if (subQuests[i].quest==id){
            matchingSubQuests.push(subQuests[i]);
        }
    }
    return matchingSubQuests;
}
function dropItem(questId,quests,pantry){
    console.log('DropItem.id', questId);
    console.log("dropItem.quests", quests);
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

function helper(s){
    if (s=="low"){
        return 1;
    }
    if (s=="medium"){
        return 2;
    }
    if (s=="high"){
        return 3;
    }
}

function subQuestValue(subQuestId,subQuests,quests,pantry){
    let relevantSubQuests = getSubQuests(getSubQuest(subQuestId,subQuests).quest,subQuests);
    console.log("relevantSubQuests", relevantSubQuests);
    let sumDifDur = 0;
    for (let i=0;i<relevantSubQuests;i++){
        sumDifDur+=relevantSubQuests[i].difficulty*relevantSubQuests[i].duration;
    }
    let subQuest = getSubQuest(subQuestId,relevantSubQuests);
    console.log("subQuest", subQuest);
    return Math.ceil(helper(subQuest.difficulty)*helper(subQuest.duration)*dropItem(subQuest.quest,quests,pantry).calories/(sumDifDur*10));
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