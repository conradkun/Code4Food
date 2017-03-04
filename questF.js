function nearestneighbour(y, xs){
	var minVal=Math.abs(xs[0]-y);
	var minIndex=0;
	for (i=1;i<xs.length;i++){
		if (Math.abs(xs[i]-y)<minVal){
			minVal = Math.abs(xs[i]-y);
			minIndex=i;
		}
	}

	return minIndex;
}

function dropItem(xs, diff, dur){
	var xmin = minArray(xs);
	var xmax = maxArray(xs);
	var yD = xmin+diff*dur*(xmax-xmin)/9;
	var dItem = nearestneighbour(yD, xs);
	return dItem; // better variable names
}

function minArray (xs) {
	var xmin = xs[0];
	for (i=1;i<xs.length;i++) {
		if (xs[i]<xmin){
			xmin = xs[i];
		}
	}
	return xmin;
}

function maxArray (xs) {
	var xmax = xs[0];
	for (i=1;i<xs.length;i++) {
		if (xs[i]>xmax){
			xmax = xs[i];
		}
	}
	return xmax;
}


function subQuestThing{xs,xsDiff, xsDur, index){ // xsDiff and xsDur are array of difficulties
	var dItem = dropItem(xs, xsDiff[index], xsDur[index]);
	var sumSQ =0;

	for (i=0;i<xs.length;i++){
		sumSQ = sumSQ + xsDiff[i]*xsDur[i];
	}

	var varSQ;
	varSQ = xsDiff[index]*xsDur[index]/sumSQ*xs[dItem];
	return varSQ;
}