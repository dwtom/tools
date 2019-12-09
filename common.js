/*
 * desc: 根据传入的时间范围获取范围内所有年月
 * @param {String}[start] 起始时间('2019-01')
 * @param {String}[end] 结束时间('2019-10')
 * @return {Array}[result] 时间范围数组
 * 
 */
function getYearAndMonth(start, end) {
    let result = [];
    let starts = start.split('-');
    let ends = end.split('-');
    let staYear = parseInt(starts[0]);
    let staMon = parseInt(starts[1]);
    let endYear = parseInt(ends[0]);
    let endMon = parseInt(ends[1]);
    let sMon;
    while (staYear <= endYear) {
        if (staYear === endYear) {
            if(staMon === endMon){
                return [start];
            }
            while (staMon <= endMon) {
                sMon = staMon;
                if(sMon< 10){
                    sMon = '0'+sMon;
                }
                result.push(`${staYear}-${sMon}`);
                staMon++;
            }
            staYear++;
        } else {
            if (staMon > 12) {
                staMon = 1;
                staYear++;
            }
            sMon = staMon;
            if(sMon< 10){
                sMon = '0'+sMon;
            }
            result.push(`${staYear}-${sMon}`);
            staMon++;
        }
    }
    return result;
}
