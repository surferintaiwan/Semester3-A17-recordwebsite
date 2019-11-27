// 這支JS用在新增支出頁面的日期顯示，要顯示使用者當下的日期
let today = new Date()
let currentDate = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString() + '-' + today.getDate().toString()
const addCurrentDate = document.querySelector('#addCurrentDate')
addCurrentDate.value = currentDate