const fs = require('fs')

function solve(currentPos, skipSize, rope, instructions) {
  const length = rope.length
  instructions.forEach(it => {
    const mod = (currentPos + it) % length
    let subArray = rope.splice(currentPos, it)
    if(currentPos + it >= length) {
      subArray.push(...rope.splice(0, mod))
    }
    subArray = subArray.reverse()
    rope.splice(currentPos, 0, ...subArray)
    if(currentPos + it >= length) {
      let wrap = rope.splice(length - mod, length)
      rope.splice(0, 0, ...wrap)
    }
    currentPos += it + skipSize
    skipSize += 1
    currentPos = currentPos % length
  })
  return { currentPos, skipSize, rope }
}

function hash(l) {
  let rope = []
  for (let i = 0; i < 256; i+= 1) {
    rope.push(i)
  }
  const input = l.split('').map(c => c.charCodeAt(0))
  input.push(17, 31, 73, 47, 23)
  currentPos = 0
  skipSize = 0
  let step
  for (let i = 0; i < 64; ++i) {
    step = solve(currentPos, skipSize, rope, input)
    currentPos = step.currentPos
    skipSize = step.skipSize
    rope = step.rope
  }

  const hash = []
  for(let i = 0; i < rope.length; i += 16) {
    let h = 0
    hash.push(rope.slice(i, i + 16).reduce((res, curr) => res^curr))
  }
  const pad = n => ("0" + n).slice(-2)
  const res = hash.map((x) => {
    let s = x.toString(16)
    return s.length === 1 ? '0'+s: s
  }).join('')

  return res

}

const base = process.argv[2].trim().split('').map(c => c.charCodeAt(0))
let used = 0
const grid = []
for (let k = 0; k < 128; k+=1) {
  const l = (process.argv[2]+"-"+k)
  const res = hash(l)
  let b = res.split("").map(x => ("0000"+ parseInt(x, 16).toString(2)).substr(-4)).join("")
  used += b.split('').filter(i => i == 1).length
  grid.push(b.split(''))
}
console.log(used)

function removeGroup(x, y) {
  if(x < 0 || x > 127 || y < 0 || y > 127 || grid[x][y] == 0) 
    return

  grid[x][y] = 0
  removeGroup(x - 1,y)
  removeGroup(x + 1,y)
  removeGroup(x,y - 1)
  removeGroup(x,y +1 )

}

let groups = 0
for(let i = 0; i < 128; i+=1) {
  for(let j = 0; j < 128; j+=1) {
    if (grid[i][j] == 1) {
      removeGroup(i,j)
      groups += 1
    }
  }
}
console.log(groups)

