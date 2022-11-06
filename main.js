window.addEventListener("load", () => {
    let link = "https://api.github.com/users/"
    let form = document.querySelector("form")
    form.addEventListener("submit", handleSub)
    let input = document.querySelector("input")
    let cards = document.querySelector(".cards")
    let cardTemplate = document.querySelector(".card-template").content
    let text = document.querySelector(".text")    
    let result = []
    cards.innerHTML = null
    function handleSub(e){
        e.preventDefault()        
        let inputValue = input.value
        fetching(link,inputValue)   
        .catch((error ) => {
            if(error.name === "AxiosError"){
                errors()
            }
        }) 
    }
    let ERROR_TEXT = document.querySelector(".text_h1")
    function errors(){
        ERROR_TEXT.textContent = "Kechirasiz bunday nomli profil topilmadi"
        console.log(ERROR_TEXT)
    }
    async function fetching(API, user){
        let fetchs = await axios({
            method: "GET", 
            url: API + user
        })
        let json = await fetchs.data
        result = [...result, json]
        if(result.length > 1){
            result.splice(0, 1)
        }
        renders(result)
    }
    function renders(arr){
        cards.innerHTML = null
        if(arr){
            text.remove()
            for(let i = 0; i<arr.length; i++){
                let clone = cardTemplate.cloneNode(true)
                let anker = clone.querySelector(".card_ankers")
                anker.href = arr[i].avatar_url
                let img = clone.querySelector(".card-img-top")
                img.src = arr[i].avatar_url
                let name = clone.querySelector(".card-title")
                name.textContent = arr[i].name
                let user = clone.querySelector(".card-user")
                user.textContent = arr[i].login
                let follow = clone.querySelector(".count-follow")
                follow.textContent = arr[i].following
                let followers = clone.querySelector(".count-followers")
                followers.textContent = arr[i].followers
                let repos = clone.querySelector(".repozitor-count")
                repos.textContent = arr[i].public_repos
                let created = clone.querySelector(".created-count")
                created.textContent = arr[i].created_at
                let update = clone.querySelector(".updated-count")
                update.textContent = arr[i].updated_at
                let id = clone.querySelector(".id-count")
                id.textContent = arr[i].id            
                let urlProfile = clone.querySelector(".hero-card-a")
                urlProfile.href = `https://github.com/${arr[i].login}`            
                let reposUrl = clone.querySelector(".hero-url-repos")
                reposUrl.href = `https://github.com/${arr[i].login}?tab=repositories`
                cards.appendChild(clone)
            }
            }
      }
})