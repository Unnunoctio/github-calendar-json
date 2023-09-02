# Github Calendar JSON
  Transform the GitHub contributions calendar into a JSON format.

## Installation 

  Using npm:
  ```bash
  $ npm i github-calendar-json
  ```
  Using yarn:
  ```bash
  $ yarn add github-calendar-json
  ```

## Documentation
  ### `githubContributions(username)`

  ### Params
  - **String** `username`: The GitHub username
  - **Object** `fetchOptions`: Options passed to `fetch`

  ### Return
  - **Object** an object contain:
  - `totalContributions` (Number): The number of contributions in the last year.
  - `lastContribution` (Date): The date fo the last contribution.
  - `days` (Array): An array of day objects:
    - `date` (Date): The date of the day.
    - `contributions` (Number): The number of contributions.
    - `level` (Number): A number between 0 and 4, representing the level of the day.
  - `weeks` (Array): The day objects grouped by weeks.
  - `calendar` (Array): The day objects grouped as GitHub calendar.

## Example
  ```js
  const { githubContributions } = require('github-calendar-json')

  githubContributions('Unnunoctio')
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.error(err)
    })

  // Response:
  // {
  //    totalContributions: 280,
  //    lastContribution: 2023-07-28T00:00:00.000Z,
  //    days: [
  //      {
  //        date: 2022-04-24T00:00:00.000Z,
  //        contributions: 2,
  //        level: 1
  //      },
  //      ...
  //      {
  //        date: 2023-07-28T00:00:00.000Z,
  //        contributions: 6,
  //        level: 2
  //      },
  //    ],
  //    weeks: [
  //      [
  //        <dayObject>, <dayObject>,
  //        <dayObject>, <dayObject>,
  //        <dayObject>, <dayObject>,
  //        <dayObject>
  //      ]
  //    ],
  //    calendar: [
  //      [ <dayObject>, <dayObject>, ... , <dayObject>, <dayObject> ],
  //      [ <dayObject>, <dayObject>, ... , <dayObject>, <dayObject> ],
  //      [ <dayObject>, <dayObject>, ... , <dayObject>, <dayObject> ],
  //      [ <dayObject>, <dayObject>, ... , <dayObject>, <dayObject> ],
  //      [ <dayObject>, <dayObject>, ... , <dayObject>, <dayObject> ],
  //      [ <dayObject>, <dayObject>, ... , <dayObject>, <dayObject> ],
  //      [ <dayObject>, <dayObject>, ... , <dayObject>, <dayObject> ],
  //    ],
  // }
  ```

## License
[MIT][license] © Unnunoctio

[license]: /LICENSE