let employees = [];
const employeeSearch = document.getElementById('search');
let selectedIndex = 0;
let url = 'https://randomuser.me/api/?results=12&nat=us&inc=name,picture,email,location,cell,dob';
let output = '' //Variable to hold the dynamic HTML content

const states = [
  { name: 'alabama', abbr: 'AL'},
  { name: 'alaska', abbr: 'AK'},
  { name: 'american samoa', abbr: 'AS'},
  { name: 'arizona', abbr: 'AZ'},
  { name: 'arkansas', abbr: 'AR'},
  { name: 'california', abbr: 'CA'},
  { name: 'colorado', abbr: 'CO'},
  { name: 'connecticut', abbr: 'CT'},
  { name: 'delaware', abbr: 'DE'},
  { name: 'district of columbia', abbr: 'DC'},
  { name: 'florida', abbr: 'FL'},
  { name: 'georgia', abbr: 'GA'},
  { name: 'guam', abbr: 'GU'},
  { name: 'hawaii', abbr: 'HI'},
  { name: 'idaho', abbr: 'ID'},
  { name: 'illinois', abbr: 'IL'},
  { name: 'indiana', abbr: 'IN'},
  { name: 'iowa', abbr: 'IA'},
  { name: 'kansas', abbr: 'KS'},
  { name: 'kentucky', abbr: 'KY'},
  { name: 'louisiana', abbr: 'LA'},
  { name: 'maine', abbr: 'ME'},
  { name: 'marshall islands', abbr: 'MH'},
  { name: 'maryland', abbr: 'MD'},
  { name: 'massachusetts', abbr: 'MA'},
  { name: 'michigan', abbr: 'MI'},
  { name: 'minnesota', abbr: 'MN'},
  { name: 'mississippi', abbr: 'MS'},
  { name: 'missouri', abbr: 'MO'},
  { name: 'montana', abbr: 'MT'},
  { name: 'nebraska', abbr: 'NE'},
  { name: 'nevada', abbr: 'NV'},
  { name: 'new hampshire', abbr: 'NH'},
  { name: 'new jersey', abbr: 'NJ'},
  { name: 'new mexico', abbr: 'NM'},
  { name: 'new york', abbr: 'NY'},
  { name: 'north carolina', abbr: 'NC'},
  { name: 'north dakota', abbr: 'ND'},
  { name: 'northern mariana islands', abbr: 'NP'},
  { name: 'ohio', abbr: 'OH'},
  { name: 'oklahoma', abbr: 'OK'},
  { name: 'oregon', abbr: 'OR'},
  { name: 'pennsylvania', abbr: 'PA'},
  { name: 'puerto rico', abbr: 'PR'},
  { name: 'rhode island', abbr: 'RI'},
  { name: 'south carolina', abbr: 'SC'},
  { name: 'south dakota', abbr: 'SD'},
  { name: 'tennessee', abbr: 'TN'},
  { name: 'texas', abbr: 'TX'},
  { name: 'us virgin islands', abbr: 'VI'},
  { name: 'utah', abbr: 'UT'},
  { name: 'vermont', abbr: 'VT'},
  { name: 'virginia', abbr: 'VA'},
  { name: 'washington', abbr: 'WA'},
  { name: 'west virginia', abbr: 'WV'},
  { name: 'wisconsin', abbr: 'WI'},
  { name: 'wyoming', abbr: 'WY'}
];

const openModal = (id) => {

  let dob = employees[id].dob.date;
  let birthday = convertBDay(dob);

  document.getElementById("modal").style.display = "block";

  document.getElementById("myModal-content").innerHTML = `
    <img src="${employees[id].picture.large}" class="employee-img"/>
    <h1>${employees[id].name.first + ' ' + employees[id].name.last}</h1>
    <p class="email">${employees[id].email}</p>
    <p class="city">${employees[id].location.city}</p>
    <hr>
    <p class="number">${employees[id].cell}</p>
    <p class="address">${employees[id].location.street.number + ' ' + 
    employees[id].location.street.name + ', ' + employees[id].location.state}
    ${' ' + employees[id].location.postcode}</p>
    <p class="birthday">Birthday: ${birthday}</p>
    <div class="arrows">
      <img src="arrow-left.png" alt="left arrow" class="arrow-left">
      <img src="arrow-right.png" alt="right arrow" class="arrow-right">
    </div>`
}

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    employees = [...data.results]
    data.results.forEach((person, index) => {

      console.log(person);
        const employeeFullName = `${person.name.first} ${person.name.last}`;
        const img = person.picture.large;
        const phone = person.cell;
        const firstName = person.name.first;
        const lastName = person.name.last;
        const email = person.email;
        const city = person.location.city;

        output += `
            <div class="grid-item" onclick="openModal(${index})" id="person-${index}">
                    <img src="${img}" class="circle">
                <div class="info-text">
                    <h1>${employeeFullName}</h1>
                    <p class="person-text">${email}</p>
                    <p class="person-text">${city}</p>
                </div>
            </div>`;
            
        //Event listener for employee search
        employeeSearch.addEventListener('keyup', () => {
         if (employeeFullName.toUpperCase().includes(employeeSearch.value.toUpperCase())) {
             document.getElementById(`person-${index}`).style.display = '';
         }
         else {
             document.getElementById(`person-${index}`).style.display = 'none';
         }
      });

  });

    document.getElementById("persons").innerHTML = output;
    
    // Event Listeners

    //Close Modal
    document.getElementById('close-btn').addEventListener('click', function(e){
      console.log('Cross Pressed');
      document.getElementById('modal').style.display = "none";

  })

    // Hiding Modal if clicked outside.
    window.onclick = function(e){
      let modal = document.getElementById('modal')
      //If clicked on the overlay, then do this.
      if(e.target == modal){
        modal.style.display = "none"
      }
    }

});

  // Converts dob to dd/mm/yy format
  function convertBDay(dob) {
    let year = dob.slice(0,4);
    let month = dob.slice(5,7);
    let day = dob.slice(8,10);
    let converted = month + '/' + day + '/' + year;
    return converted;
  }