const units = {
    Length: {
        Meters: 1,
        Kilometers: 1000,
        Centimeters: 0.01,
        Feet: 0.3048,
        Inches: 0.0254,
        Miles: 1609.34
    },

    Weight: {
        Kilograms: 1,
        Grams: 0.001,
        Pounds: 0.453592,
        Ounces: 0.0283495
    },

    Storage: {
        Bytes: 1,
        Kilobytes: 1024,
        Megabytes: 1048576,
        Gigabytes: 1073741824
    }
};

const category = document.getElementById("category");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const inputValue = document.getElementById("inputValue");
const resultText = document.getElementById("resultText");

function loadUnits() {
    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    const selectedCategory = category.value;

    if (selectedCategory === "Temperature") {
        const tempUnits = ["Celsius", "Fahrenheit", "Kelvin"];

        tempUnits.forEach(unit => {
            fromUnit.innerHTML += `<option>${unit}</option>`;
            toUnit.innerHTML += `<option>${unit}</option>`;
        });

        return;
    }

    for (let unit in units[selectedCategory]) {
        fromUnit.innerHTML += `<option>${unit}</option>`;
        toUnit.innerHTML += `<option>${unit}</option>`;
    }
}

function convert() {
    const value = Number(inputValue.value);

    if (inputValue.value === "") {
        resultText.textContent = "Enter value";
        return;
    }

    const categoryType = category.value;
    const from = fromUnit.value;
    const to = toUnit.value;

    let result;

    if (categoryType === "Temperature") {

        if (from === to) result = value;
        else if (from === "Celsius" && to === "Fahrenheit") result = (value * 9 / 5) + 32;
        else if (from === "Celsius" && to === "Kelvin") result = value + 273.15;
        else if (from === "Fahrenheit" && to === "Celsius") result = (value - 32) * 5 / 9;
        else if (from === "Fahrenheit" && to === "Kelvin") result = ((value - 32) * 5 / 9) + 273.15;
        else if (from === "Kelvin" && to === "Celsius") result = value - 273.15;
        else if (from === "Kelvin" && to === "Fahrenheit") result = ((value - 273.15) * 9 / 5) + 32;

    } else {
        result = value * units[categoryType][from] / units[categoryType][to];
    }

    resultText.textContent = isNaN(result) ? "Invalid input" : result.toFixed(2);
}

/* 🔥 AUTO EVENT SYSTEM */
function autoConvert() {
    convert();
}

/* Events */
inputValue.addEventListener("input", autoConvert);
fromUnit.addEventListener("change", autoConvert);
toUnit.addEventListener("change", autoConvert);
category.addEventListener("change", () => {
    loadUnits();
    autoConvert();
});

/* Init */
loadUnits();
