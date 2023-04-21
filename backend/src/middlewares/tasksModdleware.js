// verifica o corpo das requisições validando se existem valores vazio ou campos com nomes errados

const { response } = require("../app");

// valida o corpo da requisição, verifica se há algo que pode quebra o backend
const validateFieldTitle = (request, response, next) => {
    const { body } =  request; // recorta o body de dentro da requisição

    if(body.title == undefined) {
        // retorna uma mensagem de aviso caso o campo title seja undefined
        return response.status(400).json({message: "o campo 'title' é obrigatório!!!"});
    }
    if(body.title == '') {
        // retorna uma mensagem de aviso caso o campo title esteja vazio
        return response.status(400).json({message: "o campo 'title' não pode estar vazio"});
    }
    next(); // caso os ifs sejam cumpridos, é enviado ao próximo middleware
}

const validateFieldStatus = (request, response, next) => {
    const { body } = request; // recorta o body de dentro da requisição

    if(body.status == undefined) {
        // retorna uma mensagem de aviso caso o campo status seja undefined
        return response.status(400).json({message: "o campo 'status' é obrigatório!!!"});
    }
    if(body.status == '') {
        // retorna uma mensagem de aviso caso o campo status esteja vazio
        return response.status(400).json({message: "o campo 'status' não pode estar vazio"});
    }
    next(); // caso os ifs sejam cumpridos, é enviado ao próximo middleware
}
module.exports = {
   validateFieldTitle,
   validateFieldStatus
};