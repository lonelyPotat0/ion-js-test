# ion-js-test

<strong>server : </strong></br>

```bash
git clone https://github.com/pion/ion-sfu.git
cd ion-sfu
docker run -p 7000:7000 -p 5000-5200:5000-5200/udp pionwebrtc/ion-sfu:latest-jsonrpc
```

    * Notice: open tcp port 7000 and udp port range 5000-5200.
    * ( 5000 - 5200 = 200 peers can be connected. 200 peers = 100 calls)

<strong>web front-end:</strong></br>
</br>
serve index.html in public directory with any web server application.</br>

# Documentation

<h3>Using js sdk</h3> </br>

<strong>installation: </strong></br>
 * nodejs: 
```bash
    npm install ion-sdk-js
```
```html
    import { Client, LocalStream, RemoteStream } from 'ion-sdk-js';
    import { IonSFUJSONRPCSignal } from 'ion-sdk-js/lib/signal/json-rpc-impl';
```
 *Vanilla JS
```javascript
    <script
      src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://unpkg.com/ion-sdk-js@1.5.5/dist/ion-sdk.min.js"></script>
    <script src="https://unpkg.com/ion-sdk-js@1.5.5/dist/json-rpc.min.js"></script>
```

<strong>init signal: </strong></br>
```javascript
const signal = new Signal.IonSFUJSONRPCSignal(`ws://server-ip:7000/ws`); 
let clientLocal = new IonSDK.Client(signal);  
let clientRemote = new IonSDK.Client(signal);

signalLocal.onopen = () => clientLocal.join(`room-id`);
signalRemote.onopen = () => clientRemote.join(`room-id`);  
// put remote and local in the same room to start talking to each other.
```

<strong>Publishing local stream: </strong></br>
```javascript
const localVideo = document.getElementById("localStream"); // html video tag with id="localStream"
let localStream;
const start = () => {
    simulcast = false;
    IonSDK.LocalStream.getUserMedia({
        resolution: "hd", // hd , md ,sd
        simulcast: false,
        audio: true, // stream audio
    })
        .then((media) => {
            // display local media on screen;
                localStream = media;
                localVideo.srcObject = localStream;
                localVideo.autoplay = true;
                localVideo.controls = true;
                localVideo.muted = true;
            //  publish to server  
                clientLocal.publish(media);
        })
        .catch(console.error);
};
```
<strong>Getting remote stream:</strong>
```javascript
const remoteVideo = document.getElementById("remoteStream"); // html video tag with id="remoteStream"
let remoteStream;
clientRemote.ontrack = (track, stream) => {
    if (track.kind === "video") {
        remoteStream = stream;
        remoteVideo.srcObject = remoteStream;
        remoteVideo.autoplay = true;
    }
};

```