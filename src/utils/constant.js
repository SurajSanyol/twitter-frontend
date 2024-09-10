

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
    var oneMonth = 2592000; // Seconds in a month (30 days)

    if (diff < 30) return "just now";
    if (diff < 60) return "less than a minute ago";
    if (diff < 3600) return Math.floor(diff / 60) + " minutes ago";
    if (diff < 7200) return "1 hour ago";
    if (diff < 86400) return Math.floor(diff / 3600) + " hours ago";
    if (diff < 172800) return "1 day ago";
    if (diff < 604800) return Math.floor(diff / 86400) + " days ago";
    if (diff < 1209600) return "1 week ago";
    if (diff < oneMonth) return Math.floor(diff / 604800) + " weeks ago";
    if (diff < oneYear) {
        var months = Math.floor(diff / oneMonth);
        return months === 1 ? "1 month ago" : months + " months ago";
    }
    var years = Math.floor(diff / oneYear);
    return years === 1 ? "1 year ago" : years + " years ago";
}

// To check if IE is used
var K = function () {
    var a = navigator.userAgent;
    return {
        ie: a.match(/MSIE\s([^;]*)/)
    }
}();

