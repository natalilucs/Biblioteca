const express = require("express"); 
const mongoose = require("mongoose"); 

const app = express(); 
const port = 8000; 

mongoose.connect("mongodb+srv://natali_lucas:natali_lucas@cluster0.pk7gr.mongodb.net/biblioteca?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology:true}) //7 conectando o banco de dados, use... evita a depreciação do mongoose, são chamadas de flag e agem igual ao meta do html

const Livros = mongoose.model("Livros", {
    titulo: String,
    autor: String,
    genero: String,   
    isbn: String,
     
});

app.set("view engine", "ejs");
app.set("views", __dirname, "/views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => { 
    res.send("Página inicial");
});

// app.get("/", (req, res) => {
//     res.sendFile(__dirname+"/src/index.html");    
// });

app.get("/cadastroLivros", (req, res)=>{
    res.render("cadastro_Livros")
});

app.post("/cadastroLivros" , (req, res)=>{
    let livro = new Livros(); 

    livro.titulo = req.body.titulo; 
    livro.autor = req.body.autor; 
    livro.genero = req.body.genero;
    livro.isbn = req.body.isbn;
    
    
    livro.save((err) =>{
        if(err)
            return res.status(500).send("Erro ao cadastrar livro")
        res.redirect("/livros");

    });
})

app.get("/livros", (req, res)=>{ 
    let consulta = Livros.find({}, (err, livro)=>{ 
        //console.log(consulta);
        if(err)
            return res.status(500).send("Erro ao consultar livro")
        res.render("livros", {livros_itens:livro});
    })     
});

// app.post("/livros", (req, res)=>{ 
//     let consulta = req.body.busca;
//     Livros.find({consulta}, (req, res)=>{ 
//         //console.log(consulta);
//         if(err)
//             return res.status(500).send("Erro ao consultar livro");
//         res.render("livros", {livros_itens:livro});

//         if(err)
// 			return res.status(500).send("Erro ao consultar livro");
// 		livro.titulo = req.body.titulo;
// 		livro.autor = req.body.autor;
// 		livro.genero = req.body.genero;
//         livro.isbn = req.body.isbn;
//     });
// });


app.get("/deletarLivro/:id", (req,res)=>{ 
    var chave = req.params.id;
    Livros.deleteOne({_id:chave}, (err, result)=>{ 
        if(err)
            return res.status(500).send("Erro ao excluir registro");
        res.redirect("/livros")
    });
});


app.get("/editarLivro/:id", (req,res)=>{
    var id = req.params.id;
	Livros.findById(id, (err, livro)=>{
		if(err)
			return res.status(500).send("Erro ao consultar livro");
		res.render("editar_Livro",{livro_item:livro});
	});
});

app.post("/editarLivro", (req,res)=>{
	var id = req.body.id;
	Livros.findById(id,(err, livro)=>{
		if(err)
			return res.status(500).send("Erro ao consultar livro");
		livro.titulo = req.body.titulo;
		livro.autor = req.body.autor;
		livro.genero = req.body.genero;
        livro.isbn = req.body.isbn;

		livro.save(err =>{
			if(err)
				return res.status(500).send("Erro ao editar livro");
			return res.redirect("/livros");
			
		});
	});
});


app.listen(port, ()=> {
    console.log("Servidor rodando na porta " + port);
});
