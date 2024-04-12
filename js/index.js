





const form = document.getElementById("search");
const userInput = document.getElementById("github-form");
const userList = document.getElementById("user-list");
const repositories = document.getElementById("repos-list")


userInput.addEventListener("submit", (event) => {
    event.preventDefault();

    let userName = event.target.search.value
    apiUrl = `https://api.github.com/search/users?q=${userName}`;
    const userInfo = document.createElement("li");

    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
        data.items.forEach((user) => {
           
            userInfo.innerHTML =  `
            <p>User Name: ${user.login}</p>
            <img src="${user.avatar_url}"> 
            <a href="${user.html_url}">Profile link</a>
        `;
            userList.appendChild(userInfo);;
           

        });
    })
        .catch(error => console.error("Error:", error));

userInfo.addEventListener("click", () => {
    const repositoryData = `https://api.github.com/users/${userName}/repos`
    
    fetch(repositoryData)
    .then(res => res.json())
    .then(data => {
        data.forEach( repository => {
       const repoList = document.createElement("li");
    repoList.innerHTML = `      
        <h2>Repo Name: ${repository.full_name}</h2>
        <a href="${repository.html_url}">To the Repo</a><br>
        <a href="${repository.clone_url}">Clone the repo</a><br>
        <a href="${repository.fork_url}">Fork the repo</a>`
       
       repositories.appendChild(repoList)
    })
    }
    )
    .catch(error => {
        console.error("Error:", error)
    })
})


    })