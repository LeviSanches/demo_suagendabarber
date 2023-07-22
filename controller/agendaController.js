const agenda = require('../models/Agenda');

const getAll = (req, res) => {    
    try {
        agenda.findAll({
            attributes: ["nome", "hora", "servico", "id", "telefone"],
            where: {
              barbeiro: req.body.opcao,
              data: req.body.data
            },
            order: [
              ["hora", "ASC"]
            ]
        })
        .then(tabela => {
        const dados = tabela.map(item => {              
            item.telefone = item.telefone.replace(/\D/g, '');
            return item.toJSON();
        });
        res.render("edsonbarber-agenda", {dados});
        }).catch(erro => {
        console.log("ocorreu um erro:", erro)
        })
    } catch (error) {
        res.status(500).json({message: `Erro ao consultar os horários, erro: ${error}`});
    }    
}

const remove = async (req, res) => {
    let idCliente = req.params.id;
    try {
        await agenda.destroy({
            where: {id: idCliente}
        })
        res.status(200).json({mensagem: `dados deletados com sucesso! ou não...`})
    } catch (error) {
        res.status(500).json({message: `Erro ao deletar o horário agendado: ${error}`})
    }
}

const exibirHorariosAgendados = async (req, res) => {
    try {
        let data = req.params.data;
        let barbeiro = req.params.barbeiro;
        const query = await agenda.findAll({
            where: {
                data,
                barbeiro
            }
        })
        const dados = query.map(item => item.hora);        
        res.status(200).send(dados);
    } catch (error) {
        res.status(500).json({message: `Erro ao consultar os horários agendados: ${error}`})
    }    
}

const agendar = async (req, res) => {
    try {
        const name = req.body.nome;
        const tel = req.body.telefone;
        const barber = req.body.opcao;
        const service = req.body.servico;
        const date = req.body.data;
        const hour = req.body.horario;   
        let dateParts = date.split('-');
        let formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;  
        let formattedName = name.trim();

        await agenda.create({
            nome: name,
            telefone: tel,
            barbeiro: barber,
            servico: service,
            data: date,
            hora: hour,
        });
        res.status(200).redirect("/agendado");       
    } catch (error) {
        res.status(500).json({message: `Erro ao realizar um agendamento: ${error}`})
    }
}



module.exports = {
    getAll,
    remove,
    exibirHorariosAgendados,
    agendar,
}
