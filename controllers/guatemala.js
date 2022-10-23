const {Router} = require('express')
const Guatemala = require('../models/guatemala')



const GuatemalaGet = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, guatemala ] = await Promise.all([
        Guatemala.countDocuments(query),
        Guatemala.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        msg:'Metodo GET Guatemala - Rene Mauricio Canizalez Monterrosa',
        total,
        guatemala
    });
  }

  const GuatemalaPost = async (req, res = response) => {
    const body = req.body
    const guatemala = new Guatemala(body)
    await guatemala.save()
    res.json({
        ok:true,
        msg:'Metodo POST Guatemala  - Rene Mauricio Canizalez Monterrosa',
        guatemala
    })
  }

  const GuatemalaPut = async (req, res = response) => {
    const {id} = req.params

    const{codigo, nombreproyecto, monto, fecha, ...resto} = req.body
    resto.codigo = codigo
    resto.nombreproyecto = nombreproyecto
    resto.monto = monto
    resto.fecha = fecha
    const guatemala = await Guatemala.findByIdAndUpdate(id, resto)
    res.json({
        ok:true,
        msg:'Metodo PUT Guatemala - Rene Mauricio Canizalez Monterrosa',
        codigo, 
        nombreproyecto, 
        monto, 
        fecha
    })
  }

  const GuatemalaDelete = async (req, res = response) => {
    const {id} = req.params
    const guatemala = await Guatemala.findByIdAndUpdate(id,{estado:false})
    res.json({
        ok:true,
        msg:'Metodo DELETE Guatemala - Rene Mauricio Canizalez Monterrosa',
        guatemala
    })
  }

  module.exports = {GuatemalaGet, 
    GuatemalaPost,
    GuatemalaPut,
    GuatemalaDelete
}