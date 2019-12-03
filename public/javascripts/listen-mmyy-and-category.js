const date = document.querySelector('#date')
const category = document.querySelector('#category')
category.addEventListener('change', () => {
    if (category.value !== '') {
        date.parentElement.parentElement.parentElement.submit() 
    }
})

date.addEventListener('click', () => {
    if (date.value !== '') {
        date.parentElement.parentElement.parentElement.submit() 
    } 
})