import dayjs from 'dayjs';

export function getTimeMs(timestampMs){
    const timestampMsdayjs = dayjs(timestampMs);
    const Now = dayjs();
    return{
        seconds:getsec(Now,timestampMsdayjs),
        minutes:getmin(Now,timestampMsdayjs),
        hours:gethour(Now,timestampMsdayjs)
    };
}

function getsec(nowdayjs, timedayjs){
    const seconds = timedayjs.diff(nowdayjs, 'seconds');
    return seconds%60;

}

function getmin(nowdayjs, timedayjs){
    const minutes = timedayjs.diff(nowdayjs, 'minutes');
    return minutes%60;
}

function gethour(nowdayjs, timedayjs){
    const hours = timedayjs.diff(nowdayjs, 'hours');
    return hours%24;
}

