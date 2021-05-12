document.getElementById("submit").addEventListener("click", function(event){
    start();
    event.preventDefault()
});

  
// function start() {
//     const config = {
//         serverIp: document.getElementById("server_ip").value,
//         roomId: document.getElementById("room_id").value,
//         name: document.getElementById("name").value,
//     };
//     console.log(config);
// }