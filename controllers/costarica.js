const {Router} = require('express')
const Costarica = require('../models/costarica')



const CostaricaGet = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, costarica ] = await Promise.all([
        Costarica.countDocuments(query),
        Costarica.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        msg:'Metodo GET Costa Rica - Rene Mauricio Canizalez Monterrosa',
        total,
        costarica
    });
  }

  const CostaricaPost = async (req, res = response) => {
    const body = req.body
    const costarica = new Costarica(body)
    await costarica.save()
    res.json({
        ok:true,
        msg:'Metodo POST Costa Rica - Rene Mauricio Canizalez Monterrosa',
        costarica
    })
  }

  const CostaricaPut = async (req, res = response) => {
    const {id} = req.params

    const{codigo, nombreproyecto, paisqueejecuta, fechacierre, ...resto} = req.body
    resto.codigo = codigo
    resto.nombreproyecto = nombreproyecto
    resto.paisqueejecuta = paisqueejecuta
    resto.fechacierre = fechacierre
    const costarica = await Costarica.findByIdAndUpdate(id, resto)
    res.json({
        ok:true,
        msg:'Metodo PUT Costa Rica  - Rene Mauricio Canizalez Monterrosa',
        codigo, 
        nombreproyecto, 
        paisqueejecuta, 
        fechacierre
    })
  }

  const CostaricaDelete = async (req, res = response) => {
    const {id} = req.params
    const costarica = await Costarica.findByIdAndUpdate(id,{estado:false})
    res.json({
        ok:true,
        msg:'Metodo DELETE Costa Rica  - Rene Mauricio Canizalez Monterrosa',
        costarica
    })
  }

  module.exports = {CostaricaGet, 
    CostaricaPost,
    CostaricaPut,
    CostaricaDelete
}