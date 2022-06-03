export function getStarsRankingUrl() {
  const users = [
    'bbcvc',
  ]
  const repos = [
    'Awesome-lists',
  ]

  const query = [
    ...users.map(i => `user:${i}`),
    ...repos.map(i => `repo:${i}`),
  ].join(' ')

  const url = `https://github.com/search?l=&o=desc&s=stars&type=Repositories&q=${encodeURIComponent(query)}`
  return url
}
