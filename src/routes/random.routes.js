const { Router } = require("express");
const child_process = require("child_process")

const router = Router();

router.get("/", async (req, res, next) => {
  console.log('Entre al endpoint', {
    processId: process.pid
  })
  
  const quantity = req.query.cant || 100000000
  const fork = child_process.fork(process.cwd() + '/src/services/random.service.js')
  fork.send(quantity)

  fork.on('message', (randomNumbers) => {
    res.status(200).json(randomNumbers)
  })
  
});

module.exports = router;
