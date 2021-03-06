// const BASE_URL = "/api/"
const BASE_URL = "/"

const request = (url, options) => {
  const baseOpt = {
    mode: 'cors',
    cache: 'no-cache'
  }
  const fetchOpt = { ...baseOpt, ... options }
  return new Promise((resolve, reject) => {
    if (!window.fetch) {
      reject("your broswer not support fetch")
    }
    fetch(BASE_URL + url, fetchOpt)
    .then(res => res.json())
    .then(res => {
      if (res.code === 0) {
        resolve(res.data)
      } else {
        reject(res)
      }
    })
    .catch(err => reject(err))
  })
}

const obj2params = (obj) => {
  const params = Object.values(obj).reduce((a, b, i) => `${a}${Object.keys(obj)[i]}=${b}&`, '?')
  return params.substring(0, params.length - 1)
}

const getUrlEncode = async (url, params) => {
  const formatUrl = url + obj2params(params)
  return await request(formatUrl, {
    method: 'GET',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
}

const get = async (url, params={}) => {
  return await request(url, {}, {
    method: 'GET',
    body: JSON.stringify(params)
  })
}

const post = async (url, params={}) => {
  return await request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(params)
  })
}

const uploadFile = async (url, formData) => {
  return await request(url, {}, {
    method: 'POST',
    body: formData
  })
}

export default {
  get,
  getUrlEncode,
  post,
  uploadFile
}