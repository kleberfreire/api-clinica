import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Cliente from './pages/Cliente'
import ClienteUpdate from './pages/Cliente/ ClienteUpdate'
import ClienteCreate from './pages/Cliente/ ClienteCreate'

import Consulta from './pages/Consulta'
import ConsultaCreate from './pages/Consulta/ConsultaCreate'
import ConsultaUpdate from './pages/Consulta/ConsultaUpdate'

import Medico from './pages/Medico'
import MedicoCreate from './pages/Medico/MedicoCreate'
import MedicoUpdate from './pages/Medico/MedicoUpdate'

export default function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard}/>
        {/* Rota Cliente */}
        <Route path="/cliente" exact component={Cliente}/>
        <Route path="/cliente/create" exact component={ClienteCreate}/>
        <Route path="/cliente/update/:id" exact component={ClienteUpdate}/>

        {/* Rota Consulta */}
        <Route path="/consulta" exact component={Consulta}/>
        <Route path="/consulta/create" exact component={ConsultaCreate}/>
        <Route path="/consulta/update/:id" exact component={ConsultaUpdate}/>
        {/* Rota Cliente */}
        <Route path="/medico" exact component={Medico}/>
        <Route path="/medico/create" exact component={MedicoCreate}/>
        <Route path="/medico/update/:id" exact component={MedicoUpdate}/>

      </Switch>
    </BrowserRouter>
  )
}