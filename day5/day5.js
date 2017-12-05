fs = require('fs')
fs.readFile('input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  const a = data.trim().split('\n').map(it => Number(it));
  console.log(a)

  let steps = 0;
  let index = 0;
  while(a[index] !== undefined) {
    let move = a[index]
    //Part 2
    if(move >= 3) {
      a[index] = move-1
    } else {
        a[index] = move+1
    }
    //console.log(steps, index, move)
    index = index + move
    steps++
  }
  console.log('Done',steps) 


});

