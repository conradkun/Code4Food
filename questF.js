/*
  quest = {id name difficulty duration user}
  pantry = {id name calories}
  subquest = {id questId name difficulty duration user}
*/

function nearestCalories(calories, pantry){
    var nearestVal=Math.abs(pantry[0].calories-calories);
    var nearestIndex=0;
    for (i=1;i<pantry.length;i++){
	if (Math.abs(pantry[i].calories-calories)<nearestVal){
		nearestVal = Math.abs(pantry[i].calories-calories);
		nearestIndex=i;
	    }
	}
    return pantry[nearestIndex].id;
}
function getQuest(id,quests){
    for (i=0;i<quests.length;i++){
	if (quests[i].id==id){
	    return(quests[i]);
	}
    }
}
function getSubQuest(id,subquests){
    for (i=0;i<subquests.length;i++){
	if (subquests[i].id==id){
	    return(subquests[i]);
	}
    }
}
function subQuests(id,subquests){
    var matchingSubquests = [];
    for (i=0;i<subquests.length;i++){
	if (subquests[i].questId==id){
	    matchingSubquests.push(subquests[i]);
	}
	return matchingSubquests;
    }
}
function dropItem(questId,quests,pantry){
    var quest = getQuest(questId,quests);
    var minCal = minCalories(pantry);
    var maxCal = maxCalories(pantry);
    var calories = minCal+quest.difficulty*quest.duration*(maxCal-minCal)/9;
    var droppedItemId = nearestCalories(calories, pantry);
    return droppedItemId;
}
function minCalories (pantry) {
    var min = pantry[0].calories;
    for (i=1;i<pantry.length;i++) {
	if (pantry[i].calories<min){
	    min = pantry[i].calories;
	}
    }
    return min;
}
function maxCalories (pantry) {
    var max = pantry[0].calories;
    for (i=1;i<pantry.length;i++) {
	if (pantry[i].calories>max){
	    max = pantry[i].calories;
	}
    }
    return max;
}
function subQuestValue(subquestId,subquests,pantry){
    var relevantSubquests = subQuests(getSubQuest(subquestId,subquests).questId,subquests);
    var sumDifDur = 0
    for (i=0;i<relevantSubquests;i++){
	sumDifDur+=relevantSubquests[i].difficulty*relevantSubquests[i].duration;
    }
    var subquest = getSubQuest(subquestId,relevabtSubquests);
    return subquest.difficulty*subquest.duration/subDifDur;
}
