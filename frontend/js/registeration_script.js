//Selecting all elements from registeration page

const firstNameElem = document.getElementById("");
const lastNameElem = document.getElementById("");
const phoneNumElem = document.getElementById("");
const pwdElem = document.getElementById("");
const confirm_pwdElem = document.getElementById("");
const emailElem = document.getElementById("");
const addressElem = document.getElementById("");
const ageElem = document.getElementById("");

const registerBtn = document.getElementById("");

//Guard class definition
class Guard {
  constructor(
    firstName,
    lastName,
    phoneNum,
    pwd,
    confirm_pwd,
    email,
    address,
    age
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNum = phoneNum;
    this.pwd = pwd;
    this.confirm_pwd = confirm_pwd;
    this.email = email;
    this.address = address;
    this.age = age;
  }
}

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

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //Making an instance of guard object at the time of submit button
  let newGuard = new Guard(
    firstNameElem.value,
    lastNameElem.value,
    phoneNumElem.value,
    pwdElem.value,
    confirm_pwdElem.value,
    emailElem.value,
    addressElem.value,
    ageElem.value
  );

  //Addresses the edge cases (like guard already registered, invalid input fields etc)
  const result = isGuardRegistered(phoneNumElem.value);

  //guardRegister is response from the isGuardRegistered(). true -> registered. false -> not registered
  result.then((guardRegister) => {
    if (
      !(
        firstNameElem.value &&
        lastNameElem.value &&
        phoneNumElem.value &&
        pwdElem.value &&
        confirm_pwdElem.value &&
        addressElem.value &&
        ageElem.value
      )
    ) {
      alert("Kindly fill the form!");
      return;
    } else if (!guardRegister) {
      sendData();
      alert("Registeration successful!");
    } else {
      alert("You are already registered... Kindly login!");
      return;
    }
  });

  //sending the data to backend using phoneNum
  async function sendData() {
    try {
      //! Put url of backend here
      await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGuard),
      });
    } catch (error) {
      console.error(error);
    }
  }
});
