if(!window.sessionStorage.getItem('user')){
    window.location.href = '/index2.html'
}

const user = JSON.parse(window.sessionStorage.getItem('user'))


fetch('https://635fe51f3e8f65f283be4b05.mockapi.io/users/' + user.id +  '/transactions')
.then((data) => data.json())
.then(data =>{
    datos = ""
    const content = document.getElementById('content')
    
    data.forEach(item => {
        datos += `
        <ul>
        Usuario: ${item.userid.name}<br>
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
        if (window.sessionStorage.getItem('user')) {
            window.sessionStorage.removeItem('user')
            window.location.href = '/index2.html'
        } 
    })