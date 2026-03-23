const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

class HardwareEngine {
    constructor() {
    }

    gerarStatus() {
        return {
            cpu: Math.floor(Math.random() * 101) + "%",
            ram: (Math.random() * 16).toFixed(2) + " GB",
            temperatura: Math.floor(Math.random() * (90 - 30 + 1)) + 30 + "°C",
            
            timestamp: new Date().toLocaleTimeString()
        };
    }
}

const engine = new HardwareEngine();

app.get('/api/status', (req, res) => {
    const dados = engine.gerarStatus();
    res.json(dados);
});

app.listen(PORT, () => {
    console.log(`Dashboard Server: http://localhost:${PORT}`);
    console.log(`API de monitoramento: http://localhost:${PORT}/api/status`);
});