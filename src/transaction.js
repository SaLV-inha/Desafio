if (!window.sessionStorage.getItem('user')) {
    window.location.href = './index2.html'
}

const user = JSON.parse(window.sessionStorage.getItem('user'))

fetch('https://635fe51f3e8f65f283be4b05.mockapi.io/users/' + user.id + '/transactions')
.then((data) => data.json())
.then(data => {
    
    datos = ""
    u('#picture').attr("src", user.avatar)
    const nameuser = document.getElementById('nameuser')
    nameuser.innerHTML = user.name
    
    
    contenidodatos=u('fieldset#content li')
    data.forEach((item, i) => {
        const description = item.description.split(' ')
        const array = description.toString().slice(0, 30)
        const string = array.replace(/,/g, ' ')
        const date = new Date(item.createdAt).toDateString()
        
        let clon = contenidodatos.clone()
        
        clon.find('.trxcreatedAt').text(date)
        clon.find('.description').text(item.description).parent().data('t', 'd' + i)
        clon.find('.titulo').text(string)
        clon.data('bs-target', '[data-t="d' + i + '"]').data('bs-toggle', 'collapse')
        //clon.append(u('<a>').data('bs-target', '.description').data('bs-toggle', 'collapse').text('asdasd'))
        u('fieldset#content').append(clon)        
            if (item.description.includes("deposit")) {
                clon.find('.amount').text('+'+item.amount).addClass('fw-bold text-success fs-5')
                
            } 
            if (item.description.includes("pay")) {
                clon.find('.amount').text('-'+item.amount).addClass('fw-bold text-danger fs-5')
            } if (item.description.includes("invoice")) {
                clon.find('.amount').text(+item.amount).addClass('fw-bold text-secondary fs-5')
            }
            
    });
        
        const collapseElementList = document.querySelectorAll('.collapse')
        const collapseList = [...collapseElementList].map(collapseEl => {
            let c = new bootstrap.Collapse(collapseEl, {toggle: false})
        })

    })    
    
u('#btn-logout').on('click', function (e) {
    e.preventDefault();
    window.sessionStorage.removeItem("user")
    window.location.href = './index2.html'

})

