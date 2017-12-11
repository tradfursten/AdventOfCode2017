fs = require('fs')
fs.readFile(process.argv[2], 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  const memory = {};
  const a = data.trim().split('\n').map(it => {
    // add memory block if not exist
    // rechange to eval
    const parsed = /(\w+) (inc|dec) (-\d+|\d+)/.exec(it)

    const c = /.*if (\w+) (>|<|<=|>=|==|!=) (.*)/.exec(it)
    let evalString = ""
    if(!memory[parsed[1]]) {
      memory[parsed[1]] = 0
    }
    if(parsed[2] === "inc") {
      evalString = `memory.${parsed[1]} = memory.${parsed[1]} + (${Number(parsed[3])})`
    } else {
      evalString = `memory.${parsed[1]} = memory.${parsed[1]} - (${Number(parsed[3])})`
    }

    let instruction
    if (c) {
      instruction = `memory.${c[1]} ${c[2]} ${c[3]}?(${evalString}):""`//;memory.${parsed[1]} +=1`
    } else {
      instruction = `${evalString}`//;memory.${parsed[1]} +=1`
    }

    return instruction
  });
  console.log(memory)
  let max = 0

  a.forEach(instruction => {
    console.log(instruction)
    eval(instruction)
    console.log(memory)
    max = Math.max(max, Math.max.apply(Math, Object.keys(memory).map(it => memory[it])))
  })
  console.log(memory)
  const arr = Object.keys(memory).map(it => memory[it])

  const lastMax = Math.max.apply(Math, arr);
  console.log(lastMax)
  console.log(max)
  //eval line by line
  // print result
});


