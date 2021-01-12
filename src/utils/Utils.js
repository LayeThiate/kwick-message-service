import { FRENCH_DAYS, FRENCH_MONTHS } from "./Constants";

const time = timestamp => {
    const date = new Date(timestamp*1000);
    return FRENCH_DAYS[date.getDay()] + '/' + FRENCH_MONTHS[date.getMonth()] + 
            ' ' + date.getHours() + ':' + date.getMinutes();
}


export {time};