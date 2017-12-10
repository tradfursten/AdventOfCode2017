fs = require('fs')
fs.readFile(process.argv[2], 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  const removeEscaped = data.trim().replace(/(:?!)./g, "")

  const removeGarbadge = removeEscaped.replace(/<.*?>/g,"")

  const removeAllButGroups = removeGarbadge.replace(/[^{}]/g,"")

  console.log(data)
  console.log(removeEscaped)
  console.log(removeGarbadge)
  console.log(removeAllButGroups)
  const levels = {}
  let currentLevel = 0
  removeAllButGroups.split("").forEach(it => {
    if (it === '{') {
      currentLevel += 1
    } else if (it === "}") {
      if(!levels[currentLevel]) {
        levels[currentLevel] = 0
      }
      levels[currentLevel] += 1
      currentLevel -= 1
    } else {
      console.log(`Error: ${it} unexpected`)
    }
  });

  let sum = 0

  Object.keys(levels).forEach(key => {
    sum += levels[key] * key
    console.log(`Key: ${key} * ${levels[key]}`)
  })
  console.log(sum)
});

