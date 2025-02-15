// Selecting all elements
const phoneNumElem = document.getElementById("mobNumber");
const passwordElem = document.getElementById("password");
const mailElement = document.getElementById("emailAddress");
const loginBtn = document.getElementById("logInBtn");

// Check if guard is registered
async function isGuardRegistered(phoneNum) {
  try {
    const response = await fetch(`http://localhost:8000/users?phoneNum=${phoneNum}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.length > 0;
  } catch (error) {
    console.error("Error checking registration:", error);
    return false;
  }
}

// Login event
loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  if (!phoneNumElem.value.trim()) {
    return;
  }

  const guardRegister = await isGuardRegistered(phoneNumElem.value);

  if (!guardRegister) {
    Swal.fire({
      title: "Not registered!",
      text: "Make sure to register yourself before proceeding",
      icon: "warning",
      confirmButtonText: "Register"
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "registeration.html";
      }
    });
  } else {
    localStorage.setItem("token", phoneNumElem.value);
    window.location.href = "../html/guard_dashBoard_new.html";
  }
});

let arr = [];
const timeDelay = 120;
const factor = 5;
const txtArea = document.querySelector(".typed-text");

//Adding automatic text

function deleteLetters(value) {
  let index = value.length;
  const endId = setInterval(() => {
    let newTxt = value.substr(0, index);
    index--;

    txtArea.innerHTML = newTxt;

    if (index === -1) {
      clearInterval(endId);
      randomIdgenerator();
    }
  }, timeDelay);
}

function addLetters(i) {
  if (!arr || arr.length === 0) {
    console.log("No more words to display!");
    return;
  }

  const value = arr[i];
  arr.splice(i, 1);

  let index = 0;
  const startId = setInterval(() => {
    let newTxt = value.substr(0, index + 1);
    index++;

    txtArea.innerHTML = newTxt;

    if (index === value.length) {
      clearInterval(startId);
      setTimeout(() => deleteLetters(value), timeDelay * factor);
    }
  }, timeDelay);
}

function randomIdgenerator() {
  if (!arr || arr.length === 0) {
    console.log("No more words to generate!");
    return;
  }

  const i = Math.floor(Math.random() * arr.length);
  setTimeout(() => addLetters(i), timeDelay * factor);
}

async function newLetters() {
  try {
    let response = await fetch("extraTxt.txt");

    if (!response.ok) {
      throw new Error("Failed to fetch extraTxt.txt");
    }

    let randomTextCollection = await response.text();
    arr = randomTextCollection.split("\n").filter(text => text.trim().length > 0);

    randomIdgenerator();
  } catch (error) {
    console.error("Error fetching extraTxt.txt:", error);
  }
}

newLetters();
