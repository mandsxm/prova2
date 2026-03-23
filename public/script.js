class ComponenteMonitor {
    constructor(idElemento) {
        this.card = document.getElementById(`card-${idElemento}`);
        this.valorDisplay = document.getElementById(idElemento);
        
        if (!this.card || !this.valorDisplay) {
            console.error(`Erro: Elementos para '${idElemento}' não encontrados.`);
        }
    }
}

class CardHardware extends ComponenteMonitor {
    constructor(idElemento) {
        super(idElemento);
    }

    atualizarInterface(valor, tipo) {
        if (!this.card) return;

        this.valorDisplay.innerText = valor;

        const valorNumerico = parseFloat(valor);
        let emAlerta = false;

        if (tipo === 'temperatura' && valorNumerico > 75) {
            emAlerta = true;
        } else if (tipo === 'cpu' && valorNumerico > 90) {
            emAlerta = true;
        }

        if (emAlerta) {
            this.card.classList.add('alerta-critico');
        } else {
            this.card.classList.remove('alerta-critico');
        }
    }
}

const monitorCPU = new CardHardware('cpu');
const monitorRAM = new CardHardware('ram');
const monitorTemp = new CardHardware('temp');

async function buscarDadosDoHardware() {
    try {
        const dados = {
            cpu: (Math.random() * 100).toFixed(0) + "%",
            ram: (Math.random() * 16).toFixed(1) + " GB",
            temperatura: (Math.random() * 100).toFixed(0) + "°C"
        };

        console.log("Dados recebidos:", dados);

        monitorCPU.atualizarInterface(dados.cpu, 'cpu');
        monitorRAM.atualizarInterface(dados.ram, 'ram');
        monitorTemp.atualizarInterface(dados.temperatura, 'temperatura');

    } catch (erro) {
        console.error("Erro ao processar dados:", erro);
    }
}

setInterval(buscarDadosDoHardware, 2000);
buscarDadosDoHardware();