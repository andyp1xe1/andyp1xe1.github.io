// script.js
function verse(loc, tr) {
    if ( loc == null || loc == "" ) return
    
    verse = document.getElementById('verse');
    url = "https://bible-api.com/" + loc + "?&translation=" + tr + "&verse_numbers=true";
    
    fetch( url )
        .then( (j) => j.json() )
        .then( (j) => {
            if ( j.text == null ) return
            verse.innerHTML = j.text
                .replace( /ţ/g, 'ț' )
                .replace( /ş/g, 'ș' )
        });
}

const light_color_body = "#282828"
const light_bg_body    = "#f5f5f5"
const light_bg_base    = "#ffffff"
const light_gray       = "gray"

function lightMode() {
    body.style.setProperty('--color-body', light_color_body)
    body.style.setProperty('--bg-body', light_bg_body)
    body.style.setProperty('--bg-base', light_bg_base)
    body.style.setProperty('--gray', light_gray)
}

const dark_color_body = "#f5f5f5"
const dark_bg_body    = "#404258"
const dark_bg_base    = "#474e68"
const dark_gray       = "#d5c7d8"

function darkMode() {
    body.style.setProperty('--color-body', dark_color_body)
    body.style.setProperty('--bg-body', dark_bg_body)
    body.style.setProperty('--bg-base', dark_bg_base)
    body.style.setProperty('--gray', dark_gray)
}

function lampSwitch() {
    if ( lamp.value === "on" ) {
        lightMode()
        lamp.value = "off"
        return
    }
    darkMode()
    lamp.value = "on"
}

function genTab() {
    results = document.getElementById('results');
    tbody = results.tBodies[0];
    tbody.deleteRow(0);
    quote_list.forEach( (v, i) => {
        row = tbody.insertRow(0);
        th = document.createElement('th');
        cel_a = row.appendChild(th);
        cel_b = row.insertCell(1);
        cel_c = row.insertCell(2);
        
        cel_a.innerHTML = `${quote_list.length - i}) `;
        cel_b.innerHTML = v;
        cel_c.innerHTML = `
            <a href="./">
               magnet 🧲
            </a>`;
    });

    thead = results.createTHead();
    thead.classList.add('font-mono');
    thead.innerHTML = `
        <th>Nr.</th>
        <th>Name</th>
        <th>URI</th>`;
}

function ajustBarLeangth() {
    if ( query.size < query.placeholder.length ) query.size = query.placeholder.length;
}

function placeQuote() {
    var quote_list= [   'May the Force be with you.',
                        //'There\'s no place like home.',
                        'Carpe diem.',
                        'Seize the day, boys.',
                        //'Make your lives extraordinary.',
                        'To infinity and beyond!',
                        'Elementary, my dear Watson.',
                        'It\'s alive! It\'s alive!',
                        //'life is like a box of chocolates.',
                        'I\'ll be back.',
                        'Houston, we have a problem.',
                        'Bond. James Bond.',
                        'You talking to me?',
                        'Roads?',
                        'My house, my rules, my coffe.'
                    ];

    quote = quote_list[Math.floor(Math.random() * quote_list.length)];
    query.placeholder = quote;
}

body = document.body;
query = document.getElementsByName('q')[0];
lamp = document.getElementsByName('lamp')[0];


params = new URLSearchParams(document.location.search);
q_param = params.get('q');

query.value = q_param;

if ( params.get('lamp') === 'on' ) lampSwitch();
