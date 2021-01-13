import {FRENCH_DAYS, FRENCH_MONTHS} from "./Constants";

const time = timestamp => {
    const date = new Date(timestamp * 1000);
    const dateDay = date.getDate();
    const day = dateDay === 1 ? "1er" : dateDay
    return FRENCH_DAYS[date.getDay()] + ' ' + day + ' ' + FRENCH_MONTHS[date.getMonth()] +
        ' ' + date.getHours() + ':' + date.getMinutes();
}


export {time};