let employees = [];
const employeeSearch = document.getElementById('search');
let url = 'https://randomuser.me/api/?results=12&nat=us&inc=name,picture,email,location,cell,dob';
let output = '' //Variable to hold the dynamic HTML content
let selectedIndex = 0;

const openModal = (id) => {
  selectedIndex = id;
 console.log(id);
  let dob = employees[id].dob.date;
  let birthday = convertBDay(dob);
  console.log(employees[id].dob.date);
  console.log(dob);

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
    `;

  }

  let arrowLeft = document.getElementById('left');
  let arrowRight = document.getElementById('right');

  arrowLeft.addEventListener('click', () => {
    console.log(selectedIndex);
    if(selectedIndex === 0) {
      alert('No going back')
    } else {
      selectedIndex--;
      updateContentOnArrows(selectedIndex);
    }
  })

  arrowRight.addEventListener('click', () => {
    console.log(selectedIndex);
    if(selectedIndex === 11) {
      alert('No going further')
    } else {
      selectedIndex++;
      updateContentOnArrows(selectedIndex);
    }
  })


  const updateContentOnArrows = (id) => {
    let dob = employees[id].dob.date;
    let birthday = convertBDay(dob);

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
    `;
  }


fetch(url)
  .then((res) => res.json())
  .then((data) => {
    employees = [...data.results]
    data.results.forEach((person, index) => {

        let employeeFullName = `${person.name.first} ${person.name.last}`;
        let img = person.picture.large;
        let phone = person.cell;
        let firstName = person.name.first;
        let lastName = person.name.last;
        let email = person.email;
        let city = person.location.city;

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

    //Hiding Modal if clicked outside.
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