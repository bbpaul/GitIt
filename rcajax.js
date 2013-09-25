// Test file - failed

function hideRCDetails(defaultJSON) {
	$('#showCostSavings').css('display','none');
	$('#linksDiv').css('display','none');
	$('#disclaimer-placeHolder').css('display','none');
	$('#costDisclaimer').css('display','none');
	$('#monthBreak').css('display','none');
	if(defaultJSON.rateNameMap!=null) {
		var rateNameArray = defaultJSON.rateNameMap.split(",");
		var rateNameArraySize = rateNameArray.length;
		for(var i=0; i<rateNameArraySize; i++) {
			var a = rateNameArray[i].replace('[','');
			var b = a.replace(']','');
			var rName = b.replace(/\s+/g, '');
			var monthBreakName = "monthBreak" + rName;
			if(document.getElementById(monthBreakName)!=null) {
					document.getElementById(monthBreakName).style.display = 'none';
			}
		}
	} 
	$('#costCurrent').css('display','none');
	$('#costDefault').css('display','none');
	$('#costPending').css('display','none');
	var noDefaultRates = defaultJSON.noOfRates;
	for(var i=0;i<rateNameArraySize;i++) {
		var costId = "costs" + i;
		if(document.getElementById(costId)!=null) {
			document.getElementById(costId).style.display = 'none';
		}		
	}
	for(var i=0;i<rateNameArraySize;i++) {
		var costId = "costs2ndrow" + i;
		if(document.getElementById(costId)!=null) {
			document.getElementById(costId).style.display = 'none';
		}
	}
	$('#dp81ErrorDIV').css("display","");
    document.getElementById('rcForm:dp81Error').innerHTML = defaultJSON.errorMessage;
	$('#printSaveLink').css("display",""); 	
	
	
}
function print() {
			var expand = 1;
			var expandCollapse = $('p.enrollmentInfo-expand').css('display');
			if(expandCollapse=='none') {  // check if expanded
				var expand = 0;
			} 
			// Just to get expanded IEI, expand it, and then get innerHTML
			$('div.enrollment-information').show();
			$('p.enrollmentInfo-expand').css('display','block');
			$('p.enrollmentInfo-collapse').css('display','none');
			
			var errorsEtcSection = document.getElementById("rcForm:userSenario").innerHTML; // errors
			var ieiSection = document.getElementById("rcForm:enrollmentInfo").innerHTML;
			var disclaimerSection = document.getElementById("disclaimer-placeHolder").innerHTML;
			var showCostSavings = document.getElementById("costSavingsSection").innerHTML;
			var defaultColumns = document.getElementById("defaultColumns").innerHTML;
			var ratesSection = document.getElementById("ratesSection").innerHTML;
			var moreThan3RatesSection = document.getElementById("moreThan3RatesSection").innerHTML;
			var trimmed = $.trim(moreThan3RatesSection);
			if(trimmed == "<br>")
				moreThan3RatesSection = "";
			var linksSection = document.getElementById("linksDivForPrint").innerHTML;
			var checkBoxSection = document.getElementById("estTableForPrint").innerHTML;
			var costTableSection = document.getElementById("monthlyBreakDownTable").innerHTML;
			var otherWaysSection = document.getElementById("otherWays").innerHTML;
			var revertSection = document.getElementById("revertSection").innerHTML;
			if(expand == 0) {  // if collapsed, revert to collapsed view
				$('div.enrollment-information').hide();
				$('p.enrollmentInfo-collapse').css('display','block');
				$('p.enrollmentInfo-expand').css('display','none');
			}
			$.ajax({	
		        type: "POST",
		        data: {	"errorsEtcSection":errorsEtcSection.toString(),
		        		"ieiSection":ieiSection.toString(),
		        		"disclaimerSection":disclaimerSection.toString(),
		        		"showCostSavings":showCostSavings.toString(),
		        		"defaultColumns":defaultColumns.toString(),
		        		"ratesSection":ratesSection.toString(),
		        		"moreThan3RatesSection":moreThan3RatesSection.toString(),
		        		"linksSection":linksSection.toString(),
		        		"checkBoxSection":checkBoxSection.toString(),
		        		"costTableSection":costTableSection.toString(),
		        		"revertSection":revertSection.toString(),
		        		"otherWaysSection":otherWaysSection.toString()},
		        dataType: 'html',
		        async : false,
		        url: "/myAccount/portlets/rateComparison/createPDF.faces", 
		        success: function(data) {
				}
			});
}

function showNA(index) {
	var rateSavingsID = index +  "Savings";
	var rateTotalID = index + "Cost";	
	document.getElementById(rateTotalID).style.font = "12px Verdana";
	//document.getElementById(rateTotalID).style.color = "red";  	
	document.getElementById(rateTotalID).style.paddingTop = '10px';	
	document.getElementById(rateTotalID).innerHTML = "\n Not Available";
	document.getElementById(rateSavingsID).style.font = "12px Verdana";
	//document.getElementById(rateSavingsID).style.color = "red"; 
	document.getElementById(rateSavingsID).style.paddingTop = '10px';
	document.getElementById(rateSavingsID).innerHTML = "Not Available";	
	$('#printSaveLink').css("display",""); 	
};

function showNotAvailableNoMatch(defaultJSON) {
	
	if(defaultJSON.rateNameMap!=null) {
		var rateNameArray = defaultJSON.rateNameMap.split(",");
		var rateNameArraySize = rateNameArray.length;
		for(var i=0; i<rateNameArraySize; i++) {
			var a = rateNameArray[i].replace('[','');
			var b = a.replace(']','');
			rName = b.replace(/\s+/g, '');
			var rateNameCostID = rName + "Cost";
			var rateNameSavingsID = rName + "Savings";
			if(document.getElementById(rateNameCostID)!=null) {
				if(document.getElementById(rateNameCostID).innerHTML=="&nbsp;") {
					document.getElementById(rateNameCostID).style.paddingTop = '10px';
					document.getElementById(rateNameCostID).innerHTML = "Not Available";
					document.getElementById(rateNameCostID).style.backgroundImage = ""; 
					document.getElementById(rateNameCostID).style.paddingTop = '10px';
					document.getElementById(rateNameCostID).style.font = "12px Verdana";
					//document.getElementById(rateNameCostID).style.color = "red"; 
					if(document.getElementById(rateNameSavingsID)!=null) {
						document.getElementById(rateNameSavingsID).style.paddingTop = '10px';
						document.getElementById(rateNameSavingsID).innerHTML = "Not Available";
						document.getElementById(rateNameSavingsID).style.font = "12px Verdana";
						//document.getElementById(rateNameSavingsID).style.color = "red"; 
					}		        			 
				}
			}
		}
	} 
	$('#printSaveLink').css("display",""); 	       			
	return;
};

