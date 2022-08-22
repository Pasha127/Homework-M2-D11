let trackDisplayArray = [];
let albumDisplayArray = [];
const modal = document.querySelector("#myModal");
const modalHeader = modal.querySelector("#myModalLabel");
const modalBody = modal.querySelector(".modal-body");
const btns = document.querySelectorAll(".artistButton");


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '71976e22femshc59a0991cc2347cp1afa84jsnf21821e7ac7a',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};

let query = null;

const loadTracks = (e) => {
    albumCount = 0;
    trackCount = 0;
    query= e.target.innerText;
    if(query === "View All"){
        const oldCards = document.querySelectorAll(".card");
        if(oldCards.length>0){
            for(card of oldCards){
                card.remove();
                console.log("cards erased");
            }
        }

        fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=Pink Floyd}`, options)
        .then(response => response.json())
        .then(response => makeCards(response))
        .catch(err => console.error(err)); 
        fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=Daft Punk`, options)
        .then(response => response.json())
        .then(response => makeCards(response))
        .catch(err => console.error(err)); 
        fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=Metallica`, options)
        .then(response => response.json())
        .then(response => makeCards(response))
        .catch(err => console.error(err)); 
        
    }else{
        const oldCards = document.querySelectorAll(".card");
        if(oldCards.length>0){
            for(card of oldCards){
                card.remove();
                console.log("card erased");
            }
        }

    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`, options)
        .then(response => response.json())
        .then(response => makeCards(response))
        .catch(err => console.error(err)); 
    }   
}
const makeCards = function (r) {
    //console.log(r);
   
    for(let i=0; i<r.data.length; i++){
        
        const newCard = document.createElement("div");
        newCard.innerHTML = `<div class="card" style="width: 18rem;">
        <img src="${r.data[i].album.cover}" class="card-img-top" alt="album art">
        <div class="card-body">
        <h5 class="card-title"> ${r.data[i].title}</h5>      
        <h6> Duration: ${r.data[i].duration}</h6>      
        </div>
        </div>`;
        document.querySelector(".row").append(newCard);
    }
    countAlbums(r); 
    countTracks(r); 
    
}
//const pageCards = document.querySelectorAll(".card");



const showAlbumCount = function (){
    modalHeader.innerText = `There are ${albumDisplayArray.length} albums.`;
    modalBody.innerText = albumDisplayArray;
    console.log(albumDisplayArray);
    console.log(`There are ${albumDisplayArray.length} albums.`);
}
    const showTrackCount = function (){
    modalHeader.innerText = `There are ${trackDisplayArray.length} tracks.`;
    modalBody.innerText = trackDisplayArray;
    console.log(trackDisplayArray);
    console.log(`There are ${trackDisplayArray.length} tracks.`);
}

const countAlbums = function (d) {
    
    let albumArray = [];
    albumDisplayArray.push(d.data[0].album.title);
    for(let i=0; i<d.data.length; i++){
        const album = d.data[i].album.title;        
        if(albumArray.length>0){
            for(j=0; j<albumArray.length; j++){
                if(albumArray[j] === album){
                    break;
                }else if(j===albumArray.length-1){                    
                    albumDisplayArray.push(album);
                                       
                }
            }
        }
        albumArray.push(album);

    }
    //console.log(albumCount,"total albums");
}
const countTracks = function (d) {
    
    let trackArray = [];
    trackDisplayArray.push(d.data[0].title);
    for(let i=0; i<d.data.length; i++){
        const title = d.data[i].title;
        if(trackArray.length>0){
            for(j=0; j<trackArray.length; j++){
                if(trackArray[j] === title){
                    break;
                }else if(j=== trackArray.length-1){                    
                    trackDisplayArray.push(title);                   
                }
            }
        }
        trackArray.push(title);

    }
    //console.log(trackCount,"total tracks");
}


window.onload = () => {
    
    for(btn of btns){
    btn.addEventListener("click", loadTracks);
    }
    const countAlbumsBtn = document.querySelector("#countAlbumsBtn");
    countAlbumsBtn.addEventListener("click", showAlbumCount);
    const countTracksBtn = document.querySelector("#countTracksBtn");
    countTracksBtn.addEventListener("click", showTrackCount);
}