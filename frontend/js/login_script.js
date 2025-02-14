//Selecting all the elements

const phoneNumElem = document.getElementById("mobNumber");
const passwordElem = document.getElementById("password");

//! Include mail address in the logic of the code
const mailElement = document.getElementById("emailAddress");
const loginBtn = document.getElementById("logInBtn");

//check if guard is registered or not
async function isGuardRegistered(phoneNum) {
  try {
    //! Put url of backend here
    const response = await fetch(`/users?phoneNum=${phoneNum}`);

    const data = await response.json();

    if (Object.keys(data).length) {
      return true;
    } else return false;
  } catch (error) {
    console.log(error);
  }
}

//Does the login (or rejects if not registered)
loginBtn.addEventListener("click", (e) => {

  e.preventDefault()
  //Checks if the input field is empty
  if (!phoneNumElem.value.trim()) {
    return;
  }

  //result is the promise reference- it receives a response from the server side
  const result = isGuardRegistered(phoneNumElem.value);

  result.then((guardRegister) => {
    if (!guardRegister) {
      alert("Kindly register yourself!");
    } else {
      //if registered then takes the token (phoneNum) and saves in the local storage
      localStorage.setItem("token", phoneNumElem.value);

      //! Add guard dashboard link
      window.location.href = "guard_dashboard.html";
    }
  });
});
let arr; //this is the array of strings

const timeDelay = 120;
const factor = 5;

const txtArea = document.querySelector(".typed-text");

function deleteLetters(value) {
  let index = value.length;

  const endId = setInterval(() => {
    let newTxt = value.substr(0, index);
    index--;

    txtArea.innerHTML = newTxt;

    if (index == -1) {
      clearInterval(endId);

      randomIdgenerator();
    }
  }, timeDelay);
}

function addLetters(i) {
  const value = arr[i];
  console.log(arr);
  if (arr.length == 0) {
    console.log("END");

    setTimeout(newLetters, timeDelay * factor);

    return;
  }

  arr.splice(i, 1);

  let index = 0;

  const startId = setInterval(() => {
    let newTxt = value.substr(0, index + 1);
    index++;

    txtArea.innerHTML = newTxt;

    if (index == value.length) {
      clearInterval(startId);

      setTimeout(() => {
        deleteLetters(value);
      }, timeDelay * factor);
    }
  }, timeDelay);
}

function randomIdgenerator() {
  const i = Math.floor(Math.random() * arr.length);

  setTimeout(() => {
    addLetters(i);
  }, timeDelay * factor);
}

async function newLetters() {
  let randomTextCollection = await fetch("extraTxt.txt");

  randomTextCollection = await randomTextCollection.text();

  arr = await randomTextCollection.split("\n");

  randomIdgenerator();
}

newLetters();
