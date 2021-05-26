# ion-js-test

<strong>server : </strong></br>
git clone https://github.com/pion/ion-sfu.git </br>
cd ion-sfu</br>
docker run -p 7000:7000 -p 5000-5200:5000-5200/udp pionwebrtc/ion-sfu:latest-jsonrpc</br>

<strong>web front-end:</strong></br>
</br>
serve index.js in public directory with any web server application.</br>

# documentation

<h3>Using js sdk</h3> </br>

<strong>init signal: </strong></br>
```javascript
const signal = new Signal.IonSFUJSONRPCSignal(`ws://server-ip:7000/ws`); 
let clientLocal = new IonSDK.Client(signal);  
let clientRemote = new IonSDK.Client(signal);

signalLocal.onopen = () => clientLocal.join(`room-id`);
signalRemote.onopen = () => clientRemote.join(`room-id`);  
`put remote and local in the same room to start talking to each other.`
```

<strong>Publishing local stream: </strong></br>
```javascript
const localVideo = document.getElementById("localStream");
let localStream;
const start = () => {
    simulcast = false;
    IonSDK.LocalStream.getUserMedia({
        resolution: "hd",
        simulcast: false,
        audio: true,
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
    localDataChannel = clientLocal.createDataChannel("data");
};
```
