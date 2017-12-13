const fs = require('fs')

function range(start, stop) {
  var a=[start], b=start;
  while(b<stop){b+=1;a.push(b)}
  return a;
}
fs.readFile(process.argv[2], 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  let max = 0
  const layers = data.trim().split('\n').reduce((r, it) => {
    const matches = /(\d+): (\d+)/.exec(it)
    let id = Number(matches[1])
    let levels = Number(matches[2])
    r[matches[1]] = {id: id, levels: levels, scanner: 0, dir: 1, t : (2 * (levels -1))}
    max = Math.max(max, id)
    return r
  }, {})

  let position = 0

  let caught = []

  for(let i = 0; i <= max; i++) {
    if(layers[i] && layers[i].scanner === position) {
      caught.push({layer: i, levels: layers[i].levels, severity: i * layers[i].levels})
      console.log('Caught', position, layers[i].levels)
    }

    Object.keys(layers).forEach(it => {
      layers[it].scanner += layers[it].dir
      if((layers[it].levels-1) === layers[it].scanner || layers[it].scanner === 0) {
        layers[it].dir = -(layers[it].dir)
      }
    })

  }
  console.log(caught.reduce((r,c)=> { return r + c.severity }, 0))

  Object.keys(layers).forEach(it => {
    layers[it].scanner = 0
    layers[it].dir = 1
  })

  let done = false

  let ticker = -1
  while(!done) {
      ticker += 1
    const a = range(ticker, ticker + max)

    let collision = false
    a.forEach((v,i) => {
        collision = collision || layers[i] && v % layers[i].t === 0
    })

    done = !collision
  }
  console.log(ticker)
})


