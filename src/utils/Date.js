export function timeDifference(current, previous) {
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