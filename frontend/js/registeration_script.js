//Selecting all elements from registeration page

const firstNameElem = document.getElementById("firstName");
const lastNameElem = document.getElementById("lastName");
const phoneNumElem = document.getElementById("mobNumber");
const passwordElem = document.getElementById("password");
const confirm_passwordElem = document.getElementById("confirm_password");
const emailElem = document.getElementById("mail");
const addressElem = document.getElementById("address");
const ageElem = document.getElementById("age");

const registerBtn = document.getElementById("registerBtn");

//Below is the number of salts for bcrypt
const saltRounds = 10;

//Guard class definition
class Guard {
  constructor(firstName, lastName, phoneNum, password, email, address, age) {
    this.name = `${firstName} ${lastName}`
    this.phoneNum = phoneNum;
    this.password = password;
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
    passwordElem.value,
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
        phoneNumElem.value &&
        passwordElem.value &&
        addressElem.value &&
        ageElem.value
      )
    ) {
      alert("Kindly fill the form!");
      return;
    } else if (!guardRegister) {
      //checks if both passwords are equal
      if (passwordElem.value == confirm_passwordElem.value) {
        console.log("Succesfully registered!");
        encryptPassword(confirm_passwordElem.value).then((response) => {
          newGuard.password = response; //this updates the password with encrypted password
          sendData();
          window.location.href = "login.html"
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

  //sending the data to backend
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
