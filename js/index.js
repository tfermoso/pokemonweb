window.onload=()=>{

    let menu=document.getElementById("barras-menu");

    menu.onclick=()=>{
        
        if(document.getElementById("menu-movil").classList.contains("menu-movil")){
            document.getElementById("menu-movil").classList.remove("menu-movil");
        }else{
            document.getElementById("menu-movil").classList.add("menu-movil");
        }
    }
}