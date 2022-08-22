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
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`, options)
        .then(response => response.json())
        .then(response => makeCards(response))
        .catch(err => console.error(err));    
}
const makeCards = function (r) {
    console.log(r);
    const oldCards = document.querySelectorAll(".card");
    if(oldCards.length>0){
        for(card of oldCards){
            card.remove();
            console.log("card erased");
        }
    }
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



window.onload = () => {
    const btns = document.querySelectorAll("button");
    for(btn of btns){
    btn.addEventListener("click", loadTracks);
    }
}