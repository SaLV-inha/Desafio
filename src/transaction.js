if(!window.sessionStorage.getItem('user')){
    window.location.href = './index2.html'
}

const user = JSON.parse(window.sessionStorage.getItem('user'))

fetch('https://635fe51f3e8f65f283be4b05.mockapi.io/users/' + user.id +  '/transactions')
.then((data) => data.json())
.then(data =>{

    datos = ""
    u('#picture').attr("src", user.avatar)
    const content = document.getElementById('content')
    const nameuser = document.getElementById('nameuser')
    nameuser.innerHTML = user.name
    data.forEach(item => {
        
        datos += `
        <ul class="transactions">
        Fecha Transaccion: ${item.createdAt}<br>
        Description: ${item.description}<br>
        Cantidad:  ${item.amount}<br>
        
        </ul>
        
        `
        content.innerHTML = datos
    });
    
})
   
u('#btn-logout').on('click', function(e) {
    e.preventDefault();
    window.sessionStorage.removeItem("user")
    window.location.href ='./index2.html'
   
})

