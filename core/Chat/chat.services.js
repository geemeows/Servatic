import { serverHttp } from '../httpClient'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import Cookies from 'vue-cookies'

// Initialize Chat Manager
export const initChatManager = new ChatManager({
  instanceLocator: 'v1:us1:36b1d33d-9c63-4cb7-a38b-a700704de3a1',
  userId: Cookies.get('userEmail'),
  tokenProvider: new TokenProvider({
    url:
      'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/36b1d33d-9c63-4cb7-a38b-a700704de3a1/token'
  })
})
