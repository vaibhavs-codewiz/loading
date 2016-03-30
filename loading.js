(function (){ 
    
    // get elements from page
    var progressBarElement = document.getElementById("progressBar");
    var percentageValueElement = document.getElementById("percentageValue");
    var currentTimeValueElement = document.getElementById("currentTimeValue");
    var secondsValueElement = document.getElementById("secondsValue");
    var minutesValueElement = document.getElementById("minutesValue");
    var hoursValueElement = document.getElementById("hoursValue");
    var daysValueElement = document.getElementById("daysValue");
    // percentage precision
    var maxP = 1000; 
    
    // calculate time left of current year
    function calculateValue(a) {
        
        var now = getDate();
        var year = now.getFullYear();
        var nowM = now.getTime();
        var firstDayM = getDate(year, true).getTime();
        var lastDayM = getDate(year).getTime();
        var totalInYear = lastDayM - firstDayM;
        var passedInYear = nowM - firstDayM;
        var leftInYear = lastDayM - nowM;
        var valueP = passedInYear * maxP / totalInYear;
        var valuePRounded = (Math.floor(valueP * 10)) / 100;
        var seconds = Math.floor(leftInYear/1000);
        var minutes = Math.floor(leftInYear/1000/60);
        var hours = Math.floor(leftInYear/1000/60/60);
        var days = Math.floor(leftInYear/1000/60/60/24);
        
        switch (a) {
            case "now": return now
                break;
            case "valueP": return valueP
                break;
            case "valuePRounded": return valuePRounded
                break;
            case "seconds": return seconds
                break;
            case "minutes": return minutes
                break;
            case "hours": return hours
                break;
            case "days": return days
                break;
            case "weeks": return weeks
                break;
            case "months": return months
                break;
            default: return "default";
        }
    }
    
    function getDate(yearValue, firstDayValue) {        
        
        if (yearValue) {
            
            if (firstDayValue) {
                          
                return new Date(yearValue, 0, 1, 0, 0, 0, 0);
                
            } else {
                
                return new Date(yearValue, 11, 31, 23, 59, 59, 99);
            }
            
        } else {
            
            return new Date();
            
        }
        
    }
    
    function setValues() {
        
        var valueP = calculateValue("valueP");
        var valuePRounded = calculateValue("valuePRounded");
        
        progressBarElement.setAttribute("max", maxP);
        progressBarElement.setAttribute("value", valueP);
        progressBarElement.innerHTML = valueP;
        currentTimeValueElement.innerHTML = calculateValue("now");
        percentageValueElement.innerHTML = valuePRounded + " %";
        secondsValueElement.innerHTML = calculateValue("seconds");
        minutesValueElement.innerHTML = calculateValue("minutes");
        hoursValueElement.innerHTML = calculateValue("hours");
        daysValueElement.innerHTML = calculateValue("days");
        
    }
    
    setValues();
    
    var intervalID = window.setInterval(setValues, 1000);    
    
})();