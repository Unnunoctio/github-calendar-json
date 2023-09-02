// import { githubContributions } from '../src/index'
const { githubContributions } = require('../index')

githubContributions('unnunoctio', { mode: 'cors', cache: 'no-cache' })
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.error(err)
  })
