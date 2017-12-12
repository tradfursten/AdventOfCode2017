const fs = require('fs')

fs.readFile(process.argv[2], 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  const pipes = data.trim().split('\n').map(it => {
    const matches = /(\d+) <-> (.*)/.exec(it)
    return { pid: matches[1], pipes: matches[2].split(', ') }
  }).reduce((r, c) => {
    const p = {}
    p[c.pid] = c
    Object.assign(r,p)
    return r
  }, {})
  
  let groupId = 0
  let i = 0
  const queu = ['0']
  
  let res = new Set()
  while(queu.length > 0) {
    let curr = queu.pop()

    if (pipes[curr].groupId === undefined && !res.has(curr)) {
      const newPipes = pipes[curr].pipes
      
      const group = newPipes.filter(id => {
        const hasG = Object.keys(pipes).filter(p => {
          return p === id && pipes[p].groupId !== undefined
        })
        return hasG.length > 0
      })
      if(group.length > 0) {
        pipes[curr].groupId = pipes[group[0]].groupId
      } else {
        pipes[curr].groupId = groupId
      }
      queu.push(...newPipes)
      res.add(curr.pid)
    }
  
    if(queu.length === 0) {
      groupId += 1
      i += 1
      res = new Set()
      if(pipes[i]) {
        queu.push(...pipes[i].pipes)
      }
    }
  }

  console.log(Object.keys(pipes).filter(i => pipes[i].groupId === 0).length)
  console.log(Object.keys(pipes).reduce((r, c) => {
    r.add(pipes[c].groupId)
    return r
  }, new Set()).size)

})


