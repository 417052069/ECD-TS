class fetchMethods {

  async fetchPost(url: string,config: object){
    await fetch(url,config)
    .then(res => res.json())
    .then(data => console.log(data))
  }
}

export default fetchMethods