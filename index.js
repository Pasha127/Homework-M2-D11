const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '71976e22femshc59a0991cc2347cp1afa84jsnf21821e7ac7a',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};

let query = null;

const loadTracks = (e) => {
    
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
    console.log(r);
   
    for(let i=0; i<r.data.length; i++){
        console.log(i)
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
    console.log("click");
}

const countTracks = function () {
    const pageCards = document.querySelectorAll(".card");
    if(pageCards.length>0){
        for(card of pageCards){
            
            console.log(card.querySelector(".card-title"))
        }
    }
}


window.onload = () => {
    const btns = document.querySelectorAll(".artistButton");
    for(btn of btns){
    btn.addEventListener("click", loadTracks);
    }
    const countTracksBtn = document.querySelector("#countTracksBtn");
    countTracksBtn.addEventListener("click", console.log(countTracks));
}