const hour = timestamp => {
    const date = new Date(timestamp*1000);
    console.log(date);
    return date.getHours() + ':' + date.getMinutes();
}

export {hour};