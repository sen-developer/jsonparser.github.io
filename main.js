// Find the <pre> element and set its content
const jsonOutputElement = document.getElementById("jsonOutput");
const jsonInputElement = document.getElementById("jsonInput");

const formatToString = document.getElementById("formatToString");
const formatToJson = document.getElementById("formatToJson");
const darkMode = document.getElementById("darkMode");
const animeMode = document.getElementById("animeMode");
const resident = document.getElementById("resident");

const buttons = document.querySelector(".buttons");
const body = document.body;

if(localStorage.getItem('mode') === null){
    localStorage.setItem("mode", '0');
}

render();

formatToString.addEventListener("click", (e) => {
    e.preventDefault();

    let jsonData = ``;
    if (!jsonInputElement.value.length) {
        alert("Empty String Input");
        throw new Error("Empty JSON Input");
    }
    try {
        jsonData = JSON.parse(jsonInputElement.value);
        if (typeof jsonData === "string") {
            jsonData = JSON.parse(jsonData);
        }

        const formattedJson = JSON.stringify(jsonData, null, 2);
        jsonOutputElement.innerHTML = formattedJson;
    } catch (e) {
        jsonOutputElement.textContent = e.message;
    }

})

formatToJson.addEventListener("click", (e) => {
    e.preventDefault();
    if (!jsonOutputElement.value.length) {
        alert("Empty JSON Input");
        throw new Error("Empty JSON Input");
    }
    try {
        jsonInputElement.value = JSON.stringify(jsonOutputElement.value.replace(/\s+/g, '').trim());

    } catch (e) {
        jsonInputElement.textContent = e.message;
    }
})

darkMode.addEventListener("click", (e) => {
    e.preventDefault();
    body.style.backgroundImage = "none";
    const isDark = darkMode.classList.toggle("dark-mode") === true;
    isDark ? localStorage.setItem("mode", "0") : localStorage.setItem("mode", "1");
    render();
})

animeMode.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.setItem("mode", "2");
    render();
});

resident.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.setItem("mode", "3");
    render();
});

function render() {
    buttons.classList.remove("gap-500");
    jsonOutputElement.classList.remove("neon-textarea")
    jsonInputElement.classList.remove("neon-textarea")
    if (localStorage.getItem("mode") === '0') {
        body.style.backgroundColor = "black";
        darkMode.classList.add("dark-mode");
        darkMode.innerText = "White Mode";
    } else if (localStorage.getItem("mode") === '1') {
        body.style.backgroundColor = "white";
        darkMode.innerText = "Dark Mode";
        darkMode.classList.remove("dark-mode");
    } else if(localStorage.getItem("mode") === '2'){
        body.style.backgroundColor = "none";
        body.style.backgroundImage = "url('./img/anime.jpg')";
    }else{
        jsonOutputElement.classList.add("neon-textarea")
        jsonInputElement.classList.add("neon-textarea")
        buttons.classList.add("gap-500");
        body.style.backgroundColor = "none";
        body.style.backgroundImage = "url('./img/ada.jpg')";
    }
}