const express = require("express");
const app = express();
const router = require('./router');
const handlebars = require("express-handlebars");
const agenda = require("./models/Agenda");
const agendaController = require('./controller/agendaController');
const axios = require("axios");
const port = process.env.PORT || 4003;

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(router);
app.use(express.static("public"));
app.engine("handlebars", handlebars({defaultLayout: "principal"}));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {  
    res.render("edsonbarber-index")
});

app.get("/edsonbarber-agendado", (req, res) => {
  res.sendFile(__dirname + "/views/edsonbarber-agendado.html")
});

//exibe os horários já agendados
app.get('/horarios-cadastrados/:data/:barbeiro', (req, res) => {
  const data = req.params.data; 
  const barbeiro = req.params.barbeiro;    
  agenda.findAll({ 
    where: { data, barbeiro } 
    }).then(agendamentos => {
      const horariosCadastrados = agendamentos.map(agendamento => agendamento.hora);
      res.send(horariosCadastrados);
    })
    .catch(erro => {
      res.send('Houve um erro: ' + erro);
    });
});

//realiza um agendamento
app.post("/edsonbarber-agendado", async (req, res) => {
    const name = req.body.nome;
    const tel = req.body.telefone;
    const barber = req.body.opcao;
    const service = req.body.servico;
    const date = req.body.data;
    const hour = req.body.horario;    
    
    try {
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
        
        res.redirect("/edsonbarber-agendado");
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
        console.log("Erro: ", error.message);
        res.send("Houve um erro ao realizar o agendamento: " + error);
    }
});

app.listen(port, () => {
  console.log("Servidor rodando na porta: " + port )
});
