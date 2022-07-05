const transactionsUl = document.querySelector('#transactions')
const valorReceitas = document.querySelector('#money-plus')
const valorDespesas = document.querySelector('#money-minus')
const saldoAtual = document.querySelector('#balance')
const formulário = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputtransactionAmount = document.querySelector('#amount')


 const localStoragetransactions = JSON.parse(localStorage
  .getItem('transaction'))
 let transactions = localStorage 
 .getItem('transaction') !== null ? localStoragetransactions : []

const removeTransactions = ID => {
  transactions = transactions.filter(transaction => transaction.id !== ID)
  init()
}

const addTransactionIntoDOM = transaction => {
  const operator = transaction.amount < 0 ? '-' : '+'
  const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
  const montanteDoOperador = Math.abs(transaction.amount)
  const li = document.createElement('li')

  li.classList.add(CSSClass) 
  li.innerHTML = `
  ${transaction.name} <span> ${operator} R$ ${montanteDoOperador} 
  </span>
  <button class= "delete-btn" onClick="removeTransactions(${transaction.id})" >x</button>
  `
  transactionsUl.prepend(li)
}

const updateBalanceValues = () => {
  const transactionAmounts = transactions
  .map(transaction => transaction.amount)
  const total = transactionAmounts
  .reduce((accumulator, transaction) => accumulator + transaction, 0)
  .toFixed(2)
  const icome = transactionAmounts
  .filter(value => value > 0 )
  .reduce((accumulator, value) => accumulator + value , 0)
  .toFixed(2)
  const expanse = transactionAmounts
  .filter(value => value < 0)
  .reduce((accumulator, value) => accumulator + value, 0)
  .toFixed(2)
  console.log(expanse)


  saldoAtual.textContent = `R$ ${total}`
  valorReceitas.textContent = `R$ ${icome}`
  valorDespesas.textContent = `R$ ${expanse}`
}

const init = () => {
  transactionsUl.innerHTML = ''
  transactions.forEach(addTransactionIntoDOM)
  updateBalanceValues()
}

init()

const geradorDeID = () => Math.round(Math.random() *1000)

form.addEventListener('submit', event => {
  event.preventDefault()

  const transactionName = inputTransactionName.value.trim()
  const transactionAmount = inputtransactionAmount.value.trim()

  if (transactionName  === '' || transactionAmount === ''){
    alert('preencha os campos vazios')
    return
  }

  const transaction = {
    id:geradorDeID(), 
    name: transactionName,
    amount: Number(transactionAmount)
  }
  
    transactions.push(transaction)
    init()

    inputTransactionName.value = ''
    inputtransactionAmount.value = ''
})