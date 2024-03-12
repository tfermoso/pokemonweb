
var pokemon = {};
window.onload = () => {

    let menu = document.getElementById("barras-menu");

    menu.onclick = () => {

        if (document.getElementById("menu-movil").classList.contains("menu-movil")) {
            document.getElementById("menu-movil").classList.remove("menu-movil");
        } else {
            document.getElementById("menu-movil").classList.add("menu-movil");
        }
    }

    //Solicitar primeros pokemon
    let url = "https://pokeapi.co/api/v2/pokemon";
    //mostramos loading
    if (document.getElementById("loading"))
        document.getElementById("loading").style.display = "block"
    fetch(url)
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Network response was not ok');
            }
            return resp.json();
        })
        .then(data => {
            if (document.getElementById("loading"))
                document.getElementById("loading").style.display = "none";
            //console.log(data); // Aquí puedes trabajar con los datos de respuesta
            mostarDatosIniciales(data.results)
            for (const pk of data.results) {
                if (pokemon[pk.name] == undefined) {
                    pokemon[pk.name] = { url: pk.url }
                }
            }
            cargarDatosPokemon();

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
function fetchPokemonRetardada(url) {
    fetch(url)
    .then(resp => {
        if (!resp.ok) {
            throw new Error('Network response was not ok');
        }
        return resp.json();
    })
    .then(datos => {
        extractInfoPokemon(datos);
        
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}
function cargarDatosPokemon() {
    for (const pk in pokemon) {
      setTimeout(fetchPokemonRetardada,2000,pokemon[pk].url); 
    }
}

function extractInfoPokemon(info) {
    pokemon[info.name] = {
        img: info.sprites.front_default,
        types: info.types.map(t => t.type.name),
        id: info.id,
        experience: info.base_experience
    }
    let selector="#"+info.name +" img";
    document.querySelector(selector).src=info.sprites.front_default;
    selector="#"+info.name +" span";
    let textos=document.querySelectorAll(selector);
    textos[0].innerHTML=pokemon[info.name].types;
    textos[1].innerHTML=pokemon[info.name].id;
    textos[2].innerHTML=pokemon[info.name].experience;

}

function mostarDatosIniciales(listaPk) {
    var contenidoPK = "";
    for (const pk in listaPk) {
        if (Object.hasOwnProperty.call(listaPk, pk)) {
            const element = listaPk[pk];
            contenidoPK += `
            <article id="${element.name}">
                <h3>${element.name}</h3>
                <img src="img/loading.gif" alt="">
                <div>
                    <p><label>Types:</label><span></span></p>
                    <p><label>Id:</label><span></span></p>
                    <p><label>Experience</label><span></span></p> 
                </div>
            </article>`;
        }
    }
    document.getElementById("containerpk").innerHTML = contenidoPK;
}
