window.onload = randomSongs()
// Get and Displasy Random Songs on Load
async function randomSongs(){

    // Get random BPM number for fetch
    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };   
    
    const response = await fetch(`https://api.getsongbpm.com/tempo/?api_key=25e2888c19fbbe8050eaad782fd41e64&bpm=${randomInteger(40, 220)}&limit=6`);
    const song = await response.json();
    console.log(song);

    var songArray = song.tempo;
    let user = JSON.parse(sessionStorage.getItem('user'));
    
    let songString = "";
    songArray.forEach(element => {
            // Display Songs
            songString +=        
                `<div class="musicContainer">
                    <div class="bg-img" id="bg-img" style="background-image: url(${element.album.img});"></div>
                    <div class="musicPlayer" id="${element.artist.id}">
                        <div class="img-container">
                            <img class="musicImg" src="${element.album.img}" alt="">
                        </div>
                        <div class="infoContainer">
                            <h2>${element.song_title}</h2>
                            <h3>${element.artist.name}</h3>
                        </div>
                        <div class="infoContainer2">
                            <h4>BPM</h4>
                            <p>${element.tempo}</p>
                        </div>
                        <button class="addButton" onclick="openPlaylistForm('${element.song_id}+1')">
                            <i class="fa-solid fa-plus fa-4x"></i>
                        </button>   
                    </div>

                    <div class="addSong-popup" id="${element.song_id}+1" style="display: none;">
                        <div class="addSong-container" id="addSong-container" style="filter: none;">
                            <div class="addSong-top">
                                <button type="button" class="createPl" style="cursor: pointer" onclick="openCreateForm()">Create Playlist <i class="fa-solid fa-plus"></i></button>
                                   <button type="button" class="closeBtn" onclick="closePlaylistForm('${element.song_id}+1')">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            <div class="addSong-bottom" id="${element.song_id}">
                                <h3 id="loggedIn">You are not logged in!</h3>
                            </div>
                        </div>
                    </div>
                </div>`;
            
            // Puts the display of mood title and bpm back to none (these are displayed standard, on load they get put to none until you click on a mood, to return to homepage this function gets called and they get put back to none)
            document.getElementById('single-mood-container').style.display = "none";
            document.getElementById('single-mood-container-home').style.display = "none";
            document.getElementById('single-mood-container-text').style.display = "none";
            document.getElementById('dataContainer').innerHTML = 
            `<div class="searchContainer">
                <div class="wrap" id="inputContainer">
                <div class="search" id="songInput">
                    <input id="songInputField" type="search" class="searchBar" placeholder="Search by Tempo/BPM">
                    <select class="limit" name="limit" id="limit">
                        <option value="3">3</option>
                        <option value="6">6</option>
                        <option value="9">9</option>
                        <option value="12">12</option>
                    </select>
                    <button type="submit" class="searchButton" onclick="getSongs(), clearInput()">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
                </div>
            </div>
            
            <div class="searchResultContainer" id="searchResultContainer">
                <div id="songAddedMsg" class="songAddedMsg">
                    <h3>Added song to playlist!</h3>
                </div>
                <div id="songsArrayHtml"></div>
            </div>
    
            <div class="moodContainer" id="moodDataContainer">
                <p class="mood-pre-title">Search By</p>
                <h1 class="mood-title">Moods</h1>
                <div class="mood-inside">
                    <div class="mood-item">
                        <h1 onclick="firstMood(40, 'ULTRA SLOW')">Ultra Slow</h1>
                        <img class="background-img" src="./moods/124353-huqumrjvmo-1563950293.jpg" alt="" onclick="firstMood(40, 'ULTRA SLOW')">
                    </div>
                    <div class="mood-item">
                        <h1 onclick="firstMood(60, 'REALLY SLOW')">Really Slow</h1>
                        <img class="background-img" src="./moods/_WW1129401.jpg" alt="" onclick="firstMood(60, 'REALLY SLOW')">
                    </div>
                    <div class="mood-item">
                        <h1 onclick="firstMood(80, 'SLOW')">Slow</h1>
                        <img class="background-img" src="./moods/turtle-16532029043x2.jpg" alt="" onclick="firstMood(80, 'SLOW')">
                    </div>
                    <div class="mood-item">
                        <h1 onclick="firstMood(100, 'INTERMEDIATE SLOW')">Inter- mediate Slow</h1>
                        <img class="background-img" src="./moods/turtle-16532029043x2.jpg" alt="" onclick="firstMood(100, 'INTERMEDIATE SLOW')">
                    </div>
                    <div class="mood-item">
                        <h1 onclick="firstMood(120, 'INTERMEDIATE FAST')">Inter- mediate Fast</h1>
                        <img class="background-img" src="./moods/turtle-16532029043x2.jpg" alt="" onclick="firstMood(120, 'INTERMEDIATE FAST')">
                    </div>
                    <div class="mood-item">
                        <h1 onclick="firstMood(140, 'FAST')">Fast</h1>
                        <img class="background-img" src="./moods/HareMainPic.jpg" alt="" onclick="firstMood(140, 'FAST')">
                    </div>
                    <div class="mood-item">
                        <h1 onclick="firstMood(160, 'REALLY FAST')">Really Fast</h1>
                        <img class="background-img" src="./moods/front-view-of-a-female-cheetah--acinonyx-jubatus--running-73553651-5c62c0a2c9e77c0001566d2a.jpg" alt="" onclick="firstMood(160, 'REALLY FAST')">
                    </div>
                    <div class="mood-item">
                        <h1 onclick="firstMood(180, 'ULTRA FAST')">Ultra Fast</h1>
                        <img class="background-img" src="./moods/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2016__10__cloud-ground-lightning-f71bba67383949648b1e519588c26342.jpg" alt="" onclick="firstMood(180, 'ULTRA FAST')">
                    </div>
                </div>
            </div>
            
            <div class="playlistFormContainer" id="playlistFormContainer">
                <form class="playlistForm" id="playlistForm">
                    <p>Playlists will not show up until you've added a song!</p>
                    <label for="plname"><b>Playlist Name</b></label>
                    <input type="text" id="plname" name="plname" placeholder="Playlist Name"><br>
                    <label for="pldesc"><b>Playlist Description</b></label>
                    <textarea name="pldesc" id="pldesc" cols="30" rows="10" placeholder="Playlist Description"></textarea><br>
                    <!-- <input type="text" id="pldesc" name="pldesc" placeholder="Playlist Description"><br> -->
                    <button class="pl-form-create" id="createPlaylist" type="button" onclick="addPlaylist()">Create Playlist</button>
                    <button class="pl-form-close" type="button" onclick="closeCreateForm()">Close</button>
                </form>
            </div>`;

            document.getElementById('songsArrayHtml').innerHTML = songString;
            
            // Check if user is logged in
            if(user){
                // Fetches all the playlists and displays per song
                fetch(`http://localhost:1337/playlists?userId=${user.user_id}`, {
                method: "GET",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },

                }).then(response => {
                        return response.json()
                }).then(async data => {

                    // console.log('Success:', data);
                    var playlistsArray = data;
                    
                    let playlistString = "";
                    playlistsArray.forEach(playlistElement => {
                        playlistString += `
                            <button id="addSong" onclick="addSong('${user.user_id}', '${playlistElement.playlist_id}','${element.song_id}'), closePlaylistForm('${element.song_id}+1')">${playlistElement.playlist_name}</button>
                        `;
                    });

                    // Insert Playlist array into song popup
                    document.getElementById(`${element.song_id}`).innerHTML = playlistString; 
                });
            }

        }); 
}

