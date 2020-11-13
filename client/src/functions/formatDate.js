import moment from 'moment'

const data = new Date();

export const formateDateBR = (date) => {
  return date.split('-').reverse().join('-')
}

export const formateDateEN = (date) => {
  return date.split('-').reverse().join('-')
}


export const filterSemana= () => {
  const dia_sem = data.getDay() === 0 ? 1 : data.getDay()
  
  const strSemana = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab' ].slice(dia_sem)
  return strSemana
} 

export const filterDatas = () => {
  const dia_sem = data.getDay()
  const strSemana = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab' ].slice(dia_sem)
  const dataForPesquisa = strSemana.map((item, index) => {
    return moment().add(index, 'day').format('DD-MM-YYYY')
  })

  return dataForPesquisa
}

