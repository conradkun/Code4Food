/*
 quest = {id name difficulty duration user}
 pantry = {id name calories}
 subquest = {id questId name difficulty duration user}
 */

function nearestCalories(calories, pantry){
    let nearestVal=Math.abs(pantry[0].calories-calories);
    console.log("nearestVal",nearestVal);
    let nearestIndex=0;
    for (let i=1;i<pantry.length;i++){
        if (Math.abs(pantry[i].calories-calories)<nearestVal){
            nearestVal = Math.abs(pantry[i].calories-calories);
            nearestIndex=i;
        }
    }
    console.log("nearestIndex",nearestVal);
    return pantry[nearestIndex]._id;
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
    console.log("DropItem.quest", quest);
    let minCal = minCalories(pantry);
    console.log("MinCall", minCal);
    let maxCal = maxCalories(pantry);
    console.log("MaxCall", maxCal);
    console.log([
        minCal,
        helper(quest.difficulty),
        helper(quest.duration),
        (maxCal-minCal)
    ]);
    let calories = minCal+helper(quest.difficulty)*helper(quest.duration)*(maxCal-minCal)/9;
    console.log("calories", calories);
    let droppedItemId = nearestCalories(calories, pantry);
    console.log("droppedItemId", droppedItemId);
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
    if (s.toLowerCase()=="low"){
        return 1;
    }
    if (s.toLowerCase()=="medium"){
        return 2;
    }
    if (s.toLowerCase()=="high"){
        return 3;
    }
}

function subQuestValue(subQuestId,subQuests,quests,pantry){
    let relevantSubQuests = getSubQuests(getSubQuest(subQuestId,subQuests).quest,subQuests);
    console.log("relevantSubQuests", relevantSubQuests);
    let sumDifDur = 0;
    for (let i=0;i<relevantSubQuests.length;i++){
        sumDifDur+=helper(relevantSubQuests[i].difficulty)*helper(relevantSubQuests[i].duration);
        console.log("diff", relevantSubQuests[i].difficulty);
        console.log("dura", relevantSubQuests[i].duration);
    }
    let subQuest = getSubQuest(subQuestId,relevantSubQuests);
    console.log("subQuest", subQuest);
    let dropped = dropItem(subQuest.quest,quests,pantry);
    let droppedItem = getItem(dropped, pantry);
    console.log([
        helper(subQuest.difficulty),
        helper(subQuest.duration),
        droppedItem.calories,
        sumDifDur
    ]);
    let output =  Math.ceil(helper(subQuest.difficulty)*helper(subQuest.duration)*droppedItem.calories/(sumDifDur*10));
    console.log("output", output);
    return output;
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