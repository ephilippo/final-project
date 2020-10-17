//import * as THREE from "../three.js"
  
const EVENT_LOGIN              = "login",
      EVENT_PADDLE_UPDATE      = "paddle update",
      EVENT_BALL_UPDATE        = "ball update",
      EVENT_GAME_OVER          = "game finished",
      EVENT_ATTEMPT_JOIN       = "attempt join",
      EVENT_SUCCESSFUL_JOIN    = "successful join",
      EVENT_UNSUCCESSFUL_JOIN  = "unsuccessful join",
      EVENT_CHAT_MESSAGE       = "chat message"

let socket = io()
window.onload = function() {
  
  let myUsername = sessionStorage.user
  
  document.getElementById("whoAmI").innerHTML = myUsername;
  socket.emit(EVENT_LOGIN, {username:myUsername})
  
  const friendNameField = document.querySelector("#friend")
  const joinFriendForm = document.querySelector("#friendForm")
  let chatDiv = document.querySelector("#inbox")
  const chatForm = document.querySelector('#chatform')
  const chatField = document.querySelector('#chat')
  
  function addChatMessage(message, username) {
    console.log(message)
    const time = new Date();
    const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" })
    let formattedMsg = `<div class="message message_inbound">
                          <p>${message}</p>
                          <div class="message_info">
                            ${username}: ${formattedTime}
                          </div>
                        </div>`
    
    chatDiv.innerHTML += formattedMsg
  }
  
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault()   
    let message = chatField.value
    chatField.value = ""
    
    addChatMessage(message, myUsername)
    socket.emit(EVENT_CHAT_MESSAGE, { message, username:myUsername })
  })
  
    socket.on(EVENT_CHAT_MESSAGE, ({ username, message }) => {
    addChatMessage(message, myUsername)
  })


  
//   joinFriendForm.addEventListener("submit", (e) => {
//     e.preventDefault()   
//     let joinTarget = friendNameField.value
    
//     if(joinTarget==="") {
//       window.alert("You need to specify a player to join!  Good job checking edge cases tho")
//     } else if(joinTarget===myUsername) {
//       window.alert("You can't join yourself!  Good job checking edge cases tho")
//     } else {
//       socket.emit(EVENT_ATTEMPT_JOIN, { username: myUsername, joinTarget})
//     }
//   })  
//   socket.on(EVENT_UNSUCCESSFUL_JOIN, ({ joinTarget }) => {
//     window.alert(joinTarget + " is not a valid player to join.  Try someone else.")
//   })

//   socket.on(EVENT_SUCCESSFUL_JOIN, ({ username }) => {
//     sessionStorage.friend = username
//   })
}
