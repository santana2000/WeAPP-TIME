function getLocalTime(nS) {
  //将时间戳（十三位时间搓，也就是带毫秒的时间搓）转换成时间格式
  // d.cTime = 1539083829787
  var ok = Number(nS)
  let date = new Date(ok);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  date = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
  console.log(date); // 2018-10-09
  return date;
}
module.exports = {
  getLocalTime: getLocalTime
}
