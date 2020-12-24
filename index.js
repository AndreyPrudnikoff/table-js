"use strict "
let tbody = document.querySelector('tbody');
let head = document.querySelector('thead tr');
let people = [];

const getPeople = async function () {
    await fetch('./mock-data.json')
        .then(response => response.json())
        .then(data => people = data);
}

const tableMaker = async () => {
    tbody.innerHTML = '';
    people.length === 0 ? await getPeople() : false;
    people.forEach(user => {
        let tr = document.createElement('tr');
        for (let userKey in user) {
            if (user.hasOwnProperty(userKey)) {
                let td = document.createElement('td');
                td.innerText = user[userKey];
                tr.append(td);
            }
        }
        tbody.append(tr);
    })
}
tableMaker();

const sort = (array, key) => {
    array.sort((a, b) => {
        let k = typeof parseInt(key) === "number" ? parseInt(key) : key.toLowerCase();
        return a[k] > b[k] ? 1 : -1;
    })
}

head.addEventListener('click', (e) => {
    let key = e.target.textContent;
    sort(people, key);
    tableMaker();
})

