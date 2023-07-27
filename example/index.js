const { githubContributions } = require('../src/index')

githubContributions('Unnunoctio')
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.error(err)
  })
