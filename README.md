# ion-js-test

<strong>server : </strong></br>
git clone https://github.com/pion/ion-sfu.git </br>
cd ion-sfu</br>
docker run -p 7000:7000 -p 5000-5200:5000-5200/udp pionwebrtc/ion-sfu:latest-jsonrpc</br>

<strong>web front-end:</strong></br>
</br>
serve index.js in public directory with any web server application.</br>

# documentation

<strong>Using js sdk</strong> </br>

init signal: </br>
const signal = new Signal.IonSFUJSONRPCSignal(`ws://server-ip:7000/ws`); </br>
let clientLocal = new IonSDK.Client(signal);  </br>
let clientRemote = new IonSDK.Client(signal); </br>

signalLocal.onopen = () => clientLocal.join(`room-id`); </br>
signalRemote.onopen = () => clientRemote.join(`room-id`);  </br>
`put remote and local in the same room to start talking to each other.` </br>

