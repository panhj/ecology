const BASE_URL = "/api/"

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
    .then(res => {
      if (res.status === 200) {
        return res
      } else {
        throw new Error(res)
      }
    })
    .then(res => res.json())
    .then(res => resolve(res.data))
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
    header: {
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
    header: {
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