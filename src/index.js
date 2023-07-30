/**
 * @param {String} username The GitHub username
 *
 * @returns {Promise<Object>} An object containing:
 *
 *  - `contributions` {Number}          The number of contributions in the last year.
 *  - `lastUpdate`    {Date}            The date of the last contribution.
 *  - `days`          {Array<Object>}   An array of day objects ordered by date:
 *      - `date`          {Date}            The date of the day.
 *      - `contributions` {Number}          The number of contributions.
 *      - `level`         {Number}          A number between 0 and 4, representing the level of the day.
 *  - `weeks`         {Array<Object>}  The day objects grouped by weeks.
 *  - `calendar`      {Array<Object>}  The day objects grouped as GitHub calendar.
 */
async function githubContributions (username) {
  const data = {
    contributions: 0,
    lastUpdate: null,
    days: [],
    weeks: [],
    calendar: []
  }

  let calendarHtml

  try {
    const parseUsername = username.toLowerCase().trim()
    const response = await fetch(`https://github.com/users/${parseUsername}/contributions`)

    if (!response.ok) throw new Error(response.statusText)
    calendarHtml = await response.text()
  } catch (error) {
    throw new Error(error)
  }

  calendarHtml.split('\n').map(line => line.trim()).forEach(line => {
    const containsClass = /^<td.*?class="ContributionCalendar-day"/.test(line)
    if (containsClass) {
      // extract atribute data-date
      const dateMatch = /data-date="([^"]+)"/.exec(line)
      const date = dateMatch ? new Date(dateMatch[1]) : null

      // extract atribute data-level
      const levelMatch = /data-level="([^"]+)"/.exec(line)
      const level = levelMatch ? parseInt(levelMatch[1]) : null

      // extract contributions
      let contributions = 0
      if (level > 0) {
        const contributionsMatch = /<span class="sr-only">([^<]+)<\/span>/.exec(line)
        contributions = contributionsMatch ? parseInt(contributionsMatch[1]) : null
      }

      if (date != null && level != null && contributions != null) {
        const day = {
          date,
          contributions,
          level
        }

        data.days.push(day)
        if (contributions > 0) {
          data.contributions += contributions
        }
      }
    }
  })

  // sorted days by date
  data.days.sort((a, b) => a.date - b.date)

  // get weeks
  for (let i = 0; i < data.days.length; i += 7) {
    const week = data.days.slice(i, i + 7)
    if (week.length < 7) {
      week.push(...Array(7 - week.length).fill(null))
    }
    data.weeks.push(week)
  }

  // get calendar format
  data.calendar = data.weeks[0].map((_, i) => data.weeks.map((row) => row[i]))

  // get last contribution
  for (let i = data.days.length - 1; i >= 0; i--) {
    if (data.days[i].contributions > 0) {
      data.lastUpdate = data.days[i].date
      break
    }
  }

  return data
}

module.exports = {
  githubContributions
}
