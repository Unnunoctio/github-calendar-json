// import { githubContributions } from '../src/index'
const { githubContributions } = require('../src/index')

githubContributions('3')
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.error(err)
  })
