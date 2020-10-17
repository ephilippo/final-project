const loginForm = document.getElementById("login-form");
const createForm = document.getElementById("create-form");

loginForm.addEventListener("submit", event => {
  // stop our form submission from refreshing the page
  event.preventDefault();

        //get usarname and password
        let uname = loginForm.elements.username.value;
        let psw = loginForm.elements.pass.value;

        fetch("/login", {
          method: "POST",
          body: JSON.stringify({ uname: uname, psw: psw }),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())
          .then(json => {
            if (json.login) {
              window.alert("Login Successful");
              sessionStorage.user = uname;
              //!!!CHANGED URL
              self.location = "main.html";
            } else {
              window.alert("Wrong Username/Password");
            }
          });

        //reset form
        loginForm.reset();
      });

      createForm.addEventListener("submit", event => {
        // stop our form submission from refreshing the page
        event.preventDefault();

        //get new username and password
        let nuname = createForm.elements.username.value;
        //!!!CHANGED FROM PWORD TO PASS
        let npsw = createForm.elements.pass.value;

        fetch("/create", {
          method: "POST",
          body: JSON.stringify({ uname: nuname, psw: npsw }),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())
          .then(json => {
            if (json.newu) {
              window.alert("New Account Created");
              sessionStorage.user = nuname;
              //!!!CHANGED URL
              self.location = "main.html";
            } else {
              window.alert("Account already exists");
            }
          });

        //reset form
        createForm.reset();
      });