// Gets and Displays song on search
async function getSongs(){
    document.getElementById('songInput').addEventListener('submit', (e) => {
    e.preventDefault();
    });
    const bpm = document.getElementById('songInputField').value;
    const limit = document.getElementById('limit').value

    const response = await fetch(`https://api.getsongbpm.com/tempo/?api_key=25e2888c19fbbe8050eaad782fd41e64&bpm=${bpm}&limit=${limit}`);
    const song = await response.json();

    var array = song.tempo;
    let user = JSON.parse(sessionStorage.getItem('user'));
    console.log(array); 

    let htmlString = "";
    array.forEach(element => {
            htmlString += 
              `<div class="musicContainer">
                    <div class="bg-img" id="bg-img" style="background-image: url(${element.album.img});"></div>
                    <div class="musicPlayer" id="${element.artist.id}">
                        <div class="img-container">
                            <img class="musicImg" src="${element.album.img}" alt="">
                        </div>
                        <div class="infoContainer">
                            <h2>${element.song_title}</h2>
                            <h3>${element.artist.name}</h3>
                        </div>
                        <div class="infoContainer2">
                            <h4>BPM</h4>
                            <p>${element.tempo}</p>
                        </div>
                        <button class="addButton" onclick="openPlaylistForm('${element.song_id}+1')">
                            <i class="fa-solid fa-plus fa-4x"></i>
                        </button>   
                    </div>

                    <div class="addSong-popup" id="${element.song_id}+1" style="display: none;">
                        <div class="addSong-container" id="addSong-container" style="filter: none;">
                            <div class="addSong-top">
                                <button type="button" class="createPl" style="cursor: pointer" onclick="openCreateForm()">Create Playlist <i class="fa-solid fa-plus"></i></button>
                                   <button type="button" class="closeBtn" onclick="closePlaylistForm('${element.song_id}+1')">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            <div class="addSong-bottom" id="${element.song_id}">
                                <h3 id="loggedIn">You are not logged in!</h3>
                            </div>
                        </div>
                    </div>
                </div>`;

            document.getElementById('songsArrayHtml').innerHTML = htmlString;

            if(user){
                // Fetches all the playlists and displays per song
                fetch(`http://localhost:1337/playlists?userId=${user.user_id}`, {
                method: "GET",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },

                }).then(response => {
                        return response.json()
                }).then(async data => {

                    console.log('Success:', data);
                    var playlistsArray = data;
                    
                    let playlistString = "";
                    playlistsArray.forEach(playlistElement => {
                        playlistString += `
                            <button id="addSong" onclick="addSong('${user.user_id}', '${playlistElement.playlist_id}','${element.song_id}'), closePlaylistForm('${element.song_id}+1')">${playlistElement.playlist_name}</button>
                        `;
                    });

                    // Insert Playlist array into song popup
                    document.getElementById(`${element.song_id}`).innerHTML = playlistString; 
                });
            }
             
        });
}

