// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  domain: 'localhost:4200/',
  jitBaseUrl: 'pasatrae.com',
  baseUrl: '/api/v1/',
  socket_endpoint: 'http://localhost:3001',
  peerServerHost: 'nemiac.com',
  peerServerPort: '9000',
  peerServerPath: '/peerjs',
  peerServerSecure: true, 
  peerServerDebugLevel: 3, 
  peerConfig: {
    config: {
      'iceServers': [
        { url: 'stun:stun1.l.google.com:19302' },
        { url: 'stun:stun2.l.google.com:19302' },
        { url: 'stun:stun3.l.google.com:19302' },
        { url: 'stun:stun4.l.google.com:19302' },
        {
          url: 'turn:numb.viagenie.ca',
          credential: 'muazkh',
          username: 'webrtc@live.com'
        }
      ]
    }
  }
};
