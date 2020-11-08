import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Dashboard from './pages/Layout'
import Cliente from './pages/Cliente'
import ClienteUpdate from './pages/Cliente/ ClienteUpdate'
import ClienteCreate from './pages/Cliente/ ClienteCreate'

import Consulta from './pages/Consulta'
import ConsultaCreate from './pages/Consulta/ ConsultaCreate'

import Medico from './pages/Medico'
import MedicoCreate from './pages/Medico/MedicoCreate'

export default function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard}/>
        {/* Rota Cliente */}
        <Route path="/cliente" exact component={Cliente}/>
        <Route path="/cliente/create" exact component={ClienteCreate}/>
        <Route path="/cliente/details/:idCliente" exact component={ClienteUpdate}/>
        <Route path="/cliente/update/:idCliente" exact component={ClienteUpdate}/>

         {/* Rota medico */}
         <Route path="/cliente/" exact component={Cliente}/>
         <Route path="/cliente/create" exact component={ClienteCreate}/>
         <Route path="/cliente/update/:idCliente" exact component={ClienteUpdate}/>

        {/* Rota Cliente */}
        <Route path="/consulta" exact component={Consulta}/>
        <Route path="/consulta/create" exact component={ConsultaCreate}/>

        {/* Rota Cliente */}
        <Route path="/medico" exact component={Medico}/>
        <Route path="/medico/create" exact component={MedicoCreate}/>

      </Switch>
    </BrowserRouter>
  )
}