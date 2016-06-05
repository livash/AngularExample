'use strict';

squidApp.filter('momentFormatDate', function () {
   return function (dateString) {
       return moment(dateString, 'YYYYMMDD').fromNow();
   };
});

squidApp.filter('customFormatDate', function () {
    return function (dateString) {
        var now = new Date(),
            then = new Date(dateString),
            oneDay = 1000 * 60 * 60 * 24,
            delta = now - then,
            numDays = Math.floor(delta / oneDay);

        if (numDays === 0 || numDays > 1) {
            return numDays + ' days ago';
        } else if (numDays === 1) {
            return '1 day ago';
        } else {
            numDays *= (-1);
            return numDays + ' from now';
        }
    };
});
