// Gyannine Candeias Gomes dos Santos 

//------------------------------Algumas funções auxiliares-------------------------------------------

const soma = (acc, x) => acc + x
const calcMediaGeral = (lista) => lista.reduce(soma, 0) / lista.length

function input() {
  const dadosEmLista = document.getElementById("input").value.split("\n").map((x) => x.split(','))
  if(document.getElementById("informacoes").style.display=== "none"){	
      document.getElementById("informacoes").style.display= "flex";
     }


//-----------------------------------Tempo de curso em periodos--------------------------------------
  
  //Função auxiliar para contar os elementos diferentes em uma lista
  
  const filtroPeriodo = (lista, itemAcc, ultItem, i) => {
    if (i >= lista.length) {
      return itemAcc
    } 
    else {
      if (lista[i][0] === ultItem) {
      return filtroPeriodo(lista, itemAcc, ultItem, i + 1)
      } 
      else return filtroPeriodo(lista, itemAcc + 1, ultItem = lista[i][0], i + 1)
    }
  }

  const periodosCursados = (lista) => filtroPeriodo(lista, 0, '', 0)
  console.log(`Total de periodos cursados: ${(periodosCursados(dadosEmLista))}`)

  document.getElementById("periodosCursados").innerHTML = `${(periodosCursados(dadosEmLista))} períodos`

//-----------------------------------Media Geral Ponderada pela CH------------------------------------

    //Função genérica para o cálculo da média ponderada

  const mPondAux = (lista, notaAcc, pesoAcc, i) => {
    if (i >= lista.length) {
      return notaAcc / pesoAcc
    } else {
      return mPondAux(lista, notaAcc + Number(lista[i][4] * lista[i][2]), pesoAcc + Number(lista[i][2]), i + 1)
    }
  }
  
  const mPond = (lista) => (mPondAux(lista, 0, 0, 0))
  console.log(`Média ponderada pela CH: ${(mPond(dadosEmLista))}`)
  
  document.getElementById("mediaPonderada").innerHTML = (mPond(dadosEmLista))

//------------------------------------Desvio Padrao da Media Geral------------------------------------
  
  const media = (lista) => lista.reduce(soma, 0)/lista.length
  const mediaGeral = media(dadosEmLista.map(x => Number(x[4])))
  
  //Função genérica para o cálculo do desvio padrão
  const calcDpMedia = (lista) => (media) => {
    const listaSoma = lista.map((x) => ((x - mediaGeral)**2))
    const somaFinal = listaSoma.reduce(soma, 0)
    return Math.sqrt(somaFinal / lista.length)
  }
 
  const dpMedia = calcDpMedia(dadosEmLista.map(x => Number(x[4])))(mediaGeral)
  console.log(`Desvio Padrão da média Geral: ${(dpMedia)}`)
  
  document.getElementById("dpMedia").innerHTML = dpMedia

//----------------------------Lista de Disciplinas com aprovação/reprovação----------------------------
  
  const aprovadas = dadosEmLista.filter(x => x[4] >=5 && x[3]>=75)
  const discAprovadas = (lista) => lista.map(x=> x[1])
  console.log(`<br> Disciplinas com aprovação: ${(discAprovadas(aprovadas))}`)
  
  document.getElementById("discAprovadas").innerHTML = (discAprovadas(aprovadas))	
  
//----------------------------Lista de Disciplinas com reprovação----------------------------
 
//Funções para obter lista de disciplinas com reprovação de acordo c/ as condições de reprovação

  const reprovadosF = dadosEmLista.filter(x => x[4] >=5 && x[3]<75)//Reprovado por falta
  const discReprovadasF = (lista) => lista.map(x=> x[1])

  const reprovadosM = dadosEmLista.filter(x => x[4]< 5 && x[3]>=75)//Reprovado por media
  const discReprovadasM = (lista) => lista.map(x=> x[1])
 
  const reprovadosMF = dadosEmLista.filter(x => x[4] <5 && x[3]<75)//Reprovado por ambos
  const discReprovadasMF = (lista) => lista.map(x=> x[1])
  
  
const discRep = `<br> Disciplinas reprovadas por faltas: ${(discReprovadasF(reprovadosF))}<br> Disciplinas reprovadas por média: ${(discReprovadasM(reprovadosM))} <br> Disciplinas reprovadas por média e faltas: ${(discReprovadasMF(reprovadosMF))}`
  /*const discRep = `
    <table class="centerTable">
    <tr>
      <th>Disciplinas reprovadas por faltas<th>
      <th>Disciplinas reprovadas por média<th> 
      <th>Disciplinas reprovadas por média e faltas<th> 
    </tr> 
    <tr>
      <td>${(discReprovadasF(reprovadosF))}</td>
      <td>${(discReprovadasM(reprovadosM))}</td>
      <td>${(discReprovadasMF(reprovadosMF))}</td>
    </tr>
    </table>
  `tentei fazer uma tabela mas n deu :c */
  console.log(discRep)
  document.getElementById("discReprovadas").innerHTML = discRep
//------------------------------------------CH total cursada-------------------------------------------
  
  const getCH = aprovadas.map(x => Number(x[2]))
  const somaCH = getCH.reduce(soma, 0)
  document.getElementById("somaCH").innerHTML = somaCH

//----------------Media geral ponderada das disciplinas de cada departamento------------------------
const getDepto = dadosEmLista.map((x)=>x[1].slice(0, -4))
const removeDup = getDepto.filter((x, y) => getDepto.indexOf(x) === y)

const matchDepto = (depto, fullList) => fullList.filter(x => x[1].slice(0,-4) === depto)

const aux = (deptoLista, fullList, i, acc) => {
if (deptoLista.length <= i) { return acc}
else {
return aux(deptoLista, fullList, i+1, acc.concat([mPond(matchDepto(deptoLista[i], fullList))]));
}
}

const mPondDepto = (deptoLista, fullList) => {
    return aux( deptoLista, fullList, 0, [] )

}
const auxUS = (nota, dpt, i, acc)=>{
  if (i>= dpt.length) {return (acc)}
  else {return auxUS(nota, dpt, i+1, acc.concat(`<br> ${(dpt[i])} : ${(nota[i])}`))}
  } 
const uniaoSinistra = (nota, dpt)=>{
  return auxUS(nota, dpt, 0, '')
}
    

console.log(mPondDepto(removeDup, dadosEmLista))

document.getElementById("medPorDepto").innerHTML = uniaoSinistra(mPondDepto(removeDup, dadosEmLista), removeDup)

}      
