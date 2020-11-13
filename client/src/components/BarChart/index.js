import React, {useEffect, useState} from 'react'

import { HorizontalBar } from 'react-chartjs-2'
import { filterSemana } from '../../functions/formatDate'
import api from '../../services/api'
import color from '../../functions/colorsChar'

const Barchar = ({dataMedico}) => {
  
  const [medicoList, setMedicoList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const getMedicos = await api.get('/api/medicos',)
      if(getMedicos.status === 200) {
        await setMedicoList(getMedicos.data)
      } 
    }   

    console.log('medicolist', dataMedico)
    
    fetchData()
    
  }, [])
  
  


  const datasetNew = medicoList.map((item, index) => {
    return {
      label: item.nome,
      data: dataMedico.map(itemDataMedico => {
        return itemDataMedico.medicos.filter(itemfil => itemfil.nome === item.nome).length
      }),
      backgroundColor: color[index].backgroundColor,
      borderColor: color[index].borderColor,
      borderWidth: 1
    }
  })
  
  



  const data = {
    labels: filterSemana(),
    datasets: datasetNew ? datasetNew : []

  }

  const options = {
    title: {
      display: true,
      text: "Consultas da Semana"
    },
    scales: {
      xAxes: [
        {
          ticks: {
            min: 0,
            max: 20,
            stepSize: 1
          }
        }
      ]
    }
  }

  return (
    <HorizontalBar data={data} options={options} />
  )

}

export default Barchar