console.log('Entre al fork', {
  processId: process.pid
})

const getAllRandomNumbers = (quantity) => {
  const randomNumbers = {}

  for(let i = 0; i < quantity; i++) {
    const randomNumber = Math.floor(Math.random() * 1000 + 1)
    randomNumbers[randomNumber] = 
      !randomNumbers[randomNumber] 
      ? 1 
      : randomNumbers[randomNumber] + 1
  }
  return randomNumbers
}

process.on('message', (quantity) => {
  console.log('recibi: ', quantity)
  process.send(getAllRandomNumbers(quantity))
})