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
        ["Celsius", "Fahrenheit", "Kelvin"].forEach(unit => {
            fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
            toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
        });
    } else {
        for (let unit in units[selectedCategory]) {
            fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
            toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
        }
    }

    convert(); // 🔥 IMPORTANT: auto update after loading
}

function convert() {
    const value = inputValue.value;

    if (value === "") {
        resultText.textContent = "value";
        return;
    }

    const num = Number(value);
    const categoryType = category.value;
    const from = fromUnit.value;
    const to = toUnit.value;

    let result;

    if (categoryType === "Temperature") {

        if (from === to) result = num;

        else if (from === "Celsius" && to === "Fahrenheit")
            result = (num * 9 / 5) + 32;

        else if (from === "Celsius" && to === "Kelvin")
            result = num + 273.15;

        else if (from === "Fahrenheit" && to === "Celsius")
            result = (num - 32) * 5 / 9;

        else if (from === "Fahrenheit" && to === "Kelvin")
            result = ((num - 32) * 5 / 9) + 273.15;

        else if (from === "Kelvin" && to === "Celsius")
            result = num - 273.15;

        else if (from === "Kelvin" && to === "Fahrenheit")
            result = ((num - 273.15) * 9 / 5) + 32;

    } else {
        result = num * units[categoryType][from] / units[categoryType][to];
    }

    resultText.textContent = isNaN(result) ? "Invalid input" : result.toFixed(2);
}

/* 🔥 AUTO EVENTS */
inputValue.addEventListener("input", convert);
fromUnit.addEventListener("change", convert);
toUnit.addEventListener("change", convert);
category.addEventListener("change", loadUnits);

/* INIT */
loadUnits();
