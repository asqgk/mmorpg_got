function UsuariosDAO(connection){
    this._connection = connection();
};

UsuariosDAO.prototype.inserirUsuario = function(usuario){
    this._connection.open( function(err, mongoclient){  
        mongoclient.collection("usuarios", function(err, collection){
            collection.insert(usuario);

            mongoclient.close();
        })
    });    
}

UsuariosDAO.prototype.autenticar = function (usuario, req, res) {
    // console.log(usuario);
    this._connection.open( function(err, mongoclient){  
        mongoclient.collection("usuarios", function (err, collection) {
            // função find retorna um cursor, usando o toArray ele é colocado dentro de um array
            // toArray espera um callback
            collection.find(usuario).toArray(function (err, result) {
                // console.log(result);
                if (result[0] != undefined) {

                    req.session.autorizado = true;

                    req.session.usuario = result[0].usuario;
                    req.session.casa = result[0].casa;
                }

                if (req.session.autorizado) {
                    res.redirect("jogo")
                } else {
                    res.render("index", {validacao: {}, dadosForm: usuario})
                }
            });
            mongoclient.close();
        });
    });    
}

module.exports = function(){
    return UsuariosDAO;
}