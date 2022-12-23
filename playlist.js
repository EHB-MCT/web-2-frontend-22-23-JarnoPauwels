// Get all Playlists
window.onload = getPlaylists();

// Gets all playlist froms specific user
async function getPlaylists(){
        let user = JSON.parse(sessionStorage.getItem('user'));
        fetch(`https://web-2-course-project-nbij.onrender.com/playlists?userId=${user.user_id}`, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },

        }).then(response => {
            return response.json()
        }).then(async data => {
            var array = data;

            let htmlString = ` `;
            array.forEach(element => {

                let songs = element.songs[0]

                async function displayPlaylists (){
                    // fetch songs to display playlist background img
                    const response = await fetch(`https://api.getsongbpm.com/song/?api_key=25e2888c19fbbe8050eaad782fd41e64&id=${songs.song_id}`);
                    const song = await response.json();

                    htmlString += 
                        `   
                        <div class="playlist-item">
                            <div class="playlist-item-inside">
                                <div class="playlist-text">                   
                                    <h1>${element.playlist_name}</h1>
                                    <p>${element.playlist_desc}</p>
                                </div>
                                <div class="playlist-icon">                
                                    <button class="delBtn" id="deletePlaylist" onclick="deletePlaylist('${user.user_id}', '${element.playlist_id}')">
                                        <i class="fa-solid fa-trash" id="trash-icon"></i>
                                    </button>
                                </div>  
                            </div>
                            <img class="pl-bg-img" src="${song.song.artist.img}" alt="" onclick="getPlaylist('${user.user_id}', '${element.playlist_id}')">
                        </div>
                        `;

                    document.getElementById('playlist-info-container').style.display = "none";
                    document.getElementById('playlist-info-container-home').style.display = "none";
                    document.getElementById('playlist-info-container-text').style.display = "none";
                    document.getElementById('playlistResultContainer').style.display = "none";
                    
                    document.getElementById('playlistDataContainer').style.display = "block";
                    document.getElementById('playlist-inside').innerHTML =  htmlString;

                }     
                displayPlaylists();

                
            });
        });
}

// Get One specific Playlist
async function getPlaylist(userId, playlistId){
        fetch(`https://web-2-course-project-nbij.onrender.com/playlist?userId=${userId}&playlistId=${playlistId}`, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },

        }).then(response => {
            return response.json()
        }).then(async data => {
            var playlist = data;

            let htmlString = ` `;
            let songs = playlist.songs

            songs.forEach(element =>{
                async function displaySongs (){                        
                    const response = await fetch(`https://api.getsongbpm.com/song/?api_key=25e2888c19fbbe8050eaad782fd41e64&id=${element.song_id}`);
                    const song = await response.json();

                    htmlString += 
                        `   
                        <div class="musicContainer">
                            <div class="bg-img" style="background-image: url(${song.song.artist.img});"></div>
                            <div class="musicPlayer">
                                <div class="img-container">
                                    <img class="musicImg" src="${song.song.artist.img}" alt="">
                                </div>
                                <div class="infoContainer">
                                    <h2>${song.song.title}</h2>
                                    <h3>${song.song.artist.name}</h3>
                                </div>
                                <div class="infoContainer2">
                                    <h4>BPM</h4>
                                    <p>${song.song.tempo}</p>
                                </div>
                                <button class="delButton" id="delButton" onclick="deleteSong('${userId}', '${playlist.playlist_id}', '${song.song.id}')">
                                    <i class="fa-solid fa-trash fa-4x"></i>
                                </button>
                            </div>
                        </div>
                        `;
                        document.getElementById('playlistContainer').innerHTML = htmlString;

                } 
                displaySongs();
            });
            document.getElementById('playlistResultContainer').style.display = "block";
            document.getElementById('playlist-info-container').style.display = "block";
            document.getElementById('playlist-info-container-home').style.display = "flex";
            document.getElementById('playlist-info-container-text').style.display = "flex";
       
            document.getElementById('playlistTitle').innerHTML = `${playlist.playlist_name}`;
        });
        document.getElementById('playlistDataContainer').style.display = "none";
}

// Adds Song to Playlist
async function addPlaylist(){
    let user = JSON.parse(sessionStorage.getItem('user'));
    let playlistName = document.getElementById("plname").value;
    let playlistDesc = document.getElementById("pldesc").value;

    fetch(`https://web-2-course-project-nbij.onrender.com/playlist`, {
    mode: 'cors',
    method: "PUT",
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
        playlist_name: playlistName,
        playlist_desc: playlistDesc,
        user_id: user.user_id 
    })
    }).then(response => {
        return response
    }).then(async data => {
        // getPlaylists();
        closeForm();
    });

    document.getElementById('createPlaylist').addEventListener('submit', (e) => {e.preventDefault();}); 
}

// Deletes Entire Playlist from Database
async function deletePlaylist(userId, playlistId){
    fetch(`https://web-2-course-project-nbij.onrender.com/playlist?userId=${userId}&playlistId=${playlistId}`, {
        mode: 'cors',
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    }).then(response => {
        return response
    }).then(async data => {
        getPlaylists();
    });
    document.getElementById('deletePlaylist').addEventListener('submit', (e) => {e.preventDefault();}); 
}

// Deletes Specific Song from A Playlist
async function deleteSong(userId, playlistId, songId){
    fetch(`https://web-2-course-project-nbij.onrender.com/playlist/song?userId=${userId}&playlistId=${playlistId}&songId=${songId}`, {
        mode: 'cors',
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    }).then(response => {
        return response
    }).then(async data => {
        getPlaylist(userId, playlistId);
    });
    document.getElementById('delButton').addEventListener('submit', (e) => {e.preventDefault();});

}

// Opens the Create Playlist Form
function openForm() {
    document.getElementById("playlistFormContainer").style.display = "block";
}

// Closes the Create Playlist Form
function closeForm() {
    document.getElementById("playlistFormContainer").style.display = "none";
}

// Changes the Login Tooltip to show who is logged in
function loginTooltip(){
    let loggedUser = JSON.parse(sessionStorage.getItem('user'))

    if(loggedUser){
        document.getElementById('loginTooltip').innerText = `Logged in as: ${loggedUser.username}`;
    };
}

loginTooltip();