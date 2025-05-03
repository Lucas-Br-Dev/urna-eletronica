let votoParaVereador;
let votoParaPrefeito;
let votoAtual;

let nome = document.querySelector('.nome');
let partido = document.querySelector('.partido');
let imgEle = document.querySelector('.candidato-foto img');
let orient = document.querySelector('.orientacoes');
let etapaAtual = "vereador";
let votoValido = false;
let votoBranco = false;

function renderButon(e) {
    let value = e.getAttribute('data-key');
    let caixas = document.querySelectorAll(`.${etapaAtual} .caixa`);

    for (let i in caixas) {
        if (caixas[i].innerHTML === '') {
            caixas[i].innerHTML = value;
            let todasPreenchida = Array.from(caixas).every(cx => cx.textContent.trim() !== '');

            if (todasPreenchida) {
                let numeroCandidato = [];
                caixas.forEach((item) => {
                    numeroCandidato.push(item.textContent)
                })
                pesquisarCandidato(numeroCandidato);
            } else {
                break;
            }
        }
    };
};

document.querySelectorAll('.botao').forEach((item) => {
    item.addEventListener('click', (e) => {
        return renderButon(e.target)
    })
});

function pesquisarCandidato(numero) {
    numero = numero.join('');
    if (numero.length === 5) {
        let vereador = vereadores.find(v => v.voto === numero);
        if (vereador) {
            votoValido = true;
            renderizarCandidato(vereador);
            votoAtual = numero;
        } else {
            verificarVoto();
        }
    } else if (numero.length === 2) {
        let prefeito = prefeitos.find(v => v.voto === numero);
        if (prefeito) {
            votoAtual = numero;
            votoValido = true;
            renderizarCandidato(prefeito);
        }
    }
};

function renderizarCandidato(candidato) {
    nome.innerHTML = candidato.nome;
    partido.innerHTML = candidato.partido;
    imgEle.src = candidato.src;

    document.querySelector('.candidato-foto').style.display = "flex"
    nome.style.display = "flex"
    partido.style.display = "flex"
    orient.style.display = "flex"
};

document.querySelector('.branco').addEventListener('click', () => {
    document.querySelector('.caixas').style.display = "none"
    document.querySelector('.votoBranco').style.display = "block"
    document.querySelector('.orientacoes').style.display = "flex"
    votoValido = true;
    votoBranco = true;
    votoAtual = "BRANCO";
});

document.querySelector('.corrige').addEventListener('click', () => {
    document.querySelectorAll(`.${etapaAtual} .caixa`).forEach((item) => {
        item.innerHTML = '';
    });
    votoAtual = undefined;

    nome.innerHTML = '';
    partido.innerHTML = '';
    imgEle.src = '';

    if (votoBranco === true) {
        document.querySelector('.caixas').style.display = "flex"
        document.querySelector('.votoBranco').style.display = "none"
        document.querySelector('.orientacoes').style.display = "none"
    };

    votoBranco = false;
    document.querySelector('.candidato-foto').style.display = "none"
    nome.style.display = "none"
    partido.style.display = "none"
    orient.style.display = "none"
});

document.querySelector('.confirmar').addEventListener('click', () => {
    verificarVoto();
});

function verificarVoto() {
    let caixas = document.querySelectorAll(`.${etapaAtual} .caixa`);
    let todosPreenchido = Array.from(caixas).every(cx => cx.textContent.trim() !== '');
    
    if ((todosPreenchido || votoBranco) && votoValido) {
        if (etapaAtual === "vereador") {
            votoParaVereador = votoAtual;
        } else if (etapaAtual === "prefeito") {
            votoParaPrefeito = votoAtual;
        };
        votoAtual = undefined;
        etapas();
        votoValido = false;
        votoBranco = false;
    } else {
        document.querySelector('.caixas').style.display = "none";
        document.querySelector('.votoBranco').style.display = "block";
        document.querySelector('.votoBranco').innerHTML = "VOTO INVÁLIDO";
        setTimeout(() => {
            document.querySelector('.caixas').style.display = "flex";
            document.querySelector('.votoBranco').style.display = "none";
            document.querySelector('.votoBranco').innerHTML = "VOTO EM BRANCO";
        }, 2500);
    };
    votosEfetuados();
};

function etapas() {
    let vereador = document.querySelector('.vereador');
    let prefeito = document.querySelector('.prefeito');

    nome.innerHTML = '';
    partido.innerHTML = '';
    imgEle.src = '';

    if (votoBranco === true) {
        document.querySelector('.caixas').style.display = "flex"
        document.querySelector('.votoBranco').style.display = "none"
        document.querySelector('.orientacoes').style.display = "none"
    };

    document.querySelector('.candidato-foto').style.display = "none"
    nome.style.display = "none"
    partido.style.display = "none"
    orient.style.display = "none"

    etapaAtual = "prefeito"
    vereador.style.display = "none";
    prefeito.style.display = "flex";
    document.querySelector(".etapas").innerHTML = "PREFEITO"
};

function votosEfetuados(){
    if (votoParaPrefeito !== undefined && votoParaVereador !== undefined) {
        validarVotos();
        votoParaPrefeito = undefined;
        votoParaVereador = undefined;
        votoAtual = undefined;
        document.querySelector('.informacoes').style.display = "none";
        document.querySelector('.fim').style.display = "flex";
    };
};

function validarVotos(){
    //Enviaria para o banco de dados ou ETC.
    let votoValidado = [
        {etapa:"VEREADOR", voto: votoParaVereador},
        {etapa:"PREFEITO", voto: votoParaPrefeito}
    ];
    console.log(votoValidado);
};
