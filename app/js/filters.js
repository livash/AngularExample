squidApp.filter('momentFormatDate', () => {
   return ( dateString => moment(dateString, 'YYYYMMDD').fromNow() );
});

squidApp.filter('customFormatDate', () => {
    return (dateString) => {
        let now = new Date(),
            then = new Date(dateString),
            oneDay = 1000 * 60 * 60 * 24,
            delta = now - then,
            numDays = Math.floor(delta / oneDay);

        if (numDays === 0 || numDays > 1) {
            return numDays + ' days ago';
        } else if (numDays === 1) {
            return '1 day ago';
        } else if (numDays === -1) {
            return '1 day from now';
        } else {
            numDays *= (-1);
            return numDays + ' days from now';
        }
    };
});
