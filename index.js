const API =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2410-FTB-ET-WEB-FT/events";

let partyList = [];
async function deleteCurrentParty(id) {
  try {
    const response = await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
  displayingPartyList();
}

async function displayingPartyList() {
  const selector = document.getElementById("party-list");
  selector.innerHTML = "";
  try {
    const response = await fetch(API);
    const json = await response.json();
    partyList = json.data;
    console.log(json.data);
    partyList.map((list) => {
      const individualParty = document.createElement("div");
      individualParty.innerHTML = `<h4>Name: ${list.name}</h4>
            <p>Date: ${list.date}</p>
            <p>Location:  ${list.location} </p>
              <p>Desciption: ${list.description}</p>
              <button style="background-color: red; font-size:20px">Delete</button>
            `;
      const buttonSelector = individualParty.querySelector("button");

      buttonSelector.addEventListener("click", () =>
        deleteCurrentParty(list.id)
      );

      selector.appendChild(individualParty);
    });
  } catch (error) {
    console.log(error);
  }
}

async function sendingDatatoAPI() {
  const nameSelector = document.getElementById("name");
  const descriptionSelector = document.getElementById("description");
  const dateSelector = document.getElementById("date");
  const locationSelector = document.getElementById("location");

  let name = nameSelector.value;
  let description = descriptionSelector.value;
  let date = new Date(dateSelector.value).toISOString();
  let location = locationSelector.value;

  try {
    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        date,
        location,
      }),
    });
  } catch (error) {
    console.log(error);
  }
  displayingPartyList();
  nameSelector.value = "";
  descriptionSelector.value = "";
  dateSelector.value = "";
  locationSelector.value = "";
}
function Render() {
  displayingPartyList();
}
Render();

const submitListener = document.querySelector("button");
submitListener.addEventListener("click", sendingDatatoAPI);
