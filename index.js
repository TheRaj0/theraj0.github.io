import { projects, skills } from "./data.js"

function highlighthtml(text) {
    text = text.replaceAll("~~", `<span class="highlight">`)
    text = text.replaceAll("~", `</span>`)

    return text
}

function createProject(name, details, image, link, btntxt) {

    let bio = highlighthtml(details);

    let output = (`
    <div class="project">
        <h3>` + name +`</h3>
        <p>` + bio +`</p>

        <img src="`+ image +`" >
        
        <form target="_blank" action="` + link + `">
            <button>` + btntxt + `</button>
        </form>
    </div>
    `)
    return output
}

function createSkill(title, text) {

    let formattedtext = highlighthtml(text);

    let output = (`
    <div class="skill-card">
        <h3>` + title + `</h3>
        <p>` + formattedtext + `</p>
    </div>    
    `)
    return output
}

const projContainerEl = document.getElementById("projectscontainer")
const skillsContainerEl = document.getElementById("skillscontainer")
const loadMoreBtn = document.getElementById("loadMoreBtn")

let projectsPerPage = 3
let currentIndex = 0

function renderProjects() {
    const nextIndex = currentIndex + projectsPerPage
    const slice = projects.slice(currentIndex, nextIndex)

    slice.forEach(p => {
        const html = createProject(p.name, p.details, p.imagesrc, p.projectlink, p.buttontext)
        projContainerEl.insertAdjacentHTML('beforeend', html)
        const newProject = projContainerEl.lastElementChild
        setTimeout(() => newProject.classList.add('loaded'), 10)
    })

    currentIndex = nextIndex

    if (currentIndex >= projects.length) loadMoreBtn.style.display = 'none'
}

window.addEventListener("DOMContentLoaded", () => {

    renderProjects()

    let skillstr = ""
    skills.forEach(s => {
        skillstr += createSkill(s.title, s.text)
    })

    skillsContainerEl.innerHTML = skillstr

    document.getElementById("viewer-close")
        .addEventListener("click", closeImgViewer);
    document.getElementById("viewer-backdrop")
        .addEventListener("click", closeImgViewer);
});


function openImgViewer() {
    document.getElementById("imgViewer").classList.add("show");
}

function closeImgViewer() {
    document.getElementById("imgViewer").classList.remove("show");
}

loadMoreBtn.addEventListener('click', renderProjects)

document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeImgViewer();
});


document.addEventListener("click", e => {
    let img = e.target.closest(".project img");
    if (!img) return;

    document.getElementById("viewerImg").src = img.src;
    openImgViewer();
});

