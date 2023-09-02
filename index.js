'use strict'

/**
 * @param {String} username The GitHub username
 * @param {Object} [fetchOptions] Options passed to `fetch`
 *
 * @returns {Promise<Object>} An object containing:
 *
 *  - `totalContributions` {Number}          The number of contributions in the last year.
 *  - `lastContribution`   {Date}            The date of the last contribution.
 *  - `days`               {Array<Object>}   An array of day objects ordered by date:
 *      - `date`              {Date}            The date of the day.
 *      - `contributions`     {Number}          The number of contributions.
 *      - `level`             {Number}          A number between 0 and 4, representing the level of the day.
 *  - `weeks`              {Array<Object>}   The day objects grouped by weeks.
 *  - `calendar`           {Array<Object>}   The day objects grouped as GitHub calendar.
 */
async function githubContributions (username, fetchOptions) {
  let totalContributions = 0
  const days = []

  let calendarHtml

  try {
    const parseUsername = username.toLowerCase().trim()
    const response = await fetch(`https://github.com/users/${parseUsername}/contributions`, fetchOptions)

    if (!response.ok) { throw new Error(response.statusText) }
    calendarHtml = await response.text()
  } catch (err) {
    throw new Error(err)
  }

  calendarHtml.split('\n').map(line => line.trim()).forEach(line => {
    const containsClass = /^<td.*?class="ContributionCalendar-day"/.test(line)
    // in forEach: return is equivalent to continue
    if (!containsClass) {
      return
    }

    // extract atribute data-date
    const dateMatch = /data-date="([^"]+)"/.exec(line)
    const date = dateMatch ? new Date(dateMatch[1]) : null

    // extract atribute data-level
    const levelMatch = /data-level="([^"]+)"/.exec(line)
    const level = levelMatch ? parseInt(levelMatch[1]) : null

    // extract contributions
    let contributions = 0
    if (level !== null && level > 0) {
      const contributionsMatch = /<span class="sr-only">([^<]+)<\/span>/.exec(line)
      contributions = contributionsMatch ? parseInt(contributionsMatch[1]) : null
    }

    if (date !== null && level !== null && contributions !== null) {
      const day = {
        date,
        contributions,
        level
      }
      days.push(day)
      if (contributions > 0) { totalContributions += contributions }
    }
  })

  // sorted days by date
  days.sort((a, b) => a.date.getTime() - b.date.getTime())

  // get weeks: days ordered in weeks
  const weeks = []
  for (let i = 0; i < days.length; i += 7) {
    const week = days.slice(i, i + 7)
    if (week.length < 7) {
      week.push(...Array(7 - week.length).fill(null))
    }
    weeks.push(week)
  }

  // get calendar format: transposed matrix of weeks
  const calendar = weeks[0].map((_, i) => weeks.map((row) => row[i]))

  // get last contribution
  let lastContribution = new Date()
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].contributions > 0) {
      lastContribution = days[i].date
      break
    }
  }

  return {
    totalContributions,
    lastContribution,
    days,
    weeks,
    calendar
  }
}

module.exports = {
  githubContributions
}
