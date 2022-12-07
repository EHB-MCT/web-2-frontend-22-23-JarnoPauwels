async function firstMood(id, title) { 
    // const id = document.getElementById('mood-slow').value;
    console.log(id);
    const response = await fetch(`https://api.getsongbpm.com/tempo/?api_key=25e2888c19fbbe8050eaad782fd41e64&bpm=${id}&limit=25`);
    const api = await response.json();
    console.log(api);
    
    var array = api.tempo;
    console.log(array);
    let htmlString = "";
    array.forEach(element => {
            htmlString += 
                 `      
                <div class="musicContainer">
                    <div class="bg-img" style="background-image: url(${element.album.img});"></div>
                    <div class="musicPlayer">
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
                        <button class="addButton" onclick="openForm()">
                            <i class="fa-solid fa-plus fa-4x"></i>
                        </button>

                        <div class="addSong-popup" id="addSong-popup">
                            <div class="addSong-container">
                                <div class="addSong-top">
                                    <p class="">Create Playlist <i class="fa-solid fa-plus"></i></p>
                                    <button type="button" class="closeBtn" onclick="closeForm()">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div class="addSong-bottom">
                                    <p>Playlist 1</p>
                                    <p>Playlist 1</p>
                                    <p>Playlist 1</p>
                                    <p>Playlist 1</p>
                                    <p>Playlist 1</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                        
            ` ;
            document.getElementById('dataContainer').innerHTML = htmlString; 
        });

        document.getElementById('single-mood-container').style.display = "block";
        document.getElementById('single-mood-container-home').style.display = "flex";
        document.getElementById('single-mood-container-text').style.display = "flex";
       
        document.getElementById('single-mood-title').innerHTML = `${title}`; 
        document.getElementById('single-mood-p').innerHTML = `${id} BPM`;

        window.scrollTo(0, 0);
}