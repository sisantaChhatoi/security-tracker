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

//Below is related to bcrypt
  

const saltRounds = 10; 
  


//Guard class definition
class Guard {
  constructor(firstName, lastName, phoneNum, pwd, email, address, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNum = phoneNum;
    this.pwd = pwd;
    this.email = email;
    this.address = address;
    this.age = age;
  }
}

//This returns an encrypted password
async function encryptPassword(password) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error("Error hashing password:", error);
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

//Adding event to the submit button
registerBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //Making an instance of guard object at the time of submit button
  let newGuard = new Guard(
    firstNameElem.value,
    lastNameElem.value,
    phoneNumElem.value,
    pwdElem.value,
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
        addressElem.value &&
        ageElem.value
      )
    ) {
      alert("Kindly fill the form!");
      return;
    } else if (!guardRegister) {
      //checks if both passwords are equal
      if (pwdElem.value == confirm_pwdElem.value) {
        encryptPassword(confirm_pwdElem.value).then((response) => {
          newGuard.pwd = response; //this updates the pwd with encrypted pwd
          sendData();
          alert("Registeration successful!");
        });
      } else {
        alert("Kindly match the password!");
        return;
      }
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
