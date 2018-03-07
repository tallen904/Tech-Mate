$(document).ready(function(){
    $('select').material_select();
})
const name = $('#name')
const email = $('#email')
const summary = $('#summary')
const githubUrl = $('#url')
const phone = $('#phone')
var html = $('#html')
var css = $('#css')
var javascript = $('#javascript')
var nodejs = $('#nodejs')
var reactjs = $('#reactjs')



$('#employeeForm').on('submit', postHandler)


function postHandler(event){
    event.preventDefault()

    if(!name.val().trim() || !email.val().trim() || !summary.val().trim() || !githubUrl.val().trim() || !phone.val().trim() || !html.val() || !css.val() || !javascript.val() || !nodejs.val() || !reactjs.val()){
        return
    }

    var newEmployee = {
        name: name.val().trim(),
        email: email.val().trim(),
        summary: summary.val().trim(),
        githubUrl: githubUrl.val().trim(),
        phone: parseInt(phone.val().trim()),
        EmployeeSkill: {
            html: parseInt(html.val()),
            css: parseInt(css.val()),
            javascript: parseInt(javascript.val()),
            nodejs: parseInt(nodejs.val()),
            reactjs: parseInt(reactjs.val())
        }
    }
    submitEmployee(newEmployee)
}

function submitEmployee(employee){
    $.post('/api/employees', employee, function(){
        console.log('Successfully created a new employee!')
    })
}