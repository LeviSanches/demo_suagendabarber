const agenda = require('../models/Agenda');

const getAll = async (req, res) => {
    let barbeiro = req.body.opcao;
    let data = req.body.data;
    try {
        const query = await agenda.findAll({
            attributes: ['nome', 'hora', 'servico', 'telefone', 'id'],
            where: {
                barbeiro: barbeiro,
                data: data
            },
            order: [['hora', 'ASC']]
        })
        const dados = query.map((item) => {
            item.telefone = item.telefone.replace(/\D/g, "");
            return item.toJSON();
        });  
        res.status(200).render('edsonbarber-agenda', {dados});
    } catch (error) {
        res.status(500).json({message: `Erro ao consultar os horários, erro: ${error}`});
    }
}

const remove = async (req, res) => {
    let id = req.params.id;
    try {
        await agenda.destroy({
            where: { 'id': id }
        })
        await res.status(200).redirect('/edsonbarber-agenda');
    } catch (error) {
        res.status(500).json({message: `Erro ao excluir um horário, erro: ${error}`});
    }
}




module.exports = {
    getAll,
    remove
}
