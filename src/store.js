import http from './sevices'

const store = {
  species: null
}

const mutations = {
  setSpecies (data) {
    store.species = data
  },
  getSpecies () {
    return store.species
  }
}

const actions = {
  getSpecies: async () => {
    if (store.species) {
      return mutations['getSpecies']()
    } else {
      return await http.post("metadata/species").then(res => {
        const species = []
        for(let k in res) {
          species.push({
            label: k,
            value: res[k]
          })
        }
        mutations['setSpecies'](species)
        return species
      })
    }
  }
}
const dispatch = name => {
  return actions[name] && actions[name]()
}

export default {
  dispatch
}