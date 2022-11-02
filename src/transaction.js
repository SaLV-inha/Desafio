if (!window.sessionStorage.getItem('user')) {
    window.location.href = './index2.html'
}

const user = JSON.parse(window.sessionStorage.getItem('user'))

fetch('https://635fe51f3e8f65f283be4b05.mockapi.io/users/' + user.id + '/transactions')
    .then((data) => data.json())
    .then(data => {

        datos = ""
        u('#picture').attr("src", user.avatar)
        const header = document.getElementById('header')
        const nameuser = document.getElementById('nameuser')
        nameuser.innerHTML = user.name
        const listadedatos = document.getElementById('listadatos')
        let i = 0
        data.forEach(item => {
            const description = item.description.split(' ')
            const array = description.toString().slice(0, 30)
            const string = array.replace(/,/g, ' ')
            i++
            if (item.description.includes("deposit")) {
                datos += `
                <br>
        <li id="block-trans" class="list-group-item d-flex justify-content-between align-items-start shadow-sm p-3 mb-5 bg-body rounded" type="button" data-bs-toggle="collapse" data-bs-target="#${description[i]}" aria-expanded="false" aria-controls="${description[i]}">
                <div  class="ms-5 me-auto">
                <div class="fw-bold">${item.createdAt}</div>
                <p type="button" data-bs-toggle="collapse" data-bs-target="#${description[i]}" aria-expanded="false" aria-controls="${description[i]}">${string}</p><div class="collapse" id="${description[i]}"><div class="card card-body">${item.description}</div></div>
                </div>
                <span id="amount" class="badge bg-success rounded-pill"> + ${item.amount}</span>
        </li>
        `
            } if (item.description.includes("pay")) {
                datos += `
                <br>
                <li id="block-trans" class="list-group-item d-flex justify-content-between align-items-start shadow-sm p-3 mb-5 bg-body rounded" type="button" data-bs-toggle="collapse" data-bs-target="#${description[i]}" aria-expanded="false" aria-controls="${description[i]}">
                        <div  class="ms-5 me-auto">
                        <div class="fw-bold">${item.createdAt}</div>
                        <p type="button" data-bs-toggle="collapse" data-bs-target="#${description[i]}" aria-expanded="false" aria-controls="${description[i]}">${string}</p><div class="collapse" id="${description[i]}"><div class="card card-body">${item.description}</div></div>
                        </div>
                        <span id="amount" class="badge bg-danger rounded-pill"> + ${item.amount}</span>
                </li>
                `
            } if (item.description.includes("invoice")) {
                datos += `
                <br>
                <li id="block-trans" class="list-group-item d-flex justify-content-between align-items-start shadow-sm p-3 mb-5 bg-body rounded" type="button" data-bs-toggle="collapse" data-bs-target="#${description[i]}" aria-expanded="false" aria-controls="${description[i]}">
                        <div  class="ms-5 me-auto">
                        <div class="fw-bold">${item.createdAt}</div>
                        <p type="button" data-bs-toggle="collapse" data-bs-target="#${description[i]}" aria-expanded="false" aria-controls="${description[i]}">${string}</p><div class="collapse" id="${description[i]}"><div class="card card-body">${item.description}</div></div>
                        </div>
                        <span id="amount" class="badge bg-secondary rounded-pill"> + ${item.amount}</span>
                </li>
                `
            }
        });
        listadedatos.innerHTML = datos

    })

u('#btn-logout').on('click', function (e) {
    e.preventDefault();
    window.sessionStorage.removeItem("user")
    window.location.href = './index2.html'

})