// Adds song to Database
async function addSong(userId, playlistId, songId){
    console.log(userId, playlistId, songId);
    
        fetch(`http://localhost:1337/playlist/song?userId=${userId}&playlistId=${playlistId}&songId=${songId}`, {
        mode: 'cors',
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        }).then(response => {
            return response
        }).then(async data => {
            console.log(data);
            addSongAni()
            setTimeout(removeSongAni, 1500);
            return data;
        }).catch(e => {
            console.log(e);
        });

        document.getElementById("addSong").addEventListener('submit', (e) => {
            e.preventDefault();
            addSong();
            console.log("added");
        });
        // alert("Score Added");
}

// Changes class to show animation when song is added
function addSongAni(){
    document.getElementById("songAddedMsg").className = 'addSongAnimation';
    // setTimeout(removeSongAni(), 5000);

    // setTimeout(removeSongAni(), 5000);
}

function removeSongAni(){
    // setTimeout(document.getElementById("songAddedMsg").className = 'songAddedMsg', 3000)
    document.getElementById("songAddedMsg").className = 'songAddedMsg';
}

// Open and Closes the Add Song to Playlist Pop Up
function openPlaylistForm(id) {
    document.getElementById(id).style.display = "block";
}

function closePlaylistForm(id) {
    document.getElementById(id).style.display = "none";
}

// Open and Closes the Create Playlist form
function openCreateForm() {
    document.getElementById("playlistFormContainer").style.display = "block";
}

function closeCreateForm() {
    document.getElementById("playlistFormContainer").style.display = "none";
}

// Adds Playlist to database
async function addPlaylist(){
    let user = JSON.parse(sessionStorage.getItem('user'));
    let playlistName = document.getElementById("plname").value;
    let playlistDesc = document.getElementById("pldesc").value;

    fetch(`http://localhost:1337/playlist`, {
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
        console.log(data);
        // getPlaylists();
        closeCreateForm();
    });

    document.getElementById('createPlaylist').addEventListener('submit', (e) => {e.preventDefault();}); 
}

// Changes the Login Tooltip to show who is logged in
function loginTooltip(){
    let loggedUser = JSON.parse(sessionStorage.getItem('user'))

    if(loggedUser){
        document.getElementById('loginTooltip').innerText = `Logged in as: ${loggedUser.username}`;
    };
}

loginTooltip();

// Clears the Search Bar
function clearInput(){
    var getValue= document.getElementById("songInputField");
      if (getValue.value !="") {
          getValue.value = "";
      }
}