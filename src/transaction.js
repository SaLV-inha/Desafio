if (!window.sessionStorage.getItem('user')) {
    window.location.href = './'
}
const user = JSON.parse(window.sessionStorage.getItem('user'))

fetch('https://635fe51f3e8f65f283be4b05.mockapi.io/users/' + user.id + '/transactions')
.then((data) => data.json())
.then(data => {
    u('#picture').attr("src", user.avatar)
    const nameuser = document.getElementById('nameuser')
    nameuser.innerHTML = `Hola,  ${user.name}`
    contenidodatos=u('fieldset#content li')

    
    let depositos = 0
    let pagos = 0
    let otros = 0

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
        clon.removeClass('d-none')
        u('fieldset#content').append(clon)        
            if (item.description.includes("deposit")) {
                clon.find('.amount').text(`+$`+item.amount).addClass('fw-bold text-success fs-5')
                depositos += parseInt(item.amount)
            } if (item.description.includes("pay")||item.description.includes("withdrawal")) {
                clon.find('.amount').text('-$'+item.amount).addClass('fw-bold text-danger fs-5')
                pagos += parseInt(item.amount)
            } if (item.description.includes("invoice")) {
                clon.find('.amount').text('$'+item.amount).addClass('fw-bold text-secondary fs-5')
                otros += parseInt(item.amount)
            }        
            
        });    
        let ingresos = depositos + otros
        let total = ingresos - pagos
        u('#movimientos').text(`Ingresos: $${depositos} `)
        u('#movimientos').append(`Egresos: $${pagos} `)
        u('#saldo').text(`$${total}`)
       
        var data = [{
            values: [ingresos, pagos],
            labels: ['Depositos', 'Pagos o Retiros'],
            type: 'pie'
          }];
          
          var layout = {
            height: 300,
            width: 400
          };
          
          Plotly.newPlot('myDiv', data, layout);
          
})    

u('#btn-logout').on('click', function (e) {
    e.preventDefault();
    window.sessionStorage.removeItem("user")
    window.location.href = './index.html'

})

