import { githubContributions } from '../src/index.js'

githubContributions('Unnunoctio')
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.error(err)
  })
