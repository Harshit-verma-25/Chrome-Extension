
let tags = []

const inputBtn = document.getElementById("input-btn")
const input = document.getElementById("input")
const ul = document.getElementById("ul")
const deleteBtn = document.getElementById("delete-btn")
const saveBtn = document.getElementById("save-btn")

const tagsFromLocalStorage = JSON.parse(localStorage.getItem("tags"))


if(tagsFromLocalStorage){
    tags = tagsFromLocalStorage
    render(tags)
}

function render(item){
    let myTags = []
    for(let i = 0; i < item.length; i++){

        // Template strings
        myTags += `
            <li>
                <a style='text-decoration:none;' target='_blank' href='${item[i]}'>
                    ${item[i]}
                </a>
            </li>
        `
    }
    ul.innerHTML = myTags
}

saveBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        tags.push(tabs[0].url)
        localStorage.setItem("tags", JSON.stringify(tags))
        render(tags)
    })
})

inputBtn.addEventListener("click", function(){
    tags.push(input.value)
    input.value = ""
    localStorage.setItem("tags", JSON.stringify(tags))
    render(tags)
})

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    tags = []
    render(tags)
})

