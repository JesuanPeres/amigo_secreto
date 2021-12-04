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
        
        
        const alvos = participantes.map(p => ({...p}));
        
        for(let i = 0; i < participantes.length;) {
            const index = Math.floor((Math.random() * alvos.length));
            if (alvos[index].nome != participantes[i].nome) {
                const p = alvos.splice(index, 1)[0];
                participantes[i].alvo = p;
                i++;
            } else if (alvos.length == 1) {
                return res.status(500, {message: 'Não foi possível sortear'});
            }
        }

        participantes.forEach(async (p) =>{
            const message =  `<h1>Olá ${p.nome} você sorteou ${p.alvo.nome} no amigo secreto</h1>`
            await email(p.email, 'Amigo Secreto', message);
        });

        return res.json({message: 'sucesso'})
    }
}