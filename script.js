let employees = [];
let url = 'https://randomuser.me/api/?results=12&nat=us&inc=name,picture,email,location,cell,dob';
let output = '' //Variable to hold the dynamic HTML content

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    data.results.forEach((person) => {
        
        const img = person.picture.large;
        const phone = person.cell;
        const firstName = person.name.first;
        const lastName = person.name.last;
        const email = person.email;
        const city = person.location.city;

        output += `
        <div class="persons">
            <div class="container"
                <div class="img-box">
                    <img src="${img}">
                </div>
                <div class="info-flex">
                    <h1>${firstName + ' ' + lastName}
                    <p class="person-text">${email}</p>
                    <p class="person-text">${city}</p>
                </div>
            </div>
        </div`;
    });
  });
