const allRecords = document.querySelector('#allRecords')
const deleteName = document.querySelector('#deleteName')
const formForDelete = document.querySelector('#formForDelete')


allRecords.addEventListener('click', function() {
    let name = ''
    let id = ''
    if (event.target.dataset.target === '#deleteModal') {
        console.log(event.target)
        name = event.target.dataset.name
        id = event.target.dataset.id
        deleteName.textContent = name
        formForDelete.action = "/record/" + id + "/delete?_method=DELETE"
        console.log
        console.log(formForDelete)   
    }
})