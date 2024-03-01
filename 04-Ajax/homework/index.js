const { log } = require("@11ty/eleventy/src/EleventyErrorHandler");

$(document).ready(function() {
    
const ULRBASE = "http://localhost:5000";

const button = document.getElementById('boton');
const search = document.getElementById('search');
const borrar = document.getElementById('delete');
const listaAmigos = document.querySelector("#lista");
const idAmigo =  document.querySelector('#amigo');
const searchInput = document.getElementById('input');
const deleteInput = document.getElementById('inputDelete') 
const borrado = document.querySelector('#success');

const createList = (friend) => {
    const li= document.createElement("li");
    li.innerHTML = friend.name;
    listaAmigos.appendChild(li);
}

const createListId = (friend) => {
    idAmigo.innerHTML = friend.name;
}

button.addEventListener('click', function(){
    $.get(`${ULRBASE}/amigos`, function(data) {
        listaAmigos.innerHTML = '';
        data.forEach(createList);
    })
});

search.addEventListener('click', function(){
    const friendId = searchInput.value;
    $.get(`${ULRBASE}/amigos/${friendId}`, function(data) {
        idAmigo.innerHTML = '';
       if (data) {
        createListId(data);
       }
    });
});


borrar.addEventListener('click', function(){
    const friendIdToDelete = deleteInput.value;
        $.ajax({
            url: `${ULRBASE}/amigos/${friendIdToDelete}`,
            type: "DELETE",
            success: function() {
                // Limpiar la lista de amigos y mostrar el mensaje de éxito
                listaAmigos.innerHTML = '';
                borrado.innerHTML = 'Tu amigo ha sido borrado';
            },
            error: function() {
                // Mostrar un mensaje de error si la solicitud DELETE falla
                borrado.innerHTML = 'Error al eliminar el amigo';
            }
        });
    });


});


