var titulo = document.getElementById("titulo").value;
var autor = document.getElementById("autor").value;
var genero = document.getElementById("genero").value;
var isbn = document.getElementById("isbn").value;


function validaTitulo(){
    var titulo = document.getElementById("titulo").value;    
    if(titulo !="" && titulo.length >= 3){
        document.getElementById("titulo").style.border = "2px solid green";    
        
    } else {
        document.getElementById("titulo").style.border = "2px solid red";
        alert("Digite um título para livro válido!")
            
    }
}

function validaAutor(){
    var autor = document.getElementById("autor").value;    
    if(autor !="" && autor.length >= 3){
        document.getElementById("autor").style.border = "2px solid green";               
        
    } else {
        document.getElementById("autor").style.border = "2px solid red";
        alert("Digite um nome de autor válido!")
             
    }
}

function validaGenero(){
    var genero = document.getElementById("genero").value;    
    if(isNaN(genero)|| genero !="" && genero.length >= 3){
        document.getElementById("genero").style.border = "2px solid green";               
        
    } else {
        document.getElementById("genero").style.border = "2px solid red";
        alert("Digite um tipo de genero válido!")
             
    }
}

function validaisbn(){
    var isbn = document.getElementById("isbn").value;    
    if(!isNaN(isbn) && isbn !="" && isbn.length >= 10 && isbn.length <=13){
        document.getElementById("isbn").style.border = "2px solid green";               
        
    } else {
        document.getElementById("isbn").style.border = "2px solid red";
        alert("Digite somente de 10 a 13 digitos!")
             
    }
}