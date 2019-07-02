import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

// Initialize Chat Manager
export const initChatManager = new ChatManager({
  instanceLocator: 'v1:us1:36b1d33d-9c63-4cb7-a38b-a700704de3a1',
  userId: 'Ahmed@gmail.com',
  tokenProvider: new TokenProvider({
    url:
      'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/36b1d33d-9c63-4cb7-a38b-a700704de3a1/token'
  })
})

export const addToRoom = chatManager => {
  chatManager
    .connect({
      onAddedToRoom: room => {
        this.room = room
        this.listen()
        console.log(`Added to room ${room.name}`)
      }
    })
    .then(currentUser => {
      this.currUser = currentUser
      console.log('Successful connection', currentUser)
    })
    .catch(err => {
      console.log('Error on connection', err)
    })
};
