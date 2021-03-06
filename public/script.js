const socket = io('https://nomnomchat.azurewebsites.net/')
const messageContainer = document.getElementById('message-container')
const roomContainer = document.getElementById('room-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

if (messageForm != null) {
  const name = prompt('What is your name?')

  if (name === "") {
    // user pressed OK, but the input field was empty
    alert('Harap masukkan nama anda')
    window.location.href = '/'
  }
  else if (name) {
    appendConnection('You joined')
    socket.emit('new-user', roomName, name)

    messageForm.addEventListener('submit', e => {
      e.preventDefault()
      const message = messageInput.value
      if(message === "") {
        return
      } else {
        appendSelfMessage(message, 'You')
        socket.emit('send-chat-message', roomName, message)
        messageInput.value = ''
      }
    })
  }
  else {
    window.location.href = '/'
  }

}

socket.on('room-created', room => {
  // Happens when room created
})

socket.on('chat-message', data => {
  appendMessage(data.message, data.name)
})

socket.on('user-connected', name => {
  appendConnection(`${name} connected`)
})

socket.on('user-disconnected', name => {
  appendConnection(`${name} disconnected`)
})

function appendMessage(message, sender) {
  const messageElement = document.createElement('div')
  const senderElement = document.createElement('h6')

  messageElement.className = 'other-messages float-left'
  messageElement.innerText = message
  senderElement.innerText = sender

  messageContainer.append(senderElement)
  messageContainer.append(messageElement)
  messageContainer.append(document.createElement('br'))
  messageContainer.append(document.createElement('br'))
  messageContainer.append(document.createElement('br'))
}

function appendConnection(message) {
  const messageElement = document.createElement('div')
  messageElement.className = 'connect-messages'
  messageElement.innerText = message
  messageContainer.append(messageElement)
  messageContainer.append(document.createElement('br'))
}

function appendSelfMessage(message, sender) {
  const messageElement = document.createElement('div')
  const senderElement = document.createElement('h6')

  messageElement.className = 'self-messages float-right'
  messageElement.innerText = message
  senderElement.innerText = sender
  senderElement.className = 'aligntextright'

  messageContainer.append(senderElement)
  messageContainer.append(messageElement)
  messageContainer.append(document.createElement('br'))
  messageContainer.append(document.createElement('br'))
  messageContainer.append(document.createElement('br'))
}