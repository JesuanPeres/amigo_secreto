const ejs = require('ejs');
const path = require('path');
const email = require('../config/email');


const validar = (participantes) => {
    return participantes.filter((p) => {
        return p.nome && p.email && p.nome.trim() != '' && p.email.trim() != ''
    })
}

module.exports = {
    index(req, res) {
        return res.render('home/index');
    },

    sortear(req, res) {
        const participantes = validar(req.body.participantes);
        if (participantes.length < 3) {
            res.status(406).json({message: 'Número de participantes insuficiente'});
        }

        const shuffled = [];
        while (participantes.length > 0) {
            const index = Math.floor((Math.random() * participantes.length));
            const participante = participantes.splice(index, 1)[0];
            shuffled.push(participante);
        }

        for(let i = 0; i < shuffled.length ; i++) {
            shuffled[i].alvo = (i < shuffled.length - 1) ? shuffled[i + 1].nome : shuffled[0].nome
        }

        shuffled.forEach(async (participante) =>{
            const message =  `<h1>Olá ${participante.nome} você sorteou ${participante.alvo} no amigo secreto</h1>`;
            await email(participante.email, 'Amigo Secreto', message);
        });

        return res.json({message: 'Sucesso! Emails enviados!'})
    }
}