// Find the <pre> element and set its content
const jsonOutputElement = document.getElementById("jsonOutput");
const jsonInputElement = document.getElementById("jsonInput");

const formatToString = document.getElementById("formatToString");
const root = document.getElementById("root");
const formatToJson = document.getElementById("formatToJson");
const darkMode = document.getElementById("darkMode");
const animeMode = document.getElementById("animeMode");
const resident = document.getElementById("resident");
const reset = document.getElementById("reset");
const buttons = document.querySelectorAll(".btn");

const body = document.body;
let globalTextArea = document.querySelectorAll('.globalTextArea');

const month = new Date().getMonth();
const monthsForSnow = [1, 2, 11, 12];

if (localStorage.getItem('mode') === null) {
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
        jsonInputElement.value = JSON.stringify(jsonOutputElement.value.replace(/\s+/g, ' ').trim());

    } catch (e) {
        jsonInputElement.textContent = e.message;
    }
})

darkMode.addEventListener("click", (e) => {
    e.preventDefault();
    body.style.backgroundImage = "none";
    localStorage.setItem("mode", "1");

    render();
    activateButton(buttons, darkMode);
})

animeMode.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.setItem("mode", "2");
    activateButton(buttons, animeMode);
    render();
});

reset.addEventListener('click', (e) => {
    e.preventDefault();
    jsonOutputElement.value = '';
    jsonInputElement.value = '';
})

resident.addEventListener("click", (e) => {
    e.preventDefault();
    activateButton(buttons, resident);
    localStorage.setItem("mode", "3");
    render();
});

function render() {

    jsonOutputElement.classList.remove("neon-textarea")
    jsonInputElement.classList.remove("neon-textarea")
    addClassToArrayHtmlElements("shadowed", globalTextArea, false);

    if (localStorage.getItem("mode") === '1') {

        body.style.backgroundColor = "white";
        root.style.backgroundColor = "black";
        body.style.backgroundImage = "none";
    } else if (localStorage.getItem("mode") === '2') {

        body.style.backgroundColor = "none";
        root.style.backgroundColor = "transparent";
        body.style.backgroundImage = "url('./img/anime.jpg')";
        addClassToArrayHtmlElements("shadowed", globalTextArea,);
    } else {

        jsonOutputElement.classList.add("neon-textarea")
        jsonInputElement.classList.add("neon-textarea")
        body.style.backgroundColor = "none";
        root.style.backgroundColor = "transparent";
        body.style.backgroundImage = "url('./img/ada.jpg')";
        body.style.backgroundPositionY = "50px";
        addClassToArrayHtmlElements("shadowed", globalTextArea,);
    }
}


if (monthsForSnow.includes(month)) {
    snow();
}


function snow() {
    const snowContainer = document.getElementById('snow');

    // Function to create a snowflake
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');

        // Randomize size and position
        const size = Math.random() * 10 + 5 + 'px';
        snowflake.style.width = size;
        snowflake.style.height = size;
        snowflake.style.left = Math.random() * window.innerWidth + 'px';
        snowflake.style.animationDuration = Math.random() * 3 + 2 + 's'; // Random fall duration
        snowflake.style.animationDelay = Math.random() * 2 + 's'; // Random start delay

        snowContainer.appendChild(snowflake);

        // Remove the snowflake after animation ends
        setTimeout(() => {
            snowflake.remove();
        }, 5000);
    }

    // Generate snowflakes continuously
    setInterval(createSnowflake, 100); // Add a new snowflake every 100ms
}

function addClassToArrayHtmlElements(className, arr, add = true) {
    if(!arr){
        return;
    }
    for (let i = 0; i < arr.length; i++) {
        if(add){
            arr[i].classList.add(className);
        }else{
            arr[i].classList.remove(className);
        }
    }
}

function activateButton(buttons, activeButton) {

    activeButton.style.backgroundColor = "#f96d00";
    buttons.forEach(button => {
        if(button.id !== activeButton.id){
            button.style.backgroundColor = "black";
        }
    });
}