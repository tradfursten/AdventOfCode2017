fs = require('fs')

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

fs.readFile(process.argv[2], 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  const length = Number(process.argv[3]) + 1

  let rope = []
  for (let i = 0; i < length; i+= 1) {
    rope.push(i)
  }
  let input = data.trim().split(",").map(it => Number(it))

  let currentPos = 0
  let skipSize = 0
  let step1 = solve(currentPos, skipSize, rope, input)
  console.log(step1.rope[0] * step1.rope[1])
  rope = []
  for (let i = 0; i < length; i+= 1) {
    rope.push(i)
  }
  input = data.trim().split('').map(x => x.charCodeAt(0))
  input.push(17, 31, 73, 47, 23)
  console.log(input)
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
  console.log(hash)
  const pad = n => ("0" + n).slice(-2)
  const res = hash.map((x) => {
    let s = x.toString(16)
    return s.length === 1 ? '0'+s: s
  }).join('')
  console.log(res)

})

