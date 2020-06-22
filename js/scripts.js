const userSection = document.querySelector('.userSection');
const searchField = document.querySelector('#searchField');
const modalSection = document.querySelector('.modal');
const modalContent = document.querySelector('.modalContent');
const url = 'https://randomuser.me/api/?results=12&inc=name,location,email,dob,phone,picture&nat=US'
let userData = [];
let cards = []

// start fetch api
fetch(url)
    .then(response => response.json())
    .then(data => data.results)
    .then(insertData)


function insertData(data) {
    userData = data;

    userData.forEach((user, index) => {
        // create user card
        const userCard = document.createElement('DIV');
        // append the userCard to the userSection
        userSection.appendChild(userCard)
        // insert the userCard html
        userCard.innerHTML = `
            <div class="empPicture">
                <img src="${user.picture.large}" alt="${user.name.last}">
            </div>
            <div class="empInfo" index="${index}">
            <h3 class="name">${user.name.first + " " + user.name.last}</h3>
            <p class="mail">${user.email}</p>
            <p class="city">${user.location.city}</p>
        </div>
        `
        // add a class name to the userCard
        userCard.classList.add('empCard');
        // push the index into the cards array
        cards.push(index); 
    })
}

/* 
    Event listener for the search field
*/

searchField.addEventListener('keyup', event => {
    let names = document.querySelectorAll('.name');
    let cards = document.querySelectorAll('.empCard');
    // transform the search input to uppercase
    let filter = event.target.value.toUpperCase();

    for (var i = 0; i < names.length; i++) {
        let name = names[i].textContent.toUpperCase();

        if (name.indexOf(filter) > -1) {
            // if the input matches the letter -> display the userCard
            cards[i].style.display = '';
        } else {
            // if the input doesn't matches the letter -> hide the userCard
            cards[i].style.display = 'none';
        }
    }
});

/* 
    Create the modal window
*/

employeeCard = document.querySelectorAll('.empCard');

function showModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = userData[index];
    let dobDate = new Date(dob.date);

    // create the modal html
    const modalHtml = `
        <p class="arrowLeft">&#8249;</p>
        <p class="arrowRight">&#8250;</p>
        <div class="upper-section" index="${index}">
            <img src="${picture.large}" class="modalImg">
            <h3 class="modalName">${name.first} ${name.last}</h3>
            <p class="modalMail">${email}</p>
            <p class="modalCity">${city}</p>
        </div>
        <div class="lower-section">
            <p class="modalPhone">${phone}</p>
            <p class="modalAdress">${street.number} ${street.name}, ${state} ${postcode}</p>
            <p class="modalDob">Birthday: ${dobDate.getMonth() + 1}/${dobDate.getDate()}/${dobDate.getFullYear()}</p>
        </div>
    `
    // insert the modal html into the modalContent
    modalContent.innerHTML = modalHtml;
    modalSection.style.display = 'block';
    // save the index (string) into indexString
    let indexString = index;
    // parse the indexString into a number
    indexInt = parseInt(indexString);

    modalSection.addEventListener('click', event => {
        const arrowLeft = document.querySelector('.arrowLeft');
        const arrowRight = document.querySelector('.arrowRight'); 

        if (event.target === arrowLeft) {
            // if the user hits the arrow left
            if (indexInt > 0) {
                indexInt = indexInt - 1
                // show the user with the index saved in indexInt
                showModal(indexInt);
            }
        } 
        
        if (event.target === arrowRight) {
            // if the user hits the right arrow
            if (indexInt < 11) {
                indexInt += 1
                // show the user with the index saved in indexInt
                showModal(indexInt);
            }
        }
    })

}

/* 
    Event listener for the modal window
*/

userSection.addEventListener('click', event => {
    const card = event.target.closest('.empCard');
    if (event.target = card) {
        let employeeIndex = card.querySelector('.empInfo').getAttribute('index');
        showModal(employeeIndex);
    }
})

const closeButton = document.querySelector('.modalClose');

/* 
    Event listener for the close button
*/

closeButton.addEventListener('click', () => {
    modalSection.style.display = 'none'
});

