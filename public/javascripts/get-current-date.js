// 這支JS用在新增支出頁面的日期顯示，要顯示使用者當下的日期
let today = new Date()
let yy = today.getFullYear()
let mm = today.getMonth() + 1
let dd = today.getDate()
if (mm < 10) {
    mm = '0' + mm
}
if (dd < 10) {
    dd = '0' + dd
}
let shortDate = yy.toString() + '-' + mm.toString() + '-' + dd.toString()  
const addCurrentDate = document.querySelector('#addCurrentDate')
addCurrentDate.value = shortDate