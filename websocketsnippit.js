
function handleData(data){
    // refresh ui, et cetera
    console.log("abc123")
}

let x = new WebSocket("wss://api.thegraph.com/subgraphs/name/zk-farts/dfartifactmarket") // declare websocket
x.onmessage = (event)=>{ // handle websocket response
    console.debug("WebSocket message received:", event)
    try {
        handleData(JSON.parse(event.data))   
    } catch (error) {
        console.error(error)
    }
}

x.send("subscription recent_unlisted{ unlistedTokens{ tokenID price owner}}") // subscribe to websocket feed of latest unlist
