const formAgenda = document.getElementById("form-agenda");
const inputData = document.getElementById("date-input");

formAgenda.addEventListener("submit", (event) => {
    event.preventDefault();  
    
    let barbeiro = document.querySelectorAll("input[name='opcao']");

    let barbeiroValue;
    for (let i = 0; i < barbeiro.length ; i++) {
        if (barbeiro[i].checked) {
            barbeiroValue = barbeiro[i].value;
            break;
        }
    }

    if (barbeiroValue && inputData.value !== "") {
        formAgenda.submit();
    } else {
        alert("verifique os campos!")
    }
})

function login() {
    let senha = document.getElementById("senha").value;

    fetch("/edsonbarber-agenda", {
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        body: "senha=" + encodeURIComponent(senha)
    })
    .then(response => response.json())
    .then(data => {
        if (data.sucess) {
            window.location.href = "/edsonbarber-agenda";
        } else {
            alert("Senha incorreta");
        }
    })
    .catch(error => {
        console.log("Erro ao enviar solicitação:", error);
    })
}

function escolherBarbeiroAgenda() {
    let barbeiro = document.querySelectorAll("input[name='opcao']");    
    let label = document.getElementsByClassName("label-agenda")

    let barbeiroValue;
    for (let i = 0; i < barbeiro.length ; i++) {
        if (barbeiro[i].checked) {
            barbeiroValue = barbeiro[i].value;
            break;
        }
    }

    for (let i = 0; i < label.length; i++) {
        switch (barbeiroValue) {
            case "Edson Araújo":
                label[0].style.border = "3px solid #ffbd59";
                label[1].style.border = "";
                label[2].style.border = "";   
                break;
            case "Edilson Araújo":
                label[0].style.border = "";
                label[1].style.border = "3px solid #ffbd59";
                label[2].style.border = "";
                break;
            case "Bruno Luiz":
                label[0].style.border = "";
                label[1].style.border = "";
                label[2].style.border = "3px solid #ffbd59";
                break;
        }
    }
}


function botaoAgenda() {
    let barbeiro = document.querySelectorAll("input[name='opcao']");  
    let inputData = document.getElementById("date-input");
    let agenda = document.getElementById("table-agenda");

    let barbeiroValue;
    for (let i = 0; i < barbeiro.length ; i++) {
        if (barbeiro[i].checked) {
            barbeiroValue = barbeiro[i].value;
            break;
        }
    }
    
    if (barbeiroValue && inputData.value !== "") {
        formAgenda.submit();
        agenda.style.display = "block";
    } else {
        botao = setAttribute.disabled
        alert("verifique os campos!")
    }
}

function excluir(event) {
    if (!confirm("Tem certeza que deseja excluir este registro na agenda?")){
        event.preventDefault();
    } 
}


function dataMax() {
    let data = new Date();
    data.setDate(data.getDate() + 60);
    let dataMaxima = data.toISOString().slice(0, 10);    
    document.getElementById("date-input").setAttribute("max", dataMaxima);
}


