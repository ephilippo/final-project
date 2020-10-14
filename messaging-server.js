const BUILTIN_EVENT_CONNECT    = "connect",
      BUILTIN_EVENT_DISCONNECT = "disconnect"

const EVENT_GAME_UPDATE        = "game update",
      EVENT_GAME_OVER          = "game finished"
      EVENT_LOBBY_UPDATE       = "lobby update",
      EVENT_CHAT_MESSAGE       = "chat message"

const socket = require("socket.io")

function launchMessaging(server) {
    const baseSock = socket(server)
    console.log("Socket created on server")
    
    baseSock.on(BUILTIN_EVENT_CONNECT, function (userSock) {
        console.log("Connection connected connectfully.")
        
        
        
        
        
        userSock.on(BUILTIN_EVENT_DISCONNECT, () => {
            console.log("User disconnected.  Their loss.")
        })
    })
}

module.exports = { launchMessaging }