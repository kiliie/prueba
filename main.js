"use strict";
const listado = document.getElementById("listPoke");
const fragment = new DocumentFragment();
const tem = document.getElementById("template").content;

async function obtenerLista() {
  const resp = await axios
    .get("https://pokeapi.co/api/v2/pokemon")
    .then((response) => {
      const resultados = response.data.results;
      let poke = [];
      for (const i in resultados) {
        poke.push(resultados[i].url);
      }
      return poke;
    })
    .catch((error) => {
      console.log(error);
      return 0;
    });
  return resp;
}
const data = await obtenerLista();
const comprobar = "content" in document.createElement("template");
if (comprobar) {
  data.forEach((element) => {
    tem.querySelector("a").textContent = element;
    tem.querySelector("a").setAttribute("href", element);
    const miElemento = tem.cloneNode(true);
    fragment.appendChild(miElemento);
  });
} else {
  data.forEach((element) => {
    const li = document.createElement("li");
    //li.className = "list-group-item";
    li.classList.add("list-group-item");
    li.innerHTML = `<h3>${element}</h3>`;
    fragment.appendChild(li); //agregar o insertar un nuevo nodo hijo
  });
}

listado.appendChild(fragment);
