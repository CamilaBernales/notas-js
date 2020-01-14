class Nota {

    constructor(titulo, contenido, fecha, id, categoria) {
        this.titulo = titulo;
        this.contenido = contenido;
        this.fecha = fecha;
        this.id = id;
        this.categoria = categoria;

    }


    set setTitulo(titulo) {
        this.titulo = titulo;
    }

    get getTitulo() {
        return this.titulo;
    }
    set setContenido(contenido) {
        this.contenido = contenido;
    }
    get getContenido() {
        return this.contenido;
    }
    set setId(id) {
        this.id = id;
    }
    get getId() {
        return this.id;
    }

    set setCategoria(categoria) {
        this.categoria = categoria;
    }
    get getCategoria() {
        return this.categoria;
    }
}

class Categoria {

    constructor(nombre) {
        this.nombre = nombre;
    }

    set setNombre(nombre) {
        this.nombre = nombre;
    }

    get getNombre() {
        return + this.nombre;
    }
}


function crearCategoria() {


    let nombre = document.getElementById('categoria');
    let arrayCategorias = [];

    if (nombre != "") {

        let categoria = new Categoria(

            nombre.value
        );

        let categ = traerCategoria();
        categ.push(categoria);
        localStorage.setItem('categorias', JSON.stringify(categ));
    }


}
function listarCategorias(){

    let categ = JSON.parse(localStorage.getItem('categorias'));
    
    let opcion ="";
    console.log(categ.length)

    
    for ( let i = 0 ; i< categ.length; i++){
        
        let categoria = categ[i];
        
        opcion += '<option>' + categoria.nombre + '</option>' ;
        console.log(opcion)
    }

    document.getElementById('ListadoCateg').innerHTML = opcion; 


}
function traerCategoria() {
    let categ = JSON.parse(localStorage.getItem('categorias'));
    if (categ) {
        return categ;
    } else {
        return [];
    }
}

function crearNota() {


    let titulo = document.getElementById('titulo');
    let contenido = document.getElementById('contenido');
    let categoria = document.getElementById('ListadoCateg');


    if (titulo.value != "" && contenido.value != "") {

        let notitas = traerNotitas();
        
        let identificador = new Date();

        let nota = new Nota(
            titulo.value,
            contenido.value,
            fecha = new Date(),
            id = identificador.valueOf(),
            categoria.value


        );


        notitas.push(nota);
        //notitas.push(catergorias);
        localStorage.setItem('notitas', JSON.stringify(notitas));
        //console.log(nota.fecha);

        titulo.value = "";
        contenido.value = "";

        listarNotitas();
    }


}

function traerNotitas() {
    let notitas = JSON.parse(localStorage.getItem('notitas'));
    if (notitas) {
        return notitas;
    } else {
        return [];
    }
}


function listarNotitas(agenda = null) {

    if (agenda == null) {


        agenda = JSON.parse(localStorage.getItem('notitas'))
    }
    else {

    }
    //console.log(texto);
    let res = document.querySelector('#res');
    res.innerHTML = '';
    

    for (let item of agenda) {
        //console.log(item.fecha);
        res.innerHTML += ' <tr ><td><button type="button" class="btn btn-primary" data-toggle="collapse" href="#id' + item.id + '">Expandir</button></td> <td > ' + item.titulo + '</td><td>' + item.categoria + '</td></tr>';

        res.innerHTML += '<div > <tr class="collapse" id="id' + item.id + '"> <td >  ' + ' </td> <td>' + item.contenido + '<br>' + item.fecha + '<br>' + item.id + '</td> <td>' + ' <button  type="button" class="btn btn-danger btn-sm" onclick="eliminarNota()">Eliminar</button>' +
            ' <button type="button" class="btn btn-warning  mr-1" data-toggle="modal" data-target="#editarNotas" onclick="cargarFormulario(\'' + item.id + '\')">Editar</button></td></tr> </div>';


    }

}

function eliminarNota() {
    if (confirm('¿Esta seguro que desea borrar esta nota?')) {
        let notitas = traerNotitas();
        let index = notitas.findIndex(nota => nota.id == notitas.id);
        notitas.splice(index, 1);
        localStorage.setItem('notitas', JSON.stringify(notitas));
        alert('nota eliminada');

        listarNotitas();

    }
}

function cargarFormulario(id) {
    let notitas = traerNotitas();
    let nota = notitas.find(c => c.id == id);

    document.getElementById('titulo-modal').value = nota.titulo;
    document.getElementById('contenido-modal').value = nota.contenido;
    let button = "";
    button += ' <button type="button" class="btn btn-secondary" data-dismiss="modal">cancelar</button>';
    button += '<button type="button" class="btn btn-primary" data-dismiss ="modal" onclick="editarNota(\'' + id + '\' )">Modificar</button>';
    document.getElementById("botonesModificar").innerHTML = button;

}




function editarNota(id) {


    let nuevoContenido = document.getElementById('contenido-modal');

    if (nuevoContenido != '') {
        let notitas = traerNotitas();
        let index = notitas.findIndex(nota => nota.id == id);
        notitas[index].contenido = nuevoContenido.value;
        notitas[index].fecha = new Date();
        localStorage.setItem("notitas", JSON.stringify(notitas));
        alert('nota guardada');
        $('#editarNotaModal').modal('toggle');
        listarNotitas();
    }

}



function buscarNota() {


    event.preventDefault();


    // let res = document.querySelector('#res');
    let texto = document.getElementById("buscadorTexto").value;


    if (texto != "") {


        let notitas = traerNotitas();
        let notasFiltradas = notitas.filter(notita => notita.titulo == texto);
        console.log(notasFiltradas);
        listarNotitas(notasFiltradas)

    } else {
        console.log("Campo vacio");

    }

}

