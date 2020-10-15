const loginForm = document.getElementById("loginForm");
const createForm = document.getElementByID("createForm");

loginForm.addEventListener("submit", event => {
   // stop our form submission from refreshing the page
   event.preventDefault();
  
  //get usarname and password
  let uname = loginForm.elements.username.value;
  let psw   = loginForm.elements.pass.value;
  
  fetch('/login', {
    method:'POST',
    body:JSON.stringify({uname: uname, psw: psw}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then( response => response.json() )
  .then( json => {
    if(json.login) {
      window.alert("Login Successful");
      self.location="index.html"
    }
    else{
      window.alert("Wrong Username/Password");
    }
      
  })
  
  
  //reset form
  loginForm.reset();
   
});

createForm.addEventListener("submit", event => {
   // stop our form submission from refreshing the page
   event.preventDefault();
  
  //get usarname and password
  let uname = createForm.elements.user.value;
  let psw   = createForm.elements.pword.value;
  
  fetch('/create', {
    method:'POST',
    body:JSON.stringify({uname: uname, psw: psw}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then( response => response.json() )
  .then( json => {
    if(json.newu){
      window.alert("New Account Created")
      self.location="index.html"
    }
    else{
      window.alert("Account already exists");
    }
  })
  
  
  //reset form
  createForm.reset();
   
});