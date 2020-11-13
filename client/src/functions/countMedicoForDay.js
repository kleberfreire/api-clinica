import {filterSemana} from './formatDate'
import color from './colorsChar'

export default function filterConsultasForDay(dataFilted = []) {
  const filterDaySemandas = filterSemana();


  const medicosFilterData = dataFilted.map((item, index) => {
    return {
      date: item.date,
      daySeman: filterDaySemandas[index], 
      medicos: item.consultas.map(itemConsultas => itemConsultas.medico),
      colors: color[index]
    };
  });

  console.log(medicosFilterData);
  return medicosFilterData
} 




