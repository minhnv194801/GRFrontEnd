function timeDifference(current, previous) {
    var sPerMinute = 60;
    var sPerHour = sPerMinute * 60;
    var sPerDay = sPerHour * 24;
    var sPerMonth = sPerDay * 30;
    var sPerYear = sPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < sPerMinute) {
         return Math.round(elapsed/1000) + ' giây trước';   
    }

    else if (elapsed < sPerHour) {
         return Math.round(elapsed/sPerMinute) + ' phút trước';   
    }

    else if (elapsed < sPerDay ) {
         return Math.round(elapsed/sPerHour ) + ' giờ trước';   
    }

    else if (elapsed < sPerMonth) {
        return Math.round(elapsed/sPerDay) + ' ngày trước';   
    }

    else if (elapsed < sPerYear) {
        return Math.round(elapsed/sPerMonth) + ' tháng trước';   
    }

    else {
        return Math.round(elapsed/sPerYear ) + ' năm trước';   
    }
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = hour + ':' + min + ' ' + date + '/' + month + '/' + year;
    return time;
}

export { timeDifference, timeConverter }