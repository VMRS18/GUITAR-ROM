const form=document.querySelector("form");
form.addEventListener("submit",function(e){
    e.preventDefault();
    buscar();
});


let canciones=[];
fetch("../json/canciones.json")
    .then(res=>res.json())
    .then(data=>{
        canciones=data;
    });


function buscar(){
    let tabla=document.querySelector(".tabla-resultados");
    tabla.style.display="table";
    let input=document.getElementById("input").value.toLowerCase().trim();
    let resultado=canciones.filter(cancion=>
        cancion.titulo.toLowerCase().includes(input) ||
        cancion.autor.toLowerCase().includes(input)
    );
    mostrarResultados(resultado);
}


function mostrarResultados(resultado){
    
    let tabla=document.querySelector("#tabla-resultados #tbody");
    tabla.innerHTML="";
    let contenedor=document.querySelector(".contenido_container");
    let tablaContainer=document.querySelector(".tabla-resultados");
    
    contenedor.style.display="none";
    
    tablaContainer.style.height="auto";
    
    if(resultado.length===0){
        tabla.innerHTML="<tr><td>No se encontraron resultados</td></tr>";
        return;
    }

    resultado.forEach(cancion => {
        let tr=document.createElement("tr");

        tr.innerHTML=`
            <td><img src="${cancion.foto_cancion}"> ${cancion.titulo} | ${cancion.autor}</td>
        `


        tr.onclick=function(){
            mostrarCancion(cancion);
        };

        tabla.appendChild(tr);
        
    });

}



function mostrarCancion(cancion){
    let tabla=document.querySelector("#tabla-resultados");
    tabla.style.display="none";
    tabla.style.height="0";

    let contenedor=document.querySelector(".contenido_container");
    contenedor.style.display="flex";
    contenedor.style.padding="20px";
    document.getElementById("titulo-cancion").textContent = cancion.titulo;
    document.getElementById("acordes-cancion").textContent = cancion.acordes;
    fetch(cancion.letra)
        .then(res=>res.text())
        .then(texto=>{
            document.getElementById("letra-cancion").textContent=texto;
        })
        .catch(error=>{
            console.error("Error cargando letra",error);
        });
    const AcordesArrays=cancion.acordes.split("-");
    function formatearAcorde(acorde) {
        return acorde
            .trim()
            .replace(/\//g, "_")
            .replace(/#/g, "sos");
    }
    const contenedorImgs = document.getElementById("acordes-imgs");
    contenedorImgs.innerHTML = "";

    AcordesArrays.forEach(acorde => {
        const nombreImg = formatearAcorde(acorde);

        const img = document.createElement("img");
        img.src = `../img/acordes/${nombreImg}.png`;
        img.alt = acorde.trim();
        img.title = acorde.trim();

        img.style.width = "80px";
        img.style.margin = "5px";

        contenedorImgs.appendChild(img);
    });
    let video=document.querySelector(".video_youtube");
    video.innerHTML=`
        <a id="a_video" href="${cancion.video_youtube}" target="_blank">Click aquí para escuchar en You Tube</a>
        <img id="video_y" class="video_y" src="${cancion.foto_cancion}">
    `;
    let video_tuto=document.querySelector(".video_tuto");
    video_tuto.innerHTML=`
        <h3>Video tutorial</h3>
        <a id="a_tuto" href="${cancion.video_tutorial}" target="_blank">Click aquí para ver el tutorial</a>
        <img id="video_t" class="video_t" src="${cancion.foto_tuto}">
    `;
}