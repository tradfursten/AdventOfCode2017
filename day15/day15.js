
const seedA = Number(process.argv[2])
const seedB = Number(process.argv[3])

const factorA = 16807
const factorB = 48271

function generate(last, factor) {

  return (last * factor) % 2147483647
}

let lastA = seedA
let lastB = seedB
let count = 0
for(let i=0; i < 40000000; i += 1) {
  lastA = generate(lastA, factorA)
  lastB = generate(lastB, factorB)
  
  if ((lastA & 65535) === (lastB & 65535)) {
    count += 1
  }
}

console.log(count)



lastA = seedA
lastB = seedB
count = 0
for(let i=0; i < 5000000; i += 1) {
  do {
    lastA = generate(lastA, factorA)
  } while (lastA % 4 !== 0)
  do {
    lastB = generate(lastB, factorB)
  } while (lastB % 8 !== 0)

  
  if ((lastA & 65535) === (lastB & 65535)) {
    count += 1
  }
}

console.log(count)
