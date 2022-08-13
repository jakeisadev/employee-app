let employees = [];
let selectedIndex = 0;
let url = 'https://randomuser.me/api/?results=12&nat=us&inc=name,picture,email,location,cell,dob';
let output = '' //Variable to hold the dynamic HTML content

const openModal = (id) => {
  console.log(id);
  document.getElementById("modal").style.display = "block";
  document.getElementById("myModal-content").innerHTML = `<img src="${employees[id].picture.large}"/>`
}

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    employees = [...data.results]
    data.results.forEach((person, index) => {

      console.log(person);
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
                    <h1>${firstName + ' ' + lastName}</h1>
                    <p class="person-text">${email}</p>
                    <p class="person-text">${city}</p>
                </div>
            </div>`; 
    });

    document.getElementById("persons").innerHTML = output;
    // Event Listeners
     // Modal JS.
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


 