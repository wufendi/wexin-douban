const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const api_pre = "http://192.168.1.226:5000";
const api = {
  inTheaters: api_pre + '/v2/movie/in_theaters',
  comingSoon: api_pre + '/v2/movie/coming_soon',
  top250: api_pre + '/v2/movie/top250',
  publicPraise: api_pre + '/v2/movie/weekly',
  usBox: api_pre + '/v2/movie/us_box',
  newMovies: api_pre + '/v2/movie/new_movies',
  searchTag: api_pre + '/j/search_tags',
  searchMovie: api_pre + '/v2/movie/search',
  movieSubject: api_pre + '/v2/movie/subject/',
  movieCelebrity: api_pre + '/v2/movie/celebrity/'
}

module.exports = {
  formatTime: formatTime,
  api: api
}
