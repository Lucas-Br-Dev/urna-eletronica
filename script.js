let nome = document.querySelector('.nome');
let partido = document.querySelector('.partido');
let imgEle = document.querySelector('.candidato-foto img');
let orient = document.querySelector('.orientacoes');
let etapaAtual = "vereador"
let votoValido = false;
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
    if (numero.length === 5) {
        let vereador = vereadores.find(v => v.voto === numero.join(''));
        if (vereador) {
            votoValido = true;
            renderizarCandidato(vereador);
        }
    } else if (numero.length === 2) {
        console.log('é prefeitp')
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
});

document.querySelector('.confirmar').addEventListener('click', () => {
    let caixas = document.querySelectorAll(`.${etapaAtual} .caixa`);
    let todosPreenchido = Array.from(caixas).every(cx => cx.textContent.trim() !== '');
    if (todosPreenchido && votoValido) {
        etapas();
        votoValido = false;
    } else {
        document.querySelector('.caixas').style.display = "none"
        document.querySelector('.votoBranco').style.display = "block"
        document.querySelector('.votoBranco').innerHTML = "VOTO INVÁLIDO"
        setTimeout(() => {
            document.querySelector('.caixas').style.display = "flex"
            document.querySelector('.votoBranco').style.display = "none"
            document.querySelector('.votoBranco').innerHTML = "VOTO EM BRANCO"
        }, 2000)
    }
});

document.querySelector('.corrige')//AUQIIQIJIHIHIJAIJDIJASIDA

//executar assim que voto para vereador for confirmado
function etapas() {
    let vereador = document.querySelector('.vereador');
    let prefeito = document.querySelector('.prefeito');
    let estilo = window.getComputedStyle(vereador).display;
    
    nome.innerHTML = '';
    partido.innerHTML = '';
    imgEle.src = '';

    document.querySelector('.candidato-foto').style.display = "none"
    nome.style.display = "none"
    partido.style.display = "none"
    orient.style.display = "none"

    etapaAtual = "prefeito"
    vereador.style.display = "none";
    prefeito.style.display = "flex";
    document.querySelector(".etapas").innerHTML = "PREFEITO"
};