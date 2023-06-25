let InputValue = document.querySelector("input");
const UserListener = document.getElementById("user-area");
const includeNumbersCheckbox= document.getElementById("userSelect1");
const includeSpecialCharactersCheckbox = document.getElementById("userSelect2");
let password_len = document.getElementById("count");
let password_result = document.getElementById("yourPassword")
let Numbers = /[0-9]/g;
let LowerCase =/^[a-ž]+$/i;
let UpperCase =/^[A-Ž]+$/i;
let button = document.getElementById("btn1");
let SpecialLetters = /^[`~!@#\$%\^&\*\(\)\-=_+\\\[\]{}/\?,\.\<\>]/g;
const passwords = [
  "123456","123456789","picture1","password",
  "12345678","111111","123123","12345",
  "1234567890","qwerty","heslo","Password"
]
const tests = [
  { name: "test_0", test: password => {passwords.forEach(bad => {
      if (bad === password) {return true; }});return false;}},
  { name: "test_01", test: password => password.length >= 12 },
  { name: "test_02", test: password => password.length >= 16 && password.match(SpecialLetters) },
  { name: "test_03", test: password => password.length >= 20 && password.match(SpecialLetters) && password.match(Numbers) },
  { name: "test_04", test: password => password.length >= 8 },
  { name: "test_05", test: password => password.match(LowerCase) },
  { name: "test_06", test: password => password.match(UpperCase) },
  { name: "test_07", test: password => password.match(Numbers) },
  { name: "test_08", test: password => password.match(SpecialLetters) },
  { name: "test_09", test: password => password.match(SpecialLetters) && password.match(Numbers) },
];
UserListener.addEventListener("submit", CheckStrongPassword);
function CheckStrongPassword(e){
  e.preventDefault();
  let password = InputValue.value;
  let passedTests = tests.filter(item =>item.test(password));
  let strength = null;
  switch (passedTests.length) {
    case 0:strength = "Very weak"; break;
    case 1:strength = "Weak"; break;
    case 2:strength = "Fair";break;
    case 3:strength = "Good"; break;
    case 4:strength = "Strong";break;
    case 5:strength = "Very strong";break;
    case 6:strength = "Excellent";break;
    case 7:strength = "Outstanding";break;
    default:strength = "Unknown";
  }
  alert(`${strength}`);
}
button.addEventListener("click" ,Generate)
function Generate(e) {
    e.preventDefault();  
    passwordCheck = false;
    let output = "";
    if (isNaN(parseInt(password_len.value.length))) {
      alert("Please enter a valid number");
      return;
    }
      while (password_len.value <= 5 ) {
        alert("Please enter a bigger number");
        return;
    }
    const letters = [    
        "yxcvbnmasdfghjklůqwertzuiopúěščřžýáíé", 
           "YXCVBNMASDFGHJKLQWERTZUIOPÚĚŠČŘŽÝÁÍÉ", 
              "0123456789", 
                 "`~!@#$%^&*()-=_+[]{}|;':\",./<>?" 
                 ];
    let uppercase_lowercase = [letters[0] , letters[1]];
    let randomCase = uppercase_lowercase[Math.floor(Math.random() * uppercase_lowercase.length)];
    const combinate_1 = letters[0] + letters[1];
    const combinate_2 = letters[2] + randomCase;
    const combinate_3 = letters[3] + randomCase;
    const combinate_4 = letters[3] + letters[4] + randomCase;
  function GeneratePassword(combinate){
    try{
    for(let i = 0;i<=password_len.value;i++){
        let newPassword = Math.floor(Math.random() * combinate.length);
        output+=combinate.substring(newPassword , newPassword +1);
        password_result.innerHTML = `Password: ${output}`;
    }
    }
    catch(error){
      console.error(error)
    }
  }
    if (includeNumbersCheckbox.checked && includeSpecialCharactersCheckbox.checked) {
       GeneratePassword(combinate_4);
    }
    else if (includeNumbersCheckbox.checked) {
        GeneratePassword(combinate_2);
     
    } else if (includeSpecialCharactersCheckbox.checked) {
        GeneratePassword(combinate_3);
     
    } else {
        GeneratePassword(combinate_1);
    }
  } 