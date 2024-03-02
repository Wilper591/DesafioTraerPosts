/* Variables Globales */
let URL_BASE = "https://jsonplaceholder.typicode.com/posts";
btnAgregar = document.querySelector("#btnPost");
postData = document.querySelector("#post-data");
postBody = document.querySelector("body");
/* Evento que hace el llamado a la API y Crea boton de Reinicio */
btnAgregar.addEventListener("click", () => {
    /* Condición que evita que al apretar multiples veces boton agregar, se sigan agregando clases */
  if (!btnAgregar.classList.contains("bg-primary")) {
    btnAgregar.setAttribute("class", "bg-primary text-white");
    postBody.className += " bg-warning";
  }
  postList();
  btnReiniciar();
});
/* Función que crea y otorgo atributos al boton reiniciar, ademas evita duplicidad al hacer el llamado multiples veces */
const btnReiniciar = () => {
  if (!document.querySelector("#btnReinicio")) {
    let btnReiniciar = document.createElement("button");
    let btnTexto = document.createTextNode("Reiniciar");
    btnReiniciar.appendChild(btnTexto);
    btnReiniciar.setAttribute("id", "btnReinicio");
    btnReiniciar.setAttribute("class", "bg-primary text-white");
    let insertarBtn = document.querySelector("#post-data");
    document.body.insertBefore(btnReiniciar, insertarBtn);
    btnReiniciar = document.querySelector("#btnReinicio");
    btnReiniciar.addEventListener("click", () => {
      location.reload(true);
    });
  }
};

/* Función para insertar consulta de la API en el HTML */
const postList = async () => {
  /* Se reciben los datos de la API en forma de objeto*/
  const response = await getPost();

  /* Se formatea el objeto para obtener title y body */
  let datosPost = response.map((post) => {
    return { titulo: post.title, texto: post.body };
  });

  /* Se crea la variable donde se insertaran los datos obtenidos de la API */
  let postLista = "";

  /* Se aplica un foreach para recorrer el objeto e insertarlo en la variable postLista */
  datosPost.forEach((info) => {
    postLista += `
        <ul class="m-4">
            <li class="fw-bold bg-info text-capitalize p-1">${info.titulo}</li>
            <p class="bg-danger text-white text-capitalize p-1">${info.texto}</p>
        </ul>`;
    postData.innerHTML = postLista;
  });
};

/* Función que consulta a la API */
const getPost = async () => {
  try {
    const response = await fetch(`${URL_BASE}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Ha ocurrido un error: ", error);
  }
};
