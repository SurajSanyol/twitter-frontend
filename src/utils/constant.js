

export const USER_API_END_POINT = "https://twitter-backend-gw7n.onrender.com/api/v1/user";
export const TWEET_API_END_POINT = "https://twitter-backend-gw7n.onrender.com/api/v1/tweet";



export const parseTwitterDate = (tdate) => {
    // Parse the given date
    var system_date = new Date(Date.parse(tdate));

    // Adjust for Indian Standard Time (IST) UTC+5:30
    var istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    system_date = new Date(system_date.getTime() + istOffset);

    var user_date = new Date();

    // If running on Internet Explorer, adjust the date parsing
    if (K.ie) {
        system_date = Date.parse(tdate.replace(/( \+)/, ' UTC$1'));
        system_date = new Date(system_date.getTime() + istOffset);
    }

    var diff = Math.floor((user_date - system_date) / 1000);
    var oneYear = 31536000; // Seconds in one year
    var oneMonth = 2628000; // Approximate seconds in a month

    if (diff <= 1) {
        return "just now";
    }
    if (diff < 20) {
        return diff + " seconds ago";
    }
    if (diff < 40) {
        return "half a minute ago";
    }
    if (diff < 60) {
        return "less than a minute ago";
    }
    if (diff <= 90) {
        return "one minute ago";
    }
    if (diff <= 3540) {
        return Math.round(diff / 60) + " minutes ago";
    }
    if (diff <= 5400) {
        return "1 hour ago";
    }
    if (diff <= 86400) {
        return Math.round(diff / 3600) + " hours ago";
    }
    if (diff <= 129600) {
        return "1 day ago";
    }
    if (diff < 604800) {
        return Math.round(diff / 86400) + " days ago";
    }
    if (diff <= 777600) {
        return "1 week ago";
    }
    
    // If the difference is less than a year, calculate in months
    if (diff <= oneYear) {
        var monthsDiff = Math.floor(diff / oneMonth);
        if (monthsDiff === 1) {
            return "1 month ago";
        }
        return monthsDiff + " months ago";
    }
    
    // If more than a year has passed, return in years
    var yearsDiff = Math.floor(diff / oneYear);
    if (yearsDiff === 1) {
        return "1 year ago";
    }
    return yearsDiff + " years ago";
}

// To check if IE is used
var K = function () {
    var a = navigator.userAgent;
    return {
        ie: a.match(/MSIE\s([^;]*)/)
    }
}();

