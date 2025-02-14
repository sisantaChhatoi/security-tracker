//Selecting all the elements

const phoneNumElem = document.getElementById("mobNumber");
const pwdElem = document.getElementById("pwd");

//! Include mail address in the logic of the code
const mailElement = document.getElementById ('emailAddress')
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
      window.location.href = "";
    }
  });
});
