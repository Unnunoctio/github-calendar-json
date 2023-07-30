// import { githubContributions } from '../src/index'
const { githubContributions } = require('../index')

githubContributions('unnunoctio')
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.error(err)
  })
