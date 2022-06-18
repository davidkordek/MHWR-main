const monsters = [];
fetch("http://localhost:4567/")
    .then(response => {return response.json()})
    .then(data => data.forEach(element => monsters.push(element)))
    .catch(err => console.log(err));


const rootElement = document.getElementById("root");

const getData = () => {
    fetch("https://mhw-db.com/monsters")
    .then(response => response.json())
    .then(data => {
        const monsterContainer = createMonsterContainer();

        data.forEach(monster => {
        const monsterNode = createMonster(monster);
        monsterContainer.appendChild(monsterNode);
    });
    rootElement.appendChild(monsterContainer);
    
    });
};

const createMonsterContainer = () => {
    const container = document.createElement("div");
    container.classList.add("monsters-container");
    
    return container;
};

const findMonsterUrl = (monsterName) => {
    let url = "kirin.jpg";
    //linear search the monster list to find the specific image url needed for the monster
    monsters.forEach(element => {
        if(element.name === undefined){
            return;
        }
        
        let x = element.name.split(' ').join('').split('-').join('').split("'").join('').toLowerCase();
        if(x === monsterName){
            url = element.url;
            
        }
        
    });
    return url;
};

const printArray = (array) => {
    let weaknesses = document.createElement("div");
    weaknesses.classList.add("weaknesses");
    for (let index = 0; index < array.length; index++) {
        url="";
        stars="";
        //console.log(array[index].element +" "+ array[index].stars);
        switch(array[index].element.toLowerCase()) {
            case "fire": url = "./pics/fire.png";          break;
            case "thunder":url = "./pics/thunder.png";     break;
            case "ice":url = "./pics/ice.png";             break;
            case "dragon":url = "./pics/dragon.png";       break;
            case "water":url = "./pics/water.png";         break;
            case "poison":url = "./pics/poison.png";       break;
            case "blast":url = "./pics/blast.png";         break;
            case "paralysis":url = "./pics/paralysis.png"; break;
            case "stun":url = "./pics/stun.png";           break;
            case "sleep":url = "./pics/sleep.png";         break;
            default:break;
        }
        switch(array[index].stars) {
            case 1: stars="⭐";break;
            case 2:stars="⭐⭐";break;
            case 3:stars="⭐⭐⭐";break;
            default:"";break;
        }
        let p = document.createElement("p");
        p.textContent = stars;
        p.style.fontSize="10px";

        let img = document.createElement("img");
        img.classList.add("weakness-image");
        img.src=url;
        
        let weakness = document.createElement("div");
        weakness.classList.add("weakness");
        
        weakness.appendChild(img);
        weakness.appendChild(p);
        weaknesses.appendChild(weakness);
    }
    return weaknesses;
};


const createMonster = (monsterData) => {
    let monsterName = monsterData.name.split(' ').join('').split('-').join('').split("'").join('').toLowerCase();
    
    const image = document.createElement("img");
    image.classList.add("monster-image");
    
    //imageUrl = `./pics/${monsterName}.jpg`;
    imageUrl = findMonsterUrl(monsterName);
    image.src = imageUrl;
    
    const link = document.createElement("a");
    const monster = document.createElement("div");
    monster.classList.add("monster");
    link.href = `/monster/${monsterName}`;
    
    const header = document.createElement("h2");
    header.classList.add("monster-header");
    header.textContent = monsterData.name;

    // const paragraph = document.createElement("p");
    // paragraph.classList.add("monster-description");
    // paragraph.textContent = monsterData.description;

    //const weakness = document.createElement("p");
    let title = document.createElement("h3");
    title.textContent = "Weaknesses:";
    let weaknesses = printArray(monsterData.weaknesses);
    
    monster.appendChild(header);
    //monster.appendChild(paragraph);
    monster.appendChild(image);
    monster.appendChild(title);
    monster.appendChild(weaknesses);
    link.appendChild(monster);
    //console.log("description: '"+monsterData.description+"'\nid: '"+monsterData.id+"'\nname: '"+monsterData.name+"'\nspecies: '"+monsterData.species+"'\ntype: '"+monsterData.type+"'");
    //container.appendChild(weakness);
    return link;
}
searchInput = document.querySelector('input');

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    let names = document.getElementsByClassName("monster-header");
    var divs = document.getElementsByClassName("monster");

    for(var i = 0; i < names.length; i++){
        let name = names[i].textContent.toLowerCase();
        const isVisible = name.includes(value);
        if(divs[i].classList.toggle("hide",!isVisible)){
            divs[i].style.display = "none";
        }else{''
            divs[i].style.display = "inline-block";
        }
    
    }
});



getData();
