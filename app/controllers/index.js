module.exports.index = function(application, req, res){
    res.render('index', {validacao: {}, dadosForm: {} });
}

module.exports.autenticar = function(application, req, res){
    
    var dadosForm = req.body;

    req.assert('usuario', 'O usuário não pode ser vazio').notEmpty();
    req.assert('senha', 'A senha não pode ser vazia').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render('index', {validacao: erros, dadosForm: dadosForm });
        return;
    }

    res.send('ok');
}