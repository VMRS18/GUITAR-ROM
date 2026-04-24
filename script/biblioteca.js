document.addEventListener("DOMContentLoaded", () => {
    const galeria = document.getElementById("galeria");

    const modal = document.getElementById("modal");
    const imgAmpliada = document.getElementById("imagenAmpliada");
    const cerrar = document.getElementById("cerrarModal");

    galeria.addEventListener("click", e => {
        if (e.target.tagName === "IMG") {
            imgAmpliada.src = e.target.src;
            modal.style.display = "flex";
        }
    });

    cerrar.onclick = () => modal.style.display = "none";
    modal.onclick = e => { 
        if (e.target === modal) modal.style.display = "none"; 
    };
});
