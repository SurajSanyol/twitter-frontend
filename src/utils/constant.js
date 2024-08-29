

export const USER_API_END_POINT = "http://localhost:8000/api/v1/user";
export const TWEET_API_END_POINT = "http://localhost:8000/api/v1/tweet";

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

    // Return the date in IST format
    return "on " + system_date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
}

var K = function () {
    var a = navigator.userAgent;
    return {
        ie: a.match(/MSIE\s([^;]*)/)
    }
}();