$(document).ready(function() {
	var dp15status = document.getElementById('rcForm:dp15').innerHTML;
	var accMeterHide = document.getElementById('rcForm:accMeterHide').innerHTML;	
	if(!window.location.hash) {
	   if(window.location.href.indexOf("selectedmeter") > -1) {
	         window.location = window.location + '#loaded';
	         window.location.reload();
	     }
	     
	  }
	if(dp15status != "\nfalse") {
	$.ajax({	
        type: "POST",
        data: "{}",
        url: "/myAccount/rateComparisonAJAX.faces",        
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(res) {
        	var currentRateName = document.getElementById('rcForm:currentRateName').innerHTML;
			currentRateName =  currentRateName.replace('(', '');
			currentRateName =  currentRateName.replace(')', '');
			
			if(document.getElementById('pendingRateName')!=null) {
				var pendingRateName = document.getElementById('pendingRateName').innerHTML;
				pendingRateName =  pendingRateName.replace('(', '');
				pendingRateName =  pendingRateName.replace(')', '');				
			}
			if(document.getElementById('rcForm:defaultRateName')!=null){
				var defaultRateName = document.getElementById('rcForm:defaultRateName').innerHTML;
				defaultRateName =  defaultRateName.replace('(', '');
				defaultRateName =  defaultRateName.replace(')', '');				
			}
			var currentRateIndex;
			var defaultRateIndex;
			var pendingRateIndex;
			var dollarSign = "$";
        	var noResults = res.length;
        	var perYear = "/yr";
        	var savingsImage = "<img src=\"resources/images/arrow-down.png\" />";
			var increaseImage = "<img src=\"resources/images/arrow-up.png\" />";
        	if(noResults == 1) {
        		// set to default
        		var defaultJSON = res[0];
        		var noDefaultRates = defaultJSON.noOfRates;
        		document.getElementById('rcForm:noOfRates').innerHTML = noDefaultRates;        		
        		var count = 0;
        		var lessThan12 = 0;
        		if(defaultJSON.errorCode == "1") {           // ERROR IN DP 81.1 RESPONSE        			
        			//alert("Error in DP 81 response");
        			$('#dp81ErrorDIV').css("display","");
        			document.getElementById('rcForm:dp81Error').innerHTML = defaultJSON.errorMessage;
        			hideRCDetails(defaultJSON);
        			return;
        		}
        		for(var i=0; i<noDefaultRates; i++) {  
        			 var tariffName = defaultJSON[i].tariffName;
        			 tariffName = tariffName.replace('(', '');     		
        			 tariffName = tariffName.replace(')', '');
        			if(currentRateName == tariffName) {
        				currentRateindex = i;
        				count ++ ;
        			}
        			if(defaultRateName == tariffName) {
        				defaultRateIndex = i;
        				count ++;
        			}
        			if(pendingRateName == tariffName) {
        				pendingRateIndex = i;
        				count ++;
        			}
        		}
   				if(typeof currentRateindex != 'undefined') { // No current rate - DO NOT DISPLAY ANYTHING BUT ERROR MESSAGE TO USER
        		var ct = count;
        		var remCt = noDefaultRates - ct;
        		$('#estTable').css("display","block");
				$('#costsTable').css("display","");
				for(var j=0;j<noDefaultRates;j++)
        		{
        			var checkBoxShowId = "rate" + (j+1) + "Checkbox";
        			if(j != noDefaultRates-1) {
        				document.getElementById(checkBoxShowId).style.display = '';
        			}	
        			var no = j+1;
        			$("td:nth-child(" + no + ")").show();
        		}
        		var no = j+1;
       			$("td:nth-child(" + no + ")").show();
				
					// Setting current rate values
					
						$('#currentCost').css("background-image","");		        		
		        	if(typeof currentRateindex != 'undefined') {
		        		document.getElementById('currentCost').innerHTML = dollarSign + defaultJSON[currentRateindex].annualCost + perYear;
		        		document.getElementById('rateN1').innerHTML = "<b>" + defaultJSON[currentRateindex].custFriendlyNameWithoutTariffName + "</b><br/>" + defaultJSON[currentRateindex].tariffName;
		        		document.getElementById('currentSavings').innerHTML = "$0/yr";
		        		var currentRateMonthlyArray = new Array();
		        		for(var monthIndex=0; monthIndex<12; monthIndex++)
		        		{
		        			var costIndex = "r1" + monthIndex;
		        			var cost = defaultJSON[currentRateindex][monthIndex];
		        			currentRateMonthlyArray[monthIndex] = cost;
		        			if(cost!="na") {
		        				document.getElementById(costIndex).innerHTML = dollarSign + cost;
		        			}
		        			else {
		        				document.getElementById(costIndex).innerHTML = cost;
		        				//document.getElementById(costIndex).style.color = "red";
		        			}		        			
		        		}
				        document.getElementById('r1Total').innerHTML = dollarSign + defaultJSON[currentRateindex].annualCost;
				        
				        for(var i=0;i<12;i++) {
				        	if(currentRateMonthlyArray[i]!="na") {
					        	var currentLowest = (currentRateMonthlyArray[i]);
					        	break;
					        }
				        }
				         for(var j=11;j>0;j--) {
				        	if(currentRateMonthlyArray[j]!="na") {
					        	var currentHighest = (currentRateMonthlyArray[j]);
					        	break;
					        }
				        }
				        var currentLowestIndex = i;
						var currentHighestIndex = j;
						var currentHighCount = 0;
						var currentLowCount = 0;
				        for (var l=0;l<12;l++)
						{		
							if(currentRateMonthlyArray[l]!="na") {				
								var currentTmp = (currentRateMonthlyArray[l]);
							    if (parseInt(currentTmp) < parseInt(currentLowest)) {
							    	currentLowest = currentTmp;
							    	currentLowestIndex = l;
							    }
							    if (parseInt(currentTmp) > parseInt(currentHighest)) { 
							    	currentHighest = currentTmp;
							    	currentHighestIndex = l;
							    }
						    }
						}
						for (var l=0;l<12;l++)
						{		
							if(currentRateMonthlyArray[l]!="na") {				
								var currentTmp = (currentRateMonthlyArray[l]);
							    if (parseInt(currentTmp) == parseInt(currentLowest)) {
							    	currentLowCount++;
							    }
							    else if (parseInt(currentTmp) == parseInt(currentHighest)) { 
							    	currentHighCount++;
							    }
						    }
						}
					}
					else {
						var index = "current";						
						showNA(index);
					}
					
					// setting default/ pending 
					if(document.getElementById('pendingRateName')!=null) {
						$('#pendingCost').css("background-image",""); 
						if(typeof pendingRateIndex != 'undefined') {
							document.getElementById('pendingCost').innerHTML = dollarSign + defaultJSON[pendingRateIndex].annualCost + perYear;
							document.getElementById('rateN2').innerHTML = "<b>" + defaultJSON[pendingRateIndex].custFriendlyNameWithoutTariffName + "</b><br/>" + defaultJSON[pendingRateIndex].tariffName;
							if(defaultJSON[pendingRateIndex].annualSaving>0) {
			        			document.getElementById('pendingSavings').innerHTML = savingsImage + dollarSign + defaultJSON[pendingRateIndex].annualSaving + perYear;
			        		}
			        		else if(defaultJSON[pendingRateIndex].annualSaving<0){
			        			document.getElementById('pendingSavings').innerHTML = increaseImage + dollarSign + Math.abs(defaultJSON[pendingRateIndex].annualSaving) + perYear;
			        		}
			        		else {
			        			document.getElementById('pendingSavings').innerHTML = dollarSign + Math.abs(defaultJSON[pendingRateIndex].annualSaving) + perYear;
			        		}
			        		
			        		var pendingRateMonthlyArray = new Array();
			        		for(var monthIndex=0; monthIndex<12; monthIndex++)
			        		{
			        			var costIndex = "r2" + monthIndex;
			        			var cost = defaultJSON[pendingRateIndex][monthIndex];
			        			pendingRateMonthlyArray[monthIndex] = cost;
			        			if(cost!="na") {
			        				document.getElementById(costIndex).innerHTML = dollarSign + cost;
			        			}
			        			else {
			        				document.getElementById(costIndex).innerHTML = cost;
			        				//document.getElementById(costIndex).style.color = "red";
			        			}		        			
			        		}
					        document.getElementById('r2Total').innerHTML = dollarSign + defaultJSON[pendingRateIndex].annualCost;
			        		
			        		
			        		for(var i=0;i<12;i++) {
					        	if(pendingRateMonthlyArray[i]!="na") {
						        	var pendingLowest = (pendingRateMonthlyArray[i]);
						        	break;
						        }
				       		 }
					         for(var j=11;j>0;j--) {
					        	if(pendingRateMonthlyArray[j]!="na") {
						        	var pendingHighest = (pendingRateMonthlyArray[j]);
						        	break;
						        }
					        }
					        var pendingLowestIndex = i;
							var pendingHighestIndex = j;
			        		
							var pendingHighCount = 0;
							var pendingLowCount = 0;	
					        for (var l=0;l<12;l++)
							{	
								if(pendingRateMonthlyArray[l]!="na") {						
									var pendingTmp = (pendingRateMonthlyArray[l]);
								    if (parseInt(pendingTmp) < parseInt(pendingLowest)) {
								    	pendingLowest = pendingTmp;
								    	pendingLowestIndex = l;
								    }
								    if (parseInt(pendingTmp) > parseInt(pendingHighest)) { 
								    	pendingHighest = pendingTmp;
								    	pendingHighestIndex = l;
								    }
								 }
							}
						for (var l=0;l<12;l++)
						{		
							if(pendingRateMonthlyArray[l]!="na") {				
								var pendingTmp = (pendingRateMonthlyArray[l]);
							    if (parseInt(pendingTmp) == parseInt(pendingLowest)) {
							    	pendingLowCount++;
							    }
							    else if (parseInt(pendingTmp) == parseInt(pendingHighest)) {
							    	pendingHighCount++;
							    }
						    }
						}
							}
							else {
								var index = "pending";						
								showNA(index);
							}
						
					}
					
					if(document.getElementById('rcForm:defaultRateName')!=null){
						$('#defaultCost').css("background-image",""); 
						if(typeof defaultRateIndex != 'undefined') {
					
							document.getElementById('defaultCost').innerHTML = dollarSign + defaultJSON[defaultRateIndex].annualCost + perYear;
							document.getElementById('rateN2').innerHTML = "<b>" + defaultJSON[defaultRateIndex].custFriendlyNameWithoutTariffName + "</b><br/>" + defaultJSON[defaultRateIndex].tariffName;
			        		if(defaultJSON[defaultRateIndex].annualSaving>0) {
			        			document.getElementById('defaultSavings').innerHTML = savingsImage + dollarSign + defaultJSON[defaultRateIndex].annualSaving + perYear;
			        		}
			        		else if(defaultJSON[defaultRateIndex].annualSaving<0) {
			        			document.getElementById('defaultSavings').innerHTML = increaseImage + dollarSign + Math.abs(defaultJSON[defaultRateIndex].annualSaving) + perYear;
			        		}
			        		else {
			        			document.getElementById('defaultSavings').innerHTML = dollarSign + Math.abs(defaultJSON[defaultRateIndex].annualSaving) + perYear;
			        		}	
			        		
			        		
			        		var defaultRateMonthlyArray = new Array();
			        		for(var monthIndex=0; monthIndex<12; monthIndex++)
			        		{
			        			var costIndex = "r2" + monthIndex;
			        			var cost = defaultJSON[defaultRateIndex][monthIndex];
			        			defaultRateMonthlyArray[monthIndex] = cost;
			        			if(cost!="na") {
			        				document.getElementById(costIndex).innerHTML = dollarSign + cost;
			        			}
			        			else {
			        				document.getElementById(costIndex).innerHTML = cost;
			        				//document.getElementById(costIndex).style.color = "red";
			        			}		        			
			        		}
					        document.getElementById('r2Total').innerHTML = dollarSign + defaultJSON[defaultRateIndex].annualCost;
			        		
			        		
			        		for(var i=0;i<12;i++) {
					        	if(defaultRateMonthlyArray[i]!="na") {
						        	var defaultLowest = (defaultRateMonthlyArray[i]);
						        	break;
						        }
				       		 }
					         for(var j=11;j>0;j--) {
					        	if(defaultRateMonthlyArray[j]!="na") {
						        	var defaultHighest = (defaultRateMonthlyArray[j]);
						        	break;
						        }
					        }
					        var defaultLowestIndex = i;
							var defaultHighest = j;
			        		
							var defaultHighCount = 0;
							var defaultLowCount = 0;	
					        for (var l=0;l<12;l++)
							{	
								if(defaultRateMonthlyArray[l]!="na") {						
									var defaultTmp = (defaultRateMonthlyArray[l]);
								    if (parseInt(defaultTmp) < parseInt(defaultLowest)) {
								    	defaultLowest = defaultTmp;
								    	defaultLowestIndex = l;
								    }
								    if (parseInt(defaultTmp) > parseInt(defaultHighest)) { 
								    	defaultHighest = defaultTmp;
								    	defaultHighestIndex = l;
								    }
								  }
							}
						for (var l=0;l<12;l++)
						{		
							if(defaultRateMonthlyArray[l]!="na") {				
								var defaultTmp = (defaultRateMonthlyArray[l]);
							    if (parseInt(defaultTmp) == parseInt(defaultLowest)) {
							    	defaultLowCount++;
							    }
							    else if (parseInt(defaultTmp) == parseInt(defaultHighest)) { 
							    	defaultHighCount++;
							    }
						    }
						}
							}
							else {
								var index = "default";						
								showNA(index);
							}
					
					}       	
	        	
	        	var swapped;
			    do {
			        swapped = false;
			        for (var i=0; i < noDefaultRates-1; i++) {
			            if ((defaultJSON[i].annualCost) > (defaultJSON[i+1].annualCost)) {
			                var temp = defaultJSON[i];
			                defaultJSON[i] = defaultJSON[i+1];
			                defaultJSON[i+1] = temp;
			                swapped = true;
			            }
			        }
	   			 } while (swapped);
	   			 
	        	
	        	var currentRateName = document.getElementById('rcForm:currentRateName').innerHTML;
				currentRateName =  currentRateName.replace('(', '');
				currentRateName =  currentRateName.replace(')', '');
				
				if(document.getElementById('pendingRateName')!=null) {
					var pendingRateName = document.getElementById('pendingRateName').innerHTML;
					pendingRateName =  pendingRateName.replace('(', '');
					pendingRateName =  pendingRateName.replace(')', '');				
				}
				
				if(document.getElementById('rcForm:defaultRateName')!=null){
					var defaultRateName = document.getElementById('rcForm:defaultRateName').innerHTML;
					defaultRateName =  defaultRateName.replace('(', '');
					defaultRateName =  defaultRateName.replace(')', '');				
				}
	        	
	        	count = count + 1; 
	        	var currFlag = 0;
	        	var defPendFlag = 0;
	        	for(var j=0; j<noDefaultRates; j++) {
	        		var k = 0;
	        		if(defaultJSON[j].tariffName.replace('(', '').replace(')', '') == currentRateName) { 
		        		currFlag = 1;
		        		continue;
	        		}
	        		if(document.getElementById('pendingRateName')!=null) {
	        			if(defaultJSON[j].tariffName.replace('(', '').replace(')', '') == pendingRateName) {
	        			defPendFlag = 1;
	        			 	var checkBoxID = "rate" + 1 + "CheckboxSpan";
	        			 	document.getElementById(checkBoxID).innerHTML = defaultJSON[j].custFriendlyNameWithoutTariffName + defaultJSON[j].tariffName;
			        		continue;
	        			 }
	        		}
	        		if(document.getElementById('rcForm:defaultRateName')!=null) {
	        			if(defaultJSON[j].tariffName.replace('(', '').replace(')', '') == defaultRateName) {
	        			defPendFlag = 1;
	        			 	var checkBoxID = "rate" + 1 + "CheckboxSpan";
			        		document.getElementById(checkBoxID).innerHTML = defaultJSON[j].custFriendlyNameWithoutTariffName + defaultJSON[j].tariffName;
			        		continue;        			 	
	        			 }
	        		}
	        		  
	        		var nameID = "rateN" + count;
	        		if((defPendFlag==1 && currFlag==0) || (defPendFlag==0 && currFlag==1))
	        			var checkBoxID = "rate" + (j+ct-1) + "CheckboxSpan";
	        		else if(defPendFlag==1 && currFlag==1)
	        			var checkBoxID = "rate" + (ct) + "CheckboxSpan";
	        		else 
	        			var checkBoxID = "rate" + (j+ct) + "CheckboxSpan";
	        		if(defaultJSON[j]!=null) {
		        		document.getElementById(checkBoxID).innerHTML = defaultJSON[j].custFriendlyNameWithoutTariffName + defaultJSON[j].tariffName;
		        		document.getElementById(nameID).innerHTML = "<b>" + defaultJSON[j].custFriendlyNameWithoutTariffName + "</b><br/> "+ defaultJSON[j].tariffName; 
		        		
		        		for(var monthIndex=0; monthIndex<12; monthIndex++)
		        		{
		        			var costIndex = "r" + count + monthIndex;
		        			var cost = defaultJSON[j][monthIndex];
		        			if(cost!="na") {
		        				document.getElementById(costIndex).innerHTML = dollarSign + cost;
		        			}
		        			else {
		        				document.getElementById(costIndex).innerHTML = cost;
		        				//document.getElementById(costIndex).style.color = "red";
		        			}		        			
		        		}
		        		var costId = "r" + count + "Total";
		        		document.getElementById(costId).innerHTML = dollarSign + defaultJSON[j].annualCost;
		        		var costSectionId = defaultJSON[j].rateName + "Cost";
		        		document.getElementById(costSectionId).style.backgroundImage = "";  
		        		document.getElementById(costSectionId).innerHTML = dollarSign + defaultJSON[j].annualCost + perYear;
		        		var savingsSectionId = defaultJSON[j].rateName + "Savings";
		        		if(defaultJSON[j].annualSaving > 0) {
		        			document.getElementById(savingsSectionId).innerHTML = savingsImage + dollarSign + defaultJSON[j].annualSaving + perYear;
		        		}	
		        		else if(defaultJSON[j].annualSaving < 0) { 
		        			document.getElementById(savingsSectionId).innerHTML = increaseImage + dollarSign + Math.abs(defaultJSON[j].annualSaving) + perYear;
		        		}	
		        		else {
		        		 	document.getElementById(savingsSectionId).innerHTML = dollarSign + Math.abs(defaultJSON[j].annualSaving) + perYear;
		        		}		
		        		var c = count - 2;
		        		if(ct==1)
		        			c++;
		        		var rateNameI = defaultJSON[j].rateName;
		        		var rateDivNameI = "rateDiv" + c;
		        		var temp = document.getElementById(rateDivNameI).innerHTML;
		        		var sortedRateDiv = defaultJSON[j].rateName + "RateDiv";
		        		var sortedRateDivI = document.getElementById(sortedRateDiv).parentNode.innerHTML;
		        		var sortedId = document.getElementById(sortedRateDiv).parentNode.id;
		        		document.getElementById(rateDivNameI).innerHTML = sortedRateDivI;
		        		var newId = "sort" + c;
		        		document.getElementById(rateDivNameI).id = newId;
		        		if(j < noDefaultRates-ct) {
			        		if(sortedId!=rateDivNameI) {
			        			document.getElementById(sortedId).innerHTML = temp;
			        		}
		        		}
		        		if(j==noDefaultRates-ct) {
		        			if(document.getElementById(sortedId)!=null) {
			        			document.getElementById(sortedId).innerHTML = temp;
			        		}
		        		}	        		
		        		count ++;
		        		}
		        		else {
			        		document.getElementById(costSectionId).style.backgroundImage = "";  
			        		document.getElementById(costSectionId).style.font = "12px Verdana";
							//document.getElementById(costSectionId).style.color = "red";  	
			        		document.getElementById(costSectionId).innerHTML = "Not Available";
			        		document.getElementById(savingsSectionId).style.font = "12px Verdana";
							//document.getElementById(savingsSectionId).style.color = "red";  	
			        		document.getElementById(savingsSectionId).innerHTML = "Not Available";
		        		}	        		
	        		 
	        	}	 	        	
	        	
	        	var optionHighCount = new Array();
	        	var optionLowCount = new Array();
	        	var r4lowest = new Array();
	        	var r4highest = new Array();
	        	var a=0;
	        	var optionalRateMonthlyArray = new Array();
	        	for(var r=ct; r<noDefaultRates; r++){
	        			var rCt = r+1;
	        			var p = 0;
	        			optionalRateMonthlyArray[a]=new Array(); 
	        			var riRowID = "r" + rCt + p;	        			
				        optionalRateMonthlyArray[a][0] = ((document.getElementById(riRowID).innerHTML).replace('$',''));
				        p++;
				        var riRowID = "r" + rCt + p;			        
				        optionalRateMonthlyArray[a][1] = ((document.getElementById(riRowID).innerHTML).replace('$',''));
				         p++;
				        var riRowID = "r" + rCt + p;
				        optionalRateMonthlyArray[a][2] = ((document.getElementById(riRowID).innerHTML).replace('$',''));
				          p++;
				        var riRowID = "r" + rCt + p;
				        optionalRateMonthlyArray[a][3] = ((document.getElementById(riRowID).innerHTML).replace('$',''));
				         p++;
				        var riRowID = "r" + rCt + p;
				        optionalRateMonthlyArray[a][4] = ((document.getElementById(riRowID).innerHTML).replace('$',''));
				         p++;
				        var riRowID = "r" + rCt + p;
				        optionalRateMonthlyArray[a][5] = ((document.getElementById(riRowID).innerHTML).replace('$',''));
				         p++;
				        var riRowID = "r" + rCt + p;
				        optionalRateMonthlyArray[a][6] = ((document.getElementById(riRowID).innerHTML).replace('$',''));
				          p++;
				        var riRowID = "r" + rCt + p;
				        optionalRateMonthlyArray[a][7] = ((document.getElementById(riRowID).innerHTML).replace('$',''));
				          p++;
				        var riRowID = "r" + rCt + p;
				        optionalRateMonthlyArray[a][8] = ((document.getElementById(riRowID).innerHTML).replace('$',''));
				          p++;
				        var riRowID = "r" + rCt + p;
				        optionalRateMonthlyArray[a][9] = ((document.getElementById(riRowID).innerHTML).replace('$',''));
				          p++;
				        var riRowID = "r" + rCt + p;
				        optionalRateMonthlyArray[a][10] = ((document.getElementById(riRowID).innerHTML).replace('$',''));
				          p++;
				        var riRowID = "r" + rCt + p;
				        optionalRateMonthlyArray[a][11] = ((document.getElementById(riRowID).innerHTML).replace('$',''));
				          p++;
				        var riRowID = "r" + rCt + p;
				        
				        for(var i=0;i<12;i++) {
				        	if(optionalRateMonthlyArray[a][i]!="na") {
					        	r4lowest[a] = (optionalRateMonthlyArray[a][i]);
					        	break;
					        }
			       		 }
				         for(var j=11;j>0;j--) {
				        	if(optionalRateMonthlyArray[a][j]!="na") {
					        	r4highest[a] = (optionalRateMonthlyArray[a][j]);
					        	break;
					        }
				         }
				        var r4lowestIndex = i;
						var r4highestIndex = j;
				        
						optionHighCount[a] = 0;
						optionLowCount[a] = 0;	
				        for (var l=0;l<12;l++)
						{	
							if(optionalRateMonthlyArray[a][l]!="na") {					
								var r4tmp = (optionalRateMonthlyArray[a][l]);
							    if (parseInt(r4tmp) < parseInt(r4lowest[a])) {
							    	r4lowest[a] = r4tmp;
							    	r4lowestIndex = l;
							    }
							    if (parseInt(r4tmp) > parseInt(r4highest[a])) { 
							    	r4highest[a] = r4tmp;
							    	r4highestIndex = l;
							    }
							 }
						}
						 for (var l=0;l<12;l++)
						{		
							if(optionalRateMonthlyArray[a][l]!="na") {				
								var r4tmp = (optionalRateMonthlyArray[a][l]);
							    if (parseInt(r4tmp) == parseInt(r4lowest[a])) {
							    	optionLowCount[a]++;
							    }
							    else if (parseInt(r4tmp) == parseInt(r4highest[a])) { 
							    	optionHighCount[a]++;
							    }
						    }
						}
						a++;						
	        	}
	        	var doHighLow = 0;  
	        	if(typeof a != 'undefined') {
		        	for(var q=0; q<a; q++){	        	
		        		if((typeof optionLowCount[q] != 'undefined'? optionLowCount[q]<3 : 1) 
		        		&& (typeof optionHighCount[q] != 'undefined'? optionHighCount[q]<3 : 1) 
		        		&& (typeof defaultHighCount != 'undefined'? defaultHighCount<3 : 1) 
		        		&& (typeof defaultLowCount != 'undefined'? defaultLowCount<3  : 1) 
		        		&& (typeof pendingHighCount != 'undefined'? pendingHighCount<3 : 1) 
		        		&& (typeof pendingLowCount != 'undefined'? pendingLowCount<3 : 1) 
		        		&& (typeof currentLowCount != 'undefined'? currentLowCount<3 : 1)
		        		&& (typeof currentHighCount != 'undefined'? currentHighCount<3 : 1)) {
		        			doHighLow = 1;	
		        		}
		        		else {
		        			doHighLow = 0;
		        			break;
		        		}
		        	}
	        	}
	        	else
	        	{
	        		if((typeof defaultHighCount != 'undefined'? defaultHighCount<3 : 1) 
	        		&& (typeof defaultLowCount != 'undefined'? defaultLowCount<3  : 1) 
	        		&& (typeof pendingHighCount != 'undefined'? pendingHighCount<3 : 1) 
	        		&& (typeof pendingLowCount != 'undefined'? pendingLowCount<3 : 1) 
	        		&& (typeof currentLowCount != 'undefined'? currentLowCount<3 : 1)
	        		&& (typeof currentHighCount != 'undefined'? currentHighCount<3 : 1)) {
	        			doHighLow = 1;	        				
	        		}
	        	}
	        	if(doHighLow == 1)
	        	{
	        		for(var rate=0; rate<a; rate++){ // for no of  of optional rates
	        			for(var month=0; month<12; month++) { // for no of months
	        				var rCt = ct+1+rate;
	        				if(optionalRateMonthlyArray[rate][month]!="na") {				
								var r4tmp = (optionalRateMonthlyArray[rate][month]);
							    if (r4tmp == r4lowest[rate]) {
							    	r4lowestIndex = month;
							    	var rIndex = "r"+rCt;
							    	var r4lowestIndexString = r4lowestIndex.toString();
									var r4lowestIndexRowid = rIndex + r4lowestIndexString;
									document.getElementById(r4lowestIndexRowid).style.fontWeight = 'bold';
									document.getElementById(r4lowestIndexRowid).className += " green";
									document.getElementById(r4lowestIndexRowid).innerHTML += "(Lowest)";									
							    }
							    else if (r4tmp == r4highest[rate]) { 
							    	optionHighCount[a]++;
							    	r4highestIndex = month;
							    	var rIndex = "r"+rCt;
									var r4highestIndexString = r4highestIndex.toString();
									var r4highestIndexRowid = rIndex + r4highestIndexString;
									document.getElementById(r4highestIndexRowid).style.fontWeight = 'bold';
									document.getElementById(r4highestIndexRowid).className += " red";
									document.getElementById(r4highestIndexRowid).innerHTML += "(Highest)";
							    }
						    }	        				
	        			}
	        		}
	        		for (var l=0;l<12;l++)
					{	
						if(typeof currentRateMonthlyArray != 'undefined') { 	
							if(currentRateMonthlyArray[l]!="na") {				
								var currentTmp = (currentRateMonthlyArray[l]);
							    if (currentTmp == currentLowest) {
							    	r4lowestIndex = l;
							    	var r4lowestIndexString = r4lowestIndex.toString();
									var r4lowestIndexRowid = "r1"+r4lowestIndexString;
									document.getElementById(r4lowestIndexRowid).style.fontWeight = 'bold';
									document.getElementById(r4lowestIndexRowid).className += " green";
									document.getElementById(r4lowestIndexRowid).innerHTML += "(Lowest)";
							    }
							    else if (currentTmp == currentHighest) { 
							    	r4highestIndex = l;
							    	var r4highestIndexString = r4highestIndex.toString();
									var r4highestIndexRowid = "r1"+r4highestIndexString;
									document.getElementById(r4highestIndexRowid).style.fontWeight = 'bold';
									document.getElementById(r4highestIndexRowid).className += " red";
									document.getElementById(r4highestIndexRowid).innerHTML += "(Highest)";
							    }
						    }
					    }
					    if(typeof pendingRateMonthlyArray != 'undefined') { 
						    if(pendingRateMonthlyArray[l]!="na") {				
								var pendingTmp = (pendingRateMonthlyArray[l]);
							    if (pendingTmp == pendingLowest) {
							    	r4lowestIndex = l;
							    	var r4lowestIndexString = r4lowestIndex.toString();
									var r4lowestIndexRowid = "r2"+r4lowestIndexString;
									document.getElementById(r4lowestIndexRowid).style.fontWeight = 'bold';
									document.getElementById(r4lowestIndexRowid).className += " green";
									document.getElementById(r4lowestIndexRowid).innerHTML += "(Lowest)";
							    }
							    else if (pendingTmp == pendingHighest) { 
							    	r4highestIndex = l;
							    	var r4highestIndexString = r4highestIndex.toString();
									var r4highestIndexRowid = "r2"+r4highestIndexString;
									document.getElementById(r4highestIndexRowid).style.fontWeight = 'bold';
									document.getElementById(r4highestIndexRowid).className += " red";
									document.getElementById(r4highestIndexRowid).innerHTML += "(Highest)";
							    }
						    }
						 }
						 if(typeof defaultRateMonthlyArray != 'undefined') {  
						     if(defaultRateMonthlyArray[l]!="na") {				
								var defaultTmp = (defaultRateMonthlyArray[l]);
							    if (defaultTmp == pendingLowest) {
							    	r4lowestIndex = l;
							    	var r4lowestIndexString = r4lowestIndex.toString();
									var r4lowestIndexRowid = "r2"+r4lowestIndexString;
									document.getElementById(r4lowestIndexRowid).style.fontWeight = 'bold';
									document.getElementById(r4lowestIndexRowid).className += " green";
									document.getElementById(r4lowestIndexRowid).innerHTML += "(Lowest)";
							    }
							    else if (defaultTmp == pendingHighest) { 
							    	r4highestIndex = l;
							    	var r4highestIndexString = r4highestIndex.toString();
									var r4highestIndexRowid = "r2"+r4highestIndexString;
									document.getElementById(r4highestIndexRowid).style.fontWeight = 'bold';
									document.getElementById(r4highestIndexRowid).className += " red";
									document.getElementById(r4highestIndexRowid).innerHTML += "(Highest)";
							    }
						    }
						 }
					}
	        		
	        	}
       		//print();    // Function to set DOM elements to Bean object	
       		showNotAvailableNoMatch(defaultJSON);
       		$('#printSaveLink').css("display","");
       		}
       		else {  // Hide Estimated Costs, Cost - Savings Toggle Link, Estimates by Month Link, Custom Analysis Link, 
       		hideRCDetails(defaultJSON);
       		$('#printSaveLink').css("display","");
       		}
       		$('#printSaveLink').css("display",""); 
        	} // if no of results = 1;
        	
        	else { // get newRate and setDefaultRate to input hidden field
        	
        	var defaultJSON = res[0];
        	var newJSON = res[1];
        		var noDefaultRates = newJSON.noOfRates;
        		document.getElementById('rcForm:noOfRates').innerHTML = noDefaultRates;
        		var count = 0;
        		if(newJSON.errorCode == "1") {           // ERROR IN DP 81.1 RESPONSE        			
        			//alert("Error in DP 81 response");
        			$('#dp81ErrorDIV').css("display","");
        			document.getElementById('rcForm:dp81Error').innerHTML = newJSON.errorMessage;
        			hideRCDetails(newJSON);
        			return;
        		}
        		for(var i=0; i<noDefaultRates; i++) {
	        		var tariffName = newJSON[i].tariffName;
        			tariffName = tariffName.replace('(', '');     		
        			tariffName = tariffName.replace(')', '');
        		
        			if(currentRateName == tariffName) {
        				currentRateindex = i;
        				count ++ ;
        			}
        			if(defaultRateName == tariffName) {
        				defaultRateIndex = i;
        				count ++;
        			}
        			if(pendingRateName == tariffName) {
        				pendingRateIndex = i;
        				count ++;
        			}
        		}
        		
        		
   				if(typeof currentRateindex != 'undefined') { // No current rate - DO NOT DISPLAY ANYTHING BUT ERROR MESSAGE TO USER
        		
        		var ct = count;
        		var remCt = noDefaultRates - ct;
        		
        		$('#estTable').css("display","block");
				$('#costsTable').css("display","");
			
				// Setting current rate values
				$('#currentCost').css("background-image","");		        		
		        	if(typeof currentRateindex != 'undefined') {
		        		document.getElementById('currentCost').innerHTML = dollarSign + newJSON[currentRateindex].annualCost + perYear;
		        		document.getElementById('rateN1').innerHTML = "<b>" + newJSON[currentRateindex].custFriendlyNameWithoutTariffName + "</b><br/>" + newJSON[currentRateindex].tariffName;
		        		var newCurrentSavings = newJSON[currentRateindex].annualCost - defaultJSON[currentRateindex].annualCost;
		        		if(newCurrentSavings>0) {
				        			document.getElementById('currentSavings').innerHTML = savingsImage + dollarSign + newCurrentSavings + perYear;
		        		}
		        		else if(newCurrentSavings<0){
		        			document.getElementById('currentSavings').innerHTML = increaseImage + dollarSign + Math.abs(newCurrentSavings) + perYear;
		        		}
		        		else {
		        			document.getElementById('currentSavings').innerHTML = dollarSign + Math.abs(newCurrentSavings) + perYear;
		        		}	
		        		var currentRateMonthlyArray = new Array();
		        		for(var monthIndex=0; monthIndex<12; monthIndex++)
		        		{
		        			var costIndex = "r1" + monthIndex;
		        			var cost = newJSON[currentRateindex][monthIndex];
		        			currentRateMonthlyArray[monthIndex] = cost;
		        			if(cost!="na") {
		        				document.getElementById(costIndex).innerHTML = dollarSign + cost;
		        			}
		        			else {
		        				document.getElementById(costIndex).innerHTML = cost;
		        				//document.getElementById(costIndex).style.color = "red";
		        			}		        			
		        		}
				        document.getElementById('r1Total').innerHTML = dollarSign + newJSON[currentRateindex].annualCost;
				        
				        
				         for(var i=0;i<12;i++) {
				        	if(currentRateMonthlyArray[i]!="na") {
					        	var currentLowest = (currentRateMonthlyArray[i]);
					        	break;
					        }
				        }
				         for(var j=11;j>0;j--) {
				        	if(currentRateMonthlyArray[j]!="na") {
					        	var currentHighest = (currentRateMonthlyArray[j]);
					        	break;
					        }
				        }
				        var currentLowestIndex = i;
						var currentHighestIndex = j;
						var currentHighCount = 0;
						var currentLowCount = 0;	
				        for (var l=0;l<12;l++)
						{		
							if(currentRateMonthlyArray[l]!="na") {				
								var currentTmp = (currentRateMonthlyArray[l]);
							    if (parseInt(currentTmp) < parseInt(currentLowest)) {
							    	currentLowest = currentTmp;
							    	currentLowestIndex = l;
							    }
							    if (parseInt(currentTmp) > parseInt(currentHighest)) { 
							    	currentHighest = currentTmp;
							    	currentHighestIndex = l;
							    }
						    }
						}
						for (var l=0;l<12;l++)
						{		
							if(currentRateMonthlyArray[l]!="na") {				
								var currentTmp = (currentRateMonthlyArray[l]);
							    if (parseInt(currentTmp) == parseInt(currentLowest)) {
							    	currentLowCount++;
							    }
							    else if (parseInt(currentTmp) == parseInt(currentHighest)) { 
							    	currentHighCount++;
							    }
						    }
						}
					}
					else {
						var index = "current";						
						showNA(index);
					}
					
					// setting default/ pending 
					if(document.getElementById('pendingRateName')!=null) {
						$('#pendingCost').css("background-image",""); 
						if(typeof pendingRateIndex != 'undefined') {
							document.getElementById('pendingCost').innerHTML = dollarSign + newJSON[pendingRateIndex].annualCost + perYear;
							document.getElementById('rateN2').innerHTML = "<b>" + newJSON[pendingRateIndex].custFriendlyNameWithoutTariffName + "</b><br/>" + newJSON[pendingRateIndex].tariffName;
							if(newJSON[pendingRateIndex].annualSaving>0) {
			        			document.getElementById('pendingSavings').innerHTML = savingsImage + dollarSign + newJSON[pendingRateIndex].annualSaving + perYear;
			        		}
			        		else if(newJSON[pendingRateIndex].annualSaving<0) {
			        			document.getElementById('pendingSavings').innerHTML = increaseImage + dollarSign + Math.abs(newJSON[pendingRateIndex].annualSaving) + perYear;
			        		}
			        		else {
			        			document.getElementById('pendingSavings').innerHTML = dollarSign + Math.abs(newJSON[pendingRateIndex].annualSaving) + perYear;
			        		}	
				        	var pendingRateMonthlyArray = new Array();
			        		for(var monthIndex=0; monthIndex<12; monthIndex++)
			        		{
			        			var costIndex = "r2" + monthIndex;
			        			var cost = newJSON[pendingRateIndex][monthIndex];
			        			pendingRateMonthlyArray[monthIndex] = cost;
			        			if(cost!="na") {
			        				document.getElementById(costIndex).innerHTML = dollarSign + cost;
			        			}
			        			else {
			        				document.getElementById(costIndex).innerHTML = cost;
			        				//document.getElementById(costIndex).style.color = "red";
			        			}		        			
			        		}
					        document.getElementById('r2Total').innerHTML = dollarSign + newJSON[pendingRateIndex].annualCost;
					        for(var i=0;i<12;i++) {
					        	if(pendingRateMonthlyArray[i]!="na") {
						        	var pendingLowest = (pendingRateMonthlyArray[i]);
						        	break;
						        }
				       		 }
					         for(var j=11;j>0;j--) {
					        	if(pendingRateMonthlyArray[j]!="na") {
						        	var pendingHighest = (pendingRateMonthlyArray[j]);
						        	break;
						        }
					        }
					        var pendingLowestIndex = i;
							var pendingHighestIndex = j;
							var pendingHighCount = 0;
							var pendingLowCount = 0;	
					        for (var l=0;l<12;l++)
							{	
								if(pendingRateMonthlyArray[l]!="na") {						
									var pendingTmp = (pendingRateMonthlyArray[l]);
								    if (parseInt(pendingTmp) < parseInt(pendingLowest)) {
								    	pendingLowest = pendingTmp;
								    	pendingLowestIndex = l;
								    }
								    if (parseInt(pendingTmp) > parseInt(pendingHighest)) { 
								    	pendingHighest = pendingTmp;
								    	pendingHighestIndex = l;
								    }
								 }
							}
						for (var l=0;l<12;l++)
						{		
							if(pendingRateMonthlyArray[l]!="na") {				
								var pendingTmp = (pendingRateMonthlyArray[l]);
							    if (parseInt(pendingTmp) == parseInt(pendingLowest)) {
							    	pendingLowCount++;
							    }
							    else if (parseInt(pendingTmp) == parseInt(pendingHighest)) {
							    	pendingHighCount++;
							    }
						    }
						}
							}
							else {
								var index = "pending";						
								showNA(index);
							}
						
					}
					
					if(document.getElementById('rcForm:defaultRateName')!=null){
						$('#defaultCost').css("background-image",""); 
						if(typeof defaultRateIndex != 'undefined') {
					
							document.getElementById('defaultCost').innerHTML = dollarSign + newJSON[defaultRateIndex].annualCost + perYear;
							document.getElementById('rateN2').innerHTML = "<b>" + newJSON[defaultRateIndex].custFriendlyNameWithoutTariffName + "</b><br/>" +newJSON[defaultRateIndex].tariffName;
			        		if(newJSON[defaultRateIndex].annualSaving>0) {
			        			document.getElementById('defaultSavings').innerHTML = savingsImage + dollarSign + newJSON[defaultRateIndex].annualSaving + perYear;
			        		}
			        		else if(newJSON[defaultRateIndex].annualSaving<0) {
			        			document.getElementById('defaultSavings').innerHTML = increaseImage + dollarSign + Math.abs(newJSON[defaultRateIndex].annualSaving) + perYear;
			        		}
			        		else {
			        			document.getElementById('defaultSavings').innerHTML = dollarSign + Math.abs(newJSON[defaultRateIndex].annualSaving) + perYear;
			        		}	
			        		var defaultRateMonthlyArray = new Array();
			        		for(var monthIndex=0; monthIndex<12; monthIndex++)
			        		{
			        			var costIndex = "r2" + monthIndex;
			        			var cost = newJSON[defaultRateindex][monthIndex];
			        			defaultRateMonthlyArray[monthIndex] = cost;
			        			if(cost!="na") {
			        				document.getElementById(costIndex).innerHTML = dollarSign + cost;
			        			}
			        			else {
			        				document.getElementById(costIndex).innerHTML = cost;
			        				//document.getElementById(costIndex).style.color = "red";
			        			}		        			
			        		}
					        document.getElementById('r2Total').innerHTML = dollarSign + newJSON[defaultRateindex].annualCost;
					        for(var i=0;i<12;i++) {
					        	if(defaultRateMonthlyArray[i]!="na") {
						        	var defaultLowest = (defaultRateMonthlyArray[i]);
						        	break;
						        }
				       		 }
					         for(var j=11;j>0;j--) {
					        	if(defaultRateMonthlyArray[j]!="na") {
						        	var defaultHighest = (defaultRateMonthlyArray[j]);
						        	break;
						        }
					        }
					        var defaultLowestIndex = i;
							var defaultHighest = j;
							var defaultHighCount = 0;
							var defaultLowCount = 0;	
					        for (var l=0;l<12;l++)
							{	
								if(defaultRateMonthlyArray[l]!="na") {						
									var defaultTmp = (defaultRateMonthlyArray[l]);
								    if (parseInt(defaultTmp) < parseInt(defaultLowest)) {
								    	defaultLowest = defaultTmp;
								    	defaultLowestIndex = l;
								    }
								    if (parseInt(defaultTmp) > parseInt(defaultHighest)) { 
								    	defaultHighest = defaultTmp;
								    	defaultHighestIndex = l;
								    }
								  }
							}
						for (var l=0;l<12;l++)
						{		
							if(defaultRateMonthlyArray[l]!="na") {				
								var defaultTmp = (defaultRateMonthlyArray[l]);
							    if (parseInt(defaultTmp) == parseInt(defaultLowest)) {
							    	defaultLowCount++;
							    }
							    else if (parseInt(defaultTmp) == parseInt(defaultHighest)) { 
							    	defaultHighCount++;
							    }
						    }
						}
							}
							else {
								var index = "default";						
								showNA(index);
							}
					
					}       	
	        	
	        	var swapped;
			    do {
			        swapped = false;
			        for (var i=0; i < noDefaultRates-1; i++) {
			            if ((newJSON[i].annualCost) > (newJSON[i+1].annualCost)) {
			                var temp = newJSON[i];
			                newJSON[i] = newJSON[i+1];
			                newJSON[i+1] = temp;
			                swapped = true;
			            }
			        }
	   			 } while (swapped);
	   			 
	        	
	        	var currentRateName = document.getElementById('rcForm:currentRateName').innerHTML;
				currentRateName =  currentRateName.replace('(', '');
				currentRateName =  currentRateName.replace(')', '');
				
				if(document.getElementById('pendingRateName')!=null) {
					var pendingRateName = document.getElementById('pendingRateName').innerHTML;
					pendingRateName =  pendingRateName.replace('(', '');
					pendingRateName =  pendingRateName.replace(')', '');				
				}
				
				if(document.getElementById('rcForm:defaultRateName')!=null){
					var defaultRateName = document.getElementById('rcForm:defaultRateName').innerHTML;
					defaultRateName =  defaultRateName.replace('(', '');
					defaultRateName =  defaultRateName.replace(')', '');				
				}
	        	
	        	count = count + 1; 
	        	var currFlag = 0;
	        	var defPendFlag = 0;
	        	for(var j=0; j<noDefaultRates; j++) {
	        		var k = 0;
	        		if(newJSON[j].tariffName.replace('(', '').replace(')', '') == currentRateName) { 
		        		currFlag = 1;
		        		continue;
	        		}
	        		if(document.getElementById('pendingRateName')!=null) {
	        			if(newJSON[j].tariffName.replace('(', '').replace(')', '') == pendingRateName) { 
	        			defPendFlag = 1;
	        			 	var checkBoxID = "rate" + 1 + "CheckboxSpan";
	        			 	document.getElementById(checkBoxID).innerHTML = newJSON[j].custFriendlyNameWithoutTariffName + newJSON[j].tariffName;
			        		continue;
	        			 }
	        		}
	        		if(document.getElementById('rcForm:defaultRateName')!=null) {
	        			if(newJSON[j].tariffName.replace('(', '').replace(')', '') == defaultRateName) { 
	        			defPendFlag = 1;
	        			 	var checkBoxID = "rate" + 1 + "CheckboxSpan";
			        		document.getElementById(checkBoxID).innerHTML = newJSON[j].custFriendlyNameWithoutTariffName + newJSON[j].tariffName;
			        		continue;        			 	
	        			 }
	        		}
	        		  
	        		var nameID = "rateN" + count;
	        		if((defPendFlag==1 && currFlag==0) || (defPendFlag==0 && currFlag==1))
	        			var checkBoxID = "rate" + (j+ct-1) + "CheckboxSpan";
	        		else if(defPendFlag==1 && currFlag==1)
	        			var checkBoxID = "rate" + (ct) + "CheckboxSpan";
	        		else 
	        			var checkBoxID = "rate" + (j+ct) + "CheckboxSpan";
	        		if(newJSON[j]!=null) {
		        		document.getElementById(checkBoxID).innerHTML = newJSON[j].custFriendlyNameWithoutTariffName + newJSON[j].tariffName; 
		        		document.getElementById(nameID).innerHTML =  "<b>" + newJSON[j].custFriendlyNameWithoutTariffName + "</b><br/>" + newJSON[j].tariffName; 
		        			for(var monthIndex=0; monthIndex<12; monthIndex++)
		        		{
		        			var costIndex = "r" + count + monthIndex;
		        			var cost = newJSON[j][monthIndex];
		        			if(cost!="na") {
		        				document.getElementById(costIndex).innerHTML = dollarSign + cost;
		        			}
		        			else {
		        				document.getElementById(costIndex).innerHTML = cost;
		        				//document.getElementById(costIndex).style.color = "red";
		        			}		        			
		        		}
		        		var costId = "r" + count + "Total";
		        		document.getElementById(costId).innerHTML = dollarSign + newJSON[j].annualCost;
		        		var costSectionId = newJSON[j].rateName + "Cost";
		        		document.getElementById(costSectionId).style.backgroundImage = "";  
		        		document.getElementById(costSectionId).innerHTML = dollarSign + newJSON[j].annualCost + perYear;
		        		var savingsSectionId = newJSON[j].rateName + "Savings";
		        		if(newJSON[j].annualSaving > 0) {
		        			document.getElementById(savingsSectionId).innerHTML = savingsImage + dollarSign + newJSON[j].annualSaving + perYear;
		        		}
		        		else if(newJSON[j].annualSaving < 0) { 
		        			document.getElementById(savingsSectionId).innerHTML = increaseImage + dollarSign + Math.abs(newJSON[j].annualSaving) + perYear;
		        		}
		        		else
		        			document.getElementById(savingsSectionId).innerHTML = dollarSign + Math.abs(newJSON[j].annualSaving) + perYear;
		        		
		        		var c = count - 2;
		        		if(ct==1)
		        			c++;
		        		var rateNameI = newJSON[j].rateName;
		        		var rateDivNameI = "rateDiv" + c;
		        		var temp = document.getElementById(rateDivNameI).innerHTML;
		        		var sortedRateDiv = newJSON[j].rateName + "RateDiv";
		        		var sortedRateDivI = document.getElementById(sortedRateDiv).parentNode.innerHTML;
		        		var sortedId = document.getElementById(sortedRateDiv).parentNode.id;
		        		document.getElementById(rateDivNameI).innerHTML = sortedRateDivI;
		        		var newId = "sort" + c;
		        		document.getElementById(rateDivNameI).id = newId;
		        		if(j < noDefaultRates-ct) {
			        		if(sortedId!=rateDivNameI) {
			        			document.getElementById(sortedId).innerHTML = temp;
			        		}
		        		}
		        		if(j==noDefaultRates-ct) {
		        			if(document.getElementById(sortedId)!=null) {
			        			document.getElementById(sortedId).innerHTML = temp;
			        		}
		        		}	        		
		        		count ++;
		        		}
		        		else {
			        		document.getElementById(costSectionId).style.backgroundImage = "";  
			        		document.getElementById(costSectionId).style.font = "12px Verdana";
							//document.getElementById(costSectionId).style.color = "red";  	
			        		document.getElementById(costSectionId).innerHTML = "Not Available";
			        		document.getElementById(savingsSectionId).style.font = "12px Verdana";
							//document.getElementById(savingsSectionId).style.color = "red";  	
			        		document.getElementById(savingsSectionId).innerHTML = "Not Available";
		        		}	        		
	        		 
	        	}	 	        	
	        	
	        	var optionHighCount = new Array();
	        	var optionLowCount = new Array();
	        	var r4lowest = new Array();
	        	var r4highest = new Array();
	        	var a=0;
	        	var optionalRateMonthlyArray = new Array();
	        	for(var r=ct; r<noDefaultRates; r++){
	        			var rCt = r+1;
	        			var p = 0;
	        			optionalRateMonthlyArray[a]=new Array(); 
	        			var riRowID = "r" + rCt + p;	        			
				        optionalRateMonthlyArray[a][0] = ((document.getElementById(riRowID).innerHTML).replace('$',''));
				        p++;
				        var riRowID = "r" + rCt + p;			        
				        optionalRateMonthlyArray[a][1] = ((document.getElementById(riRowID).innerHTML).replace('$',''));
				         p++;
				        var riRowID = "r" + rCt + p;
				        optionalRateMonthlyArray[a][2] = ((document.getElementById(riRowID).innerHTML).replace('$',''));
				          p++;
				        var riRowID = "r" + rCt + p;
				        optionalRateMonthlyArray[a][3] = ((document.getElementById(riRowID).innerHTML).replace('$',''));
				         p++;
				        var riRowID = "r" + rCt + p;
				        optionalRateMonthlyArray[a][4] = ((document.getElementById(riRowID).innerHTML).replace('$',''));
				         p++;
				        var riRowID = "r" + rCt + p;
				        optionalRateMonthlyArray[a][5] = ((document.getElementById(riRowID).innerHTML).replace('$',''));
				         p++;
				        var riRowID = "r" + rCt + p;
				        optionalRateMonthlyArray[a][6] = ((document.getElementById(riRowID).innerHTML).replace('$',''));
				          p++;
				        var riRowID = "r" + rCt + p;
				        optionalRateMonthlyArray[a][7] = ((document.getElementById(riRowID).innerHTML).replace('$',''));
				          p++;
				        var riRowID = "r" + rCt + p;
				        optionalRateMonthlyArray[a][8] = ((document.getElementById(riRowID).innerHTML).replace('$',''));
				          p++;
				        var riRowID = "r" + rCt + p;
				        optionalRateMonthlyArray[a][9] = ((document.getElementById(riRowID).innerHTML).replace('$',''));
				          p++;
				        var riRowID = "r" + rCt + p;
				        optionalRateMonthlyArray[a][10] = ((document.getElementById(riRowID).innerHTML).replace('$',''));
				          p++;
				        var riRowID = "r" + rCt + p;
				        optionalRateMonthlyArray[a][11] = ((document.getElementById(riRowID).innerHTML).replace('$',''));
				          p++;
				        var riRowID = "r" + rCt + p;
				         for(var i=0;i<12;i++) {
				        	if(optionalRateMonthlyArray[a][i]!="na") {
					        	r4lowest[a] = (optionalRateMonthlyArray[a][i]);
					        	break;
					        }
			       		 }
				         for(var j=11;j>0;j--) {
				        	if(optionalRateMonthlyArray[a][j]!="na") {
					        	r4highest[a] = (optionalRateMonthlyArray[a][j]);
					        	break;
					        }
				         }
				        var r4lowestIndex = i;
						var r4highestIndex = j;
						optionHighCount[a] = 0;
						optionLowCount[a] = 0;	
				        for (var l=0;l<12;l++)
						{	
							if(optionalRateMonthlyArray[a][l]!="na") {					
								var r4tmp = (optionalRateMonthlyArray[a][l]);
							    if (parseInt(r4tmp) < parseInt(r4lowest[a])) {
							    	r4lowest[a] = r4tmp;
							    	r4lowestIndex = l;
							    }
							    if (parseInt(r4tmp) > parseInt(r4highest[a])) { 
							    	r4highest[a] = r4tmp;
							    	r4highestIndex = l;
							    }
							 }
						}
						 for (var l=0;l<12;l++)
						{		
							if(optionalRateMonthlyArray[a][l]!="na") {				
								var r4tmp = (optionalRateMonthlyArray[a][l]);
							    if (parseInt(r4tmp) == parseInt(r4lowest[a])) {
							    	optionLowCount[a]++;
							    }
							    else if (parseInt(r4tmp) == parseInt(r4highest[a])) { 
							    	optionHighCount[a]++;
							    }
						    }
						}
						a++;						
	        	}
	        	var doHighLow = 0;  
	        	if(typeof a != 'undefined') {
		        	for(var q=0; q<a; q++){	        	
		        		if((typeof optionLowCount[q] != 'undefined'? optionLowCount[q]<3 : 1) 
		        		&& (typeof optionHighCount[q] != 'undefined'? optionHighCount[q]<3 : 1) 
		        		&& (typeof defaultHighCount != 'undefined'? defaultHighCount<3 : 1) 
		        		&& (typeof defaultLowCount != 'undefined'? defaultLowCount<3  : 1) 
		        		&& (typeof pendingHighCount != 'undefined'? pendingHighCount<3 : 1) 
		        		&& (typeof pendingLowCount != 'undefined'? pendingLowCount<3 : 1) 
		        		&& (typeof currentLowCount != 'undefined'? currentLowCount<3 : 1)
		        		&& (typeof currentHighCount != 'undefined'? currentHighCount<3 : 1)) {
		        			doHighLow = 1;	        				
		        		}
		        		else {
		        			doHighLow = 0;
		        			break;
		        		}
		        	}
	        	}
	        	else
	        	{
	        		if((typeof defaultHighCount != 'undefined'? defaultHighCount<3 : 1) 
	        		&& (typeof defaultLowCount != 'undefined'? defaultLowCount<3  : 1) 
	        		&& (typeof pendingHighCount != 'undefined'? pendingHighCount<3 : 1) 
	        		&& (typeof pendingLowCount != 'undefined'? pendingLowCount<3 : 1) 
	        		&& (typeof currentLowCount != 'undefined'? currentLowCount<3 : 1)
	        		&& (typeof currentHighCount != 'undefined'? currentHighCount<3 : 1)) {
	        			doHighLow = 1;	        				
	        		}
	        	}
	        	if(doHighLow == 1)
	        	{
	        		for(var rate=0; rate<a; rate++){ // for no of  of optional rates
	        			for(var month=0; month<12; month++) { // for no of months
	        				var rCt = ct+1+rate;
	        				if(optionalRateMonthlyArray[rate][month]!="na") {				
								var r4tmp = (optionalRateMonthlyArray[rate][month]);
							    if (r4tmp == r4lowest[rate]) {
							    	r4lowestIndex = month;
							    	var rIndex = "r"+rCt;
							    	var r4lowestIndexString = r4lowestIndex.toString();
									var r4lowestIndexRowid = rIndex + r4lowestIndexString;
									document.getElementById(r4lowestIndexRowid).style.fontWeight = 'bold';
									document.getElementById(r4lowestIndexRowid).className += " green";
									document.getElementById(r4lowestIndexRowid).innerHTML += "(Lowest)";									
							    }
							    else if (r4tmp == r4highest[rate]) { 
							    	optionHighCount[a]++;
							    	r4highestIndex = month;
							    	var rIndex = "r"+rCt;
									var r4highestIndexString = r4highestIndex.toString();
									var r4highestIndexRowid = rIndex + r4highestIndexString;
									document.getElementById(r4highestIndexRowid).style.fontWeight = 'bold';
									document.getElementById(r4highestIndexRowid).className += " red";
									document.getElementById(r4highestIndexRowid).innerHTML += "(Highest)";
							    }
						    }	        				
	        			}
	        		}
	        		for (var l=0;l<12;l++)
					{	
						if(typeof currentRateMonthlyArray != 'undefined') { 	
							if(currentRateMonthlyArray[l]!="na") {				
								var currentTmp = (currentRateMonthlyArray[l]);
							    if (currentTmp == currentLowest) {
							    	r4lowestIndex = l;
							    	var r4lowestIndexString = r4lowestIndex.toString();
									var r4lowestIndexRowid = "r1"+r4lowestIndexString;
									document.getElementById(r4lowestIndexRowid).style.fontWeight = 'bold';
									document.getElementById(r4lowestIndexRowid).className += " green";
									document.getElementById(r4lowestIndexRowid).innerHTML += "(Lowest)";
							    }
							    else if (currentTmp == currentHighest) { 
							    	r4highestIndex = l;
							    	var r4highestIndexString = r4highestIndex.toString();
									var r4highestIndexRowid = "r1"+r4highestIndexString;
									document.getElementById(r4highestIndexRowid).style.fontWeight = 'bold';
									document.getElementById(r4highestIndexRowid).className += " red";
									document.getElementById(r4highestIndexRowid).innerHTML += "(Highest)";
							    }
						    }
					    }
					    if(typeof pendingRateMonthlyArray != 'undefined') { 
						    if(pendingRateMonthlyArray[l]!="na") {				
								var pendingTmp = (pendingRateMonthlyArray[l]);
							    if (pendingTmp == pendingLowest) {
							    	r4lowestIndex = l;
							    	var r4lowestIndexString = r4lowestIndex.toString();
									var r4lowestIndexRowid = "r2"+r4lowestIndexString;
									document.getElementById(r4lowestIndexRowid).style.fontWeight = 'bold';
									document.getElementById(r4lowestIndexRowid).className += " green";
									document.getElementById(r4lowestIndexRowid).innerHTML += "(Lowest)";
							    }
							    else if (pendingTmp == pendingHighest) { 
							    	r4highestIndex = l;
							    	var r4highestIndexString = r4highestIndex.toString();
									var r4highestIndexRowid = "r2"+r4highestIndexString;
									document.getElementById(r4highestIndexRowid).style.fontWeight = 'bold';
									document.getElementById(r4highestIndexRowid).className += " red";
									document.getElementById(r4highestIndexRowid).innerHTML += "(Highest)";
							    }
						    }
						 }
						 if(typeof defaultRateMonthlyArray != 'undefined') {  
						     if(defaultRateMonthlyArray[l]!="na") {				
								var defaultTmp = (defaultRateMonthlyArray[l]);
							    if (defaultTmp == pendingLowest) {
							    	r4lowestIndex = l;
							    	var r4lowestIndexString = r4lowestIndex.toString();
									var r4lowestIndexRowid = "r2"+r4lowestIndexString;
									document.getElementById(r4lowestIndexRowid).style.fontWeight = 'bold';
									document.getElementById(r4lowestIndexRowid).className += " green";
									document.getElementById(r4lowestIndexRowid).innerHTML += "(Lowest)";
							    }
							    else if (defaultTmp == pendingHighest) { 
							    	r4highestIndex = l;
							    	var r4highestIndexString = r4highestIndex.toString();
									var r4highestIndexRowid = "r2"+r4highestIndexString;
									document.getElementById(r4highestIndexRowid).style.fontWeight = 'bold';
									document.getElementById(r4highestIndexRowid).className += " red";
									document.getElementById(r4highestIndexRowid).innerHTML += "(Highest)";
							    }
						    }
						 }
					}
	        		
	        	}
      		for(var j=0;j<noDefaultRates;j++)
       		{
       			var checkBoxShowId = "rate" + (j+1) + "Checkbox";
       			if(j != noDefaultRates-1) {
       				document.getElementById(checkBoxShowId).style.display = '';
       			}	
       			var no = j+1;
       			
       			$("td:nth-child(" + no + ")").show();	        			
       			
       		}
       		var no = j+1;
      			$("td:nth-child(" + no + ")").show();  
      			
			showNotAvailableNoMatch(newJSON);
			showNotAvailableNoMatch(defaultJSON);
			$('#printSaveLink').css("display",""); 	
			
			}
       		else {  // Hide Estimated Costs, Cost - Savings Toggle Link, Estimates by Month Link, Custom Analysis Link, 
       		hideRCDetails(newJSON);
       		$('#printSaveLink').css("display",""); 	
       		}     	
			$('#printSaveLink').css("display",""); 	
        	}
        	
        	
        	
        	
        	
        	
        	// This is the default plan
        	var defaultJSON = res[0];
        	var defaultJSONString = JSON.stringify(defaultJSON);  // converting JSON onject to string to save in hidden field
        	var jsonobj = JSON.parse(defaultJSONString);  // convert string back to JSON object to retreive values
        	
        	
        	
        	
        	       	
	     		
			var referrer =  document.referrer; 
			var windowURL = document.URL;
			if((referrer.indexOf("customAnalysis.faces") !== -1) && (windowURL.indexOf("caCancel=true") == -1)) {
				$('#hoverText').css("display","");
				$('#revertButton').css("display","");
				var defaultJSON = res[0];
        		var defaultJSONString = JSON.stringify(defaultJSON);
        		document.getElementById('rcForm:defaultJSON').innerHTML = defaultJSONString;
				
				var currentRateName = document.getElementById('rcForm:currentRateName').innerHTML;
				currentRateName =  currentRateName.replace('(', '');
				currentRateName =  currentRateName.replace(')', '');
				
				if(document.getElementById('pendingRateName')!=null) {
					var pendingRateName = document.getElementById('pendingRateName').innerHTML;
					pendingRateName =  pendingRateName.replace('(', '');
					pendingRateName =  pendingRateName.replace(')', '');				
				}
				
				if(document.getElementById('rcForm:defaultRateName')!=null){
					var defaultRateName = document.getElementById('rcForm:defaultRateName').innerHTML;
					defaultRateName =  defaultRateName.replace('(', '');
					defaultRateName =  defaultRateName.replace(')', '');				
				}
				for(var i=0;i<jsonobj.noOfRates;i++) {
        			if(jsonobj[i].tariffName.replace('(', '').replace(')', '') == currentRateName) {
        				document.getElementById("currentCost").innerHTML += "<a id=\"currentCostTitle\" class=\"linksHover\" onmouseover=\"hover()\" href=\"#\" aria-describedby=\"ui-tooltip-2\"><img src=\"resources/images/icon-default-history.gif\"></a>";
        				document.getElementById('currentCostTitle').title = "Original Estimate :" + "$" + jsonobj[i].annualCost + "/yr";
        				document.getElementById("currentSavings").innerHTML += "<a id=\"currentSavingsTitle\" class=\"linksHover\" onmouseover=\"hover()\" href=\"#\" aria-describedby=\"ui-tooltip-2\"><img src=\"resources/images/icon-default-history.gif\"></a>";
        				document.getElementById('currentSavingsTitle').title = "Original Savings :" + "$" + jsonobj[i].annualSaving + "/yr";
        				continue;						     				
        			}
        			if(jsonobj[i].tariffName.replace('(', '').replace(')', '') == pendingRateName) {
        				document.getElementById("pendingCost").innerHTML += "<a id=\"pendingCostTitle\" class=\"linksHover\" onmouseover=\"hover()\" href=\"#\" aria-describedby=\"ui-tooltip-2\"><img src=\"resources/images/icon-default-history.gif\"></a>";
        				document.getElementById('pendingCostTitle').title = "Original Estimate :" + "$" + jsonobj[i].annualCost + "/yr";
        				document.getElementById("pendingSavings").innerHTML += "<a id=\"pendingSavingsTitle\" class=\"linksHover\" onmouseover=\"hover()\" href=\"#\" aria-describedby=\"ui-tooltip-2\"><img src=\"resources/images/icon-default-history.gif\"></a>";
        				if(jsonobj[i].annualSaving > 0)
	        				document.getElementById('pendingSavingsTitle').title = "Original Savings :" + "$" + jsonobj[i].annualSaving + "/yr";
						else        				
	        				document.getElementById('pendingSavingsTitle').title = "Original Increase :" + "$" + Math.abs(jsonobj[i].annualSaving) + "/yr";
	        			continue;	        				
        			}
        			if(jsonobj[i].tariffName.replace('(', '').replace(')', '') == defaultRateName) {
        				document.getElementById("defaultCost").innerHTML += "<a id=\"defaultCostTitle\" class=\"linksHover\" onmouseover=\"hover()\" href=\"#\" aria-describedby=\"ui-tooltip-2\"><img src=\"resources/images/icon-default-history.gif\"></a>";
        				document.getElementById('defaultCostTitle').title = "Original Estimate :" + "$" + jsonobj[i].annualCost + "/yr";
        				document.getElementById("defaultSavings").innerHTML += "<a id=\"defaultSavingsTitle\" class=\"linksHover\" onmouseover=\"hover()\" href=\"#\" aria-describedby=\"ui-tooltip-2\"><img src=\"resources/images/icon-default-history.gif\"></a>";
        				if(jsonobj[i].annualSaving > 0) 	        				
	        				document.getElementById('defaultSavingsTitle').title = "Original Savings :" + "$" + jsonobj[i].annualSaving + "/yr";
						else        				
	        				document.getElementById('defaultSavingsTitle').title = "Original Increase :" + "$" + Math.abs(jsonobj[i].annualSaving) + "/yr";
	        			continue;	        				
        			}
        			rateCostName = jsonobj[i].rateName+"Cost";
        			rateSavingsName = jsonobj[i].rateName+"Savings";
        			rateCostId = "optionCostTitle"+i;
        			rateSavingsId = "optionSavingsTitle"+i;
        			var j = 0;
        			document.getElementById(rateCostName).innerHTML += "<a id=\"rateCostId\" class=\"linksHover\" onmouseover=\"hover()\" href=\"#\" aria-describedby=\"ui-tooltip-2\"><img src=\"resources/images/icon-default-history.gif\"></a>";
        				$('#rateCostId').attr('id', rateCostId);
        				document.getElementById(rateCostId).title = "Original Estimate :" + "$" + jsonobj[i].annualCost + "/yr";
        				document.getElementById(rateSavingsName).innerHTML += "<a id=\"rateSavingsId\" class=\"linksHover\" onmouseover=\"hover()\" href=\"#\" aria-describedby=\"ui-tooltip-2\"><img src=\"resources/images/icon-default-history.gif\"></a>";
        				$('#rateSavingsId').attr('id', rateSavingsId);
        				if(jsonobj[i].annualSaving > 0) 	        				
	        				document.getElementById(rateSavingsId).title = "Original Savings :" + "$" + jsonobj[i].annualSaving + "/yr";
						else        				
	        				document.getElementById(rateSavingsId).title = "Original Increase :" + "$" + Math.abs(jsonobj[i].annualSaving) + "/yr";
	        		j++;		
        			
        		}
			}
			
		$('a.fancybox').click(function(){
		    		$(this).fancybox({
		    		   		fitToView: true,
		    		   		 height: 'auto',
   							   opacity: true,
							     scrolling: 'auto',
							     autoDimensions:false,
							    width: '500px',
							    centerOnScroll: true
		        	}); // fancybox
	        	});
	        	// alert("out of fbox"); 	
	   },
        failure: function() {
        	alert("fail");        	        
        }
	});
	}

});
