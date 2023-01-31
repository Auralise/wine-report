export const getDateObject = (timestamp, { twelveHourFormat = false, shortMonthName = false, }) => {

    // create month object
    const months = {
        0: shortMonthName === 'short' ? 'Jan' : 'January',
        1: shortMonthName === 'short' ? 'Feb' : 'February',
        2: shortMonthName === 'short' ? 'Mar' : 'March',
        3: shortMonthName === 'short' ? 'Apr' : 'April',
        4: shortMonthName === 'short' ? 'May' : 'May',
        5: shortMonthName === 'short' ? 'Jun' : 'June',
        6: shortMonthName === 'short' ? 'Jul' : 'July',
        7: shortMonthName === 'short' ? 'Aug' : 'August',
        8: shortMonthName === 'short' ? 'Sep' : 'September',
        9: shortMonthName === 'short' ? 'Oct' : 'October',
        10: shortMonthName === 'short' ? 'Nov' : 'November',
        11: shortMonthName === 'short' ? 'Dec' : 'December',
    };

    const dateObj = new Date(timestamp);
    const dateContainer = {};

    dateContainer.year = dateObj.getFullYear();
    dateContainer.monthName = months[dateObj.getMonth()];
    dateContainer.month = dateObj.getMonth() + 1;
    dateContainer.day = dateObj.getDate();

    if (twelveHourFormat) {
        if (dateObj.getHours() > 12) {
            dateContainer.hours = Math.floor(dateObj.getHours() - 12);
            dateContainer.period = "pm";
        } else {
            dateContainer.hours = dateObj.getHours();
            dateContainer.period = "am";
        }

        if (dateContainer.hour === 0) {
            dateContainer.hour = 12;
        }
    } else {
        dateContainer.hour = dateObj.getHours();
    }

    dateContainer.minute = (dateObj.getMinutes() < 10 ? "0" : "") + dateObj.getMinutes();

    // Add formatted versions of the time
    if (twelveHourFormat) {
        dateContainer.formatted = {
            words: `${date.day}/${date.month}/${date.year}  ${date.hour}:${date.minute}${date.period}`,
            text: `${date.day} ${date.monthName} ${date.year}  ${date.hour}:${date.minute}${date.period}`,
        }
    } else {
        dateContainer.formatted = {
            words: `${date.day}/${date.month}/${date.year}  ${date.hour}:${date.minute}`,
            text: `${date.day}/${date.month}/${date.year}  ${date.hour}:${date.minute}`,
        }
    }

    return dateContainer;

}



