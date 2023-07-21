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
        const dados = query.map((item) => {
            item.hora
        })
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

        /*
        if (barber === "Edson Araújo") {
          const messageClient = {
              'number': `${tel}`,
              'message': `Olá *${formattedName}*, o seu horário foi agendado com sucesso! ✅\n\n⏰ Horário: *${hour}h*\n📆 Data: *${formattedDate}*\n💈 Serviço: *${service}*\n👨‍💼 Barbeiro: *${barber}*\n\n⚠ É muito importante para nós, barbeiros, que os clientes cheguem com antecedência ao horário marcado. Isso nos permite trabalhar da melhor forma possível.\n\nCOMPROVANTE ☑`
          }; 
          const messageOwner = {
              'number': '5575991458542',
              'message': `📣 Você tem um novo agendamento!\n\n💇‍♂️ Cliente: *${formattedName}*\n📆 Data: *${formattedDate}*\n⏰ Horário: *${hour}h*\n💈Serviço: *${service}*`
          }
          const responseClient = await axios.post("https://whatsapp.siseven.com.br/send-edsonbarber", messageClient)
          const statusClient = responseClient.status;
          if (statusClient !== 200) {
              throw new Error("Erro na requisição HTTP, cod: " + statusClient);
          }         
          const responseOwner = await axios.post("https://whatsapp.siseven.com.br/send-edsonbarber", messageOwner)
          const statusOwner = responseOwner.status;
          if (statusOwner !== 200) {
              throw new Error("Erro na requisição HTTP, cod: " + statusOwner);
          }         
          }else if (barber === "Edilson Araújo") {
          const messageClient = {
              'number': `${tel}`,
              'message': `Olá *${formattedName}*, o seu horário foi agendado com sucesso! ✅\n\n⏰ Horário: *${hour}h*\n📆 Data: *${formattedDate}*\n💈 Serviço: *${service}*\n👨‍💼 Barbeiro: *${barber}*\n\n⚠ É muito importante para nós, barbeiros, que os clientes cheguem com antecedência ao horário marcado. Isso nos permite trabalhar da melhor forma possível.\n\nCOMPROVANTE ☑`
          }; 
          const messageOwner = {
              'number': '75983185932',
              'message': `📣 Você tem um novo agendamento!\n\n💇‍♂️ Cliente: *${formattedName}*\n📆 Data: *${formattedDate}*\n⏰ Horário: *${hour}h*\n💈Serviço: *${service}*`
          }
          const responseClient = await axios.post("https://bot.siseven.com.br/send", messageClient)
          const statusClient = responseClient.status;
          if (statusClient !== 200) {
              throw new Error("Erro na requisição HTTP, cod: " + statusClient);
          }         
          const responseOwner = await axios.post("https://bot.siseven.com.br/send", messageOwner)
          const statusOwner = responseOwner.status;
          if (statusOwner !== 200) {
              throw new Error("Erro na requisição HTTP, cod: " + statusOwner);
          }         
        }
        else {
          const messageClient = {
              'number': `${tel}`,
              'message': `Olá *${formattedName}*, o seu horário foi agendado com sucesso! ✅\n\n⏰ Horário: *${hour}h*\n📆 Data: *${formattedDate}*\n💈 Serviço: *${service}*\n👨‍💼 Barbeiro: *${barber}*\n\n⚠ É muito importante para nós, barbeiros, que os clientes cheguem com antecedência ao horário marcado. Isso nos permite trabalhar da melhor forma possível.\n\nCOMPROVANTE ☑`
          }; 
          const messageOwner = {
              'number': '75981817339',
              'message': `📣 Você tem um novo agendamento!\n\n💇‍♂️ Cliente: *${formattedName}*\n📆 Data: *${formattedDate}*\n⏰ Horário: *${hour}h*\n💈Serviço: *${service}*`
          }
          const responseClient = await axios.post("https://whatsapp.siseven.com.br/send-edsonbarber", messageClient)
          const statusClient = responseClient.status;
          if (statusClient !== 200) {
          throw new Error("Erro na requisição HTTP, cod: " + statusClient);
          }        
          const responseOwner = await axios.post("https://whatsapp.siseven.com.br/send-edsonbarber", messageOwner)
          const statusOwner = responseOwner.status;
          if (statusOwner !== 200) {
              throw new Error("Erro na requisição HTTP, cod: "+ statusOwner);
          }         
        }  */      

    } catch (error) {
        res.status(500).json({message: `Erro ao realizar um agendamento: ${error}`})
    }
}



module.exports = {
    getAll,
    remove,
    exibirHorariosAgendados,
    agendar
}
