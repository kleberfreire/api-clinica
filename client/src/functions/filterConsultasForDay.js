import {filterDatas} from './formatDate'

export default function filterConsultasForDay(data = []) {
  const datas = filterDatas();

  const consultaFilterData = datas.map(item => {
    return {
      date: item,
      consultas: data.filter(dataItem => dataItem.data === item)
    };
  }).filter(consu => consu.consultas.length > 0 );

  console.log(consultaFilterData);
  return consultaFilterData
} 


