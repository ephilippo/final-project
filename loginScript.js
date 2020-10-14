const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", event => {
   // stop our form submission from refreshing the page
   event.preventDefault();
  
  //get dream value and add it to the list
  let uname = loginForm.elements.uname.value;
  let psw   = loginForm.elements.psw.value
  
  fetch('/login', {
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
    else if(json.login) {
      window.alert("Login Successful");
      self.location="index.html"
    }
    else{
      window.alert("Wrong Password");
    }
      
  })
  
  
  //reset form
  loginForm.reset();
   
});