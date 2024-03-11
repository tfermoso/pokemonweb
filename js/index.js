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
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            console.log(data); // Aquí puedes trabajar con los datos de respuesta
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}