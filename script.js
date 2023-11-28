const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [] //array vazia para armazenar os dados coletados da api acima

//Realizado um fetch para coleta dos dados
fetch(endpoint)
  .then(blop => blop.json())//converto os dados brutos para um json
  .then(data => cities.push(...data))//converto novamente os dados e faço um spread dos dados para inserir na array vazia

function findMatches(wordToMatch, cities){
  return cities.filter(place => { //faremos um filtro da array que retornara um local
    const regex = new RegExp(wordToMatch, 'gi')// criamos uma RegEx com os parametros que queremos, no caso a palavra que vai dar match e as regras global e insensive
    return place.city.match(regex) || place.state.match(regex)
  })
}

//Colocando a virgula no numero da população a cada 3 casas decimais
function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function displayMatches(){
  const matchArray = findMatches(searchInput.value, cities) //chama a função
  const html = matchArray.map(place => {//faz um map dos dados coletatos e insere no html nas configurações abaixo
    const regex = new RegExp(searchInput.value, 'gi')
    const cityName = place.city.replace(regex, `<span class="hl">${searchInput.value}</span>`)
    const stateName = place.state.replace(regex, `<span class="hl">${searchInput.value}</span>`)
    return `
    <li> 
      <span class="name">${cityName}, ${stateName}</span>
      <span class ="population">${numberWithCommas(place.population)}</span>
    </li>
    `
  }).join('')
  suggestions.innerHTML = html
}


const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

searchInput.addEventListener('change', displayMatches) //cada vez que o valor do input for inserido e um clique fora ocorrer chamara a função
searchInput.addEventListener('keyup', displayMatches) ////cada vez que uma tecla for acionada no input chamara a função

