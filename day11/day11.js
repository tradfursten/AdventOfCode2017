const fs = require('fs')

const distance = function (pos) {
  return (Math.abs(pos.x) + Math.abs(pos.y) + Math.abs(pos.z))/2
}

fs.readFile(process.argv[2], 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
   
  let pos = {x:0, y:0, z:0}
  let maxDist = 0
  data.trim().split(",").forEach(i => {
    switch (i) {
      case 'n':
        pos.y += 1
        pos.z -= 1
        break
      case 's':
        pos.y -= 1
        pos.z += 1
        break
      case 'ne':
        pos.x += 1
        pos.z -= 1
        break
      case 'nw':
        pos.x -= 1
        pos.y += 1
        break
      case 'se':
        pos.x += 1
        pos.y -= 1
        break
      case 'sw':
        pos.x -= 1
        pos.z += 1
        break
    }
    maxDist = Math.max(maxDist, distance(pos)) 
  })
  const dist = distance(pos) 
  console.log(pos, dist)
  console.log('Max dist', maxDist)

})


