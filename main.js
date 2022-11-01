const url = 'https://635fe51f3e8f65f283be4b05.mockapi.io/users'
const trsnsacciones = 'https://635fe51f3e8f65f283be4b05.mockapi.io/users/1/transactions'

if(window.sessionStorage.getItem('user')){
    window.location.href = '/transactions.html'
}

let users = []
fetch(url)
.then(res=>res.json())
.then(data=>{
    users=data
    console.log(users)
})

u('#login-btn').on('click', function(e) {
    e.preventDefault();
    let form = u(this).parent()
    let passwd = form.find('#newpasswordid').first()
    let name = form.find('#emaildid').first()

    let matchuser = users.filter((user) => user.name === name.value && user.password == passwd.value)

    if (matchuser.length > 0) {
        window.sessionStorage.setItem('user', JSON.stringify(matchuser[0]))
        window.location.href = '/transactions.html'
    } else {
        alert(',al usuario')
    }
})