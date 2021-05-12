const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// console.log(urlParams);

const config = {
    serverIp: urlParams.get('server_id'),
    roomId: urlParams.get('room_id'),
    name: urlParams.get('name'),
};
console.log(config);

const localVideo = document.getElementById("localStream");
const remoteVideo = document.getElementById("remoteStream");

const signalLocal = new Signal.IonSFUJSONRPCSignal(
    // `ws://${config.serverIp}:7000/ws`,
    `ws://localhost:7000/ws`,
);
const signalRemote = new Signal.IonSFUJSONRPCSignal(
    `ws://localhost:7000/ws`,
    // `ws://${config.serverIp}:7000/ws`,
);

let clientLocal = new IonSDK.Client(signalLocal);
let clientRemote = new IonSDK.Client(signalRemote);

signalLocal.onopen = () => clientLocal.join('123');
signalRemote.onopen = () => clientRemote.join('123');

let localStream;
const start = () => {
    simulcast = false;
    IonSDK.LocalStream.getUserMedia({
        resolution: "hd",
        simulcast: false,
        audio: true,
    })
        .then((media) => {
            localStream = media;
            localVideo.srcObject = localStream; // media;
            localVideo.autoplay = true;
            localVideo.controls = true;
            localVideo.muted = true;
            // joinBtns.style.display = "none";
            clientLocal.publish(media);
        })
        .catch(console.error);
    localDataChannel = clientLocal.createDataChannel("data");
};

const send = () => {
    if (localDataChannel.readyState === "open") {
        localDataChannel.send(localData.value);
    }
};

let remoteStream;
clientRemote.ontrack = (track, stream) => {
    if (track.kind === "video") {
        remoteStream = stream;
        remoteVideo.srcObject = stream;
        remoteVideo.autoplay = true;
        // getStats();
    }
};

clientRemote.ondatachannel = ({ channel }) => {
    channel.onmessage = ({ data }) => {
        remoteData.innerHTML = data;
    };
};

getStats = () => {
    let bytesPrev;
    let timestampPrev;
    setInterval(() => {
        clientRemote.getSubStats(null).then((results) => {
            results.forEach((report) => {
                const now = report.timestamp;

                let bitrate;
                if (
                    report.type === "inbound-rtp" &&
                    report.mediaType === "video"
                ) {
                    const bytes = report.bytesReceived;
                    if (timestampPrev) {
                        bitrate = (8 * (bytes - bytesPrev)) / (now - timestampPrev);
                        bitrate = Math.floor(bitrate);
                    }
                    bytesPrev = bytes;
                    timestampPrev = now;
                }
                if (bitrate) {
                    //brTag.innerHTML = 
                    // console.log(`${bitrate} kbps @ ${report.framesPerSecond} fps`);
                }
            });
        });
    }, 1000);
};

start();

let camera;
let devices;

function switchCamera() {
    camera += 1;
    if (camera > devices.length - 1) { camera = 0; }
    local.switchDevice('video', devices[camera].deviceId);
}
function getDevices() {
    devices = (navigator.mediaDevices.enumerateDevices());
    // camera = devices.findIndex(i => i.label === localStream.label);
}
getDevices();
console.log(devices);