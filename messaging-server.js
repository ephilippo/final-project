const BUILTIN_EVENT_CONNECT    = "connect",
      BUILTIN_EVENT_DISCONNECT = "disconnect"

const EVENT_LOGIN              = "login",
      EVENT_PADDLE_UPDATE      = "paddle update",
      EVENT_CHAT_MESSAGE       = "chat message",
      EVENT_ATTEMPT_JOIN       = "attempt join",
      EVENT_SUCCESSFUL_JOIN    = "successful join",
      EVENT_BALL_UPDATE        = "ball update",
      EVENT_UNSUCCESSFUL_JOIN  = "unsuccessful join"

const socket = require("socket.io")

function launchMessaging(server) {
  
  const baseSock = socket(server)
  console.log("Socket created on server")
  
  //Key: username Values: socketid
  const onlinePlayers = {}
  //Key: username Values: roomid
  const playersInGame = {}

  baseSock.on(BUILTIN_EVENT_CONNECT, (userSock) => {
    console.log("Connected successfully.")

    userSock.on(EVENT_LOGIN, ({username}) => {
      userSock.username = username
      onlinePlayers[username] = userSock.id
    })
    userSock.on(EVENT_ATTEMPT_JOIN, ({username, joinTarget}) => {
      if(onlinePlayers.hasOwnProperty(joinTarget)) {
        let sockid = onlinePlayers[joinTarget]

        playersInGame[joinTarget] = sockid
        playersInGame[userSock.username] = sockid
        userSock.join(sockid)
        userSock.emit(EVENT_SUCCESSFUL_JOIN, { username })
        baseSock.to(sockid).emit(EVENT_SUCCESSFUL_JOIN, { username:userSock.username })
      } else {
        userSock.emit(EVENT_UNSUCCESSFUL_JOIN, { joinTarget })
      }
    })    
    
    userSock.on(EVENT_CHAT_MESSAGE, (data) => {
      userSock.broadcast.emit(EVENT_CHAT_MESSAGE, data)
    })

    userSock.on(BUILTIN_EVENT_DISCONNECT, () => {
      console.log("User disconnected.  Their loss.")
      let name = userSock.username
      
      if(onlinePlayers.hasOwnProperty(name)) delete onlinePlayers[name]
      if(playersInGame.hasOwnProperty(name)) delete playersInGame[name]
    })
  })
}

module.exports = { launchMessaging }