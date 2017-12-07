fs = require('fs')
fs.readFile('input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  const a = data.trim().split('\n').map(it => {
    const m = /(\w+) \((\d+)\)/.exec(it)
    const o = {key:m[1], weight: Number(m[2]), line:it }
    const children = /(?:-> )(.*)/.exec(it)
    if(children) {
      const c = children[1].split(", ")
      o.children = c.map(c => {
        return {key: c}
      })
    }
    return o;
  });

  b = a.filter(it => {
    return it.line.match(/->/) && a.filter(o => o.key !== it.key && o.line.indexOf(it.key) !== -1).length === 0
  })
  console.log(b)


  const tree = a.reduce((sum, curr) => {
    sum[curr.key] = curr
    return sum
  }, {})

  let start = b[0].key

  getWeight(start, tree)

});


function getWeight(key, tree) {
  const item = tree[key]
  if(item.children !== undefined) {
    const children = item.children
    let childWheight = undefined 
    let childSum = 0
    children.forEach((it, index) => {
      if(!it.weight) {
        const cw = getWeight(it.key, tree)
        item.children[index].weight = cw
      }
      if(childWheight !== undefined && childWheight !== item.children[index].weight) {
        console.log(childWheight !== item.children[index].weight)
      }
      childSum += item.children[index].weight
    })
    const cw = children.reduce((sum, curr) => {
      if(sum[curr.weight] === undefined) {
        sum[curr.weight] = []
      }
      sum[curr.weight].push(curr)
      return sum
    },{})

    if(Object.keys(cw).length > 1) {
      console.log(item.key, cw)
      Object.keys(cw).forEach((it, index) => {
        if (cw[it].length === 1) {
          cw[it].forEach(k => {
            console.log(tree[k.key].weight, tree[k.key].childSum);
          })
        }
      })
    }

    item.childSum = childSum
    return item.weight + childSum
  } else {
    return item.weight
  }

}

