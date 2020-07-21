const navWordLength = document.querySelector('#navWordLength')
const projectsContainer = document.querySelector('.projects-container')
const projectsContainerClass = 'projects-container-small'

changeNavWordLength()

function changeNavWordLength() {
    if (window.innerWidth < 330) {
        navWordLength.innerHTML = 'Wie?'
        if (projectsContainer != null) projectsContainer.classList.toggle(projectsContainerClass)
    }
}