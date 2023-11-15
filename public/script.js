const getInstruments = async () => {
    try {
        return (await fetch("https://node-project2-zj8p.onrender.com/api/recipes")).json();
    } catch(error) {
        console.log(error);
    }
}

const showInstruments = async () => {
    let instruments = await getInstruments();
    let instrumentsDiv = document.getElementById("recipe-list");
    instrumentsDiv.innerHTML = "";
    instruments.forEach((instrument) => {
        const section = document.createElement("section");
        section.classList.add("recipe");
        instrumentsDiv.append(section);

        const a = document.createElement("a");
        a.href = "#";
        section.append(a);

        const h3 = document.createElement("h3");
        h3.innerHTML = instrument.name;
        a.append(h3);

        const img = document.createElement("img");
        section.append(img);
        img.src = "https:node-project2-zj8p.onrender.com" + instrument.img;
        

        a.onclick = (e) => {
            // const recipeDetails = document.getElementById("recipe-details");
            // recipeDetails.innerHTML = "";
            // const p = document.createElement("p");
            // recipeDetails.append(p);
            // p.innerHTML = recipe.description;
            e.preventDefault();
            displayDetails(instrument);
        };
    });
};

const displayDetails = (instrument) => {
    const instrumentDetails = document.getElementById("recipe-details");
    instrumentDetails.innerHTML = "";

    const h3 = document.createElement("h3");
    h3.innerHTML = instrument.name;
    instrumentDetails.append(h3);

    const dLink = document.createElement("a");
    dLink.innerHTML = "&#x2715;"
    instrumentDetails.append(dLink);
    dLink.id = "delete-link";

    const eLink = document.createElement("a");
    eLink.innerHTML = "&#9998;"
    instrumentDetails.append(eLink);
    eLink.id = "edit-link";
    
    const p = document.createElement("p");
    instrumentDetails.append(p);
    p.innerHTML = "<b>Instrument Desciption:</b> " + instrument.description;

    const p3 = document.createElement("p");
    instrumentDetails.append(p3);
    p3.innerHTML = "<b>Instrument Material:</b> " + instrument.material;

    const p2 = document.createElement("p");
    instrumentDetails.append(p2);
    p2.innerHTML = "<b>Instrument Parts:</b> " + instrument.parts;

    eLink.onclick = (e) => {
        e.preventDefault();
        document.querySelector(".dialog").classList.remove("transparent");
        document.getElementById("add-edit-title").innerHTML = "Edit Instrument";
    }

    dLink.onclick = (e) => {
        e.preventDefault();
    }

    populateEditForm(instrument);

}
const populateEditForm = (instrument) => {};

const addEditInstrument = async (e) => {
    e.preventDefault();

    const form = document.getElementById("add-edit-instrument-form");
    const formData = new FormData(form);
    formData.append("parts", getParts());
    console.log(...formData);

    let response;

    // const instrumentDetails = document.getElementById("recipe-details");
    // instrumentDetails.innerHTML = "";
    // instrumentDetails.append(...formData)

    // console.log(form.instrumentId.value > 0 && form.instrumentId.value.length);
    if(form._id.value == -1) {
        formData.delete("_id");
        formData.delete("img");
        console.log(...formData);

        response = await fetch("/api/recipes", {
            method: "POST",
            body: formData,
        });
    } else {
        // console.log("editting");
        response = await fetch(`/api/recipes/${form._id.value}` , {
            method: "PUT",
            body: formData,
        });
    }

    if(response.status != 200) {
        console.log("Error contacting server");
        return;
    }

    document.querySelector(".dialog").classList.add("transparent");
    resetForm();
    showInstruments();
};

// const getInstrument = async(instrumentId) => {
//     let response = await fetch( `/api/recipes/${instrumentId}`);
//     if (response.status != 200) {
//         console.log("Error retrieving recipe");
//         return;
//     }
//     return await response.json();
// }

const getParts = () => {
    const inputs = document.querySelectorAll("#part-boxes input");
    const parts = [];

    inputs.forEach((input)=> {
        parts.push(input.value);
    });
    return parts;
}

const resetForm = () => {
    const form = document.getElementById("add-edit-instrument-form");
    form.reset();
    form._id ="-1";
    document.getElementById("part-boxes").innerHTML = "";
};

const showHideAdd = (e) => {
    e.preventDefault();
    document.querySelector(".dialog").classList.remove("transparent");
    document.getElementById("add-edit-title").innerHTML = "Add A New Instrument";
    resetForm();
};

const addPart = (e) => {
    e.preventDefault();
    const partBoxes = document.getElementById("part-boxes");
    const input = document.createElement("input");
    input.type = "text";
    partBoxes.append(input);
};

window.onload = () => {
    showInstruments();
    document.getElementById("add-edit-instrument-form").onsubmit = addEditInstrument;
    document.getElementById("add-link").onclick = showHideAdd;

    document.querySelector(".close").onclick = () => {
        document.querySelector(".dialog").classList.add("transparent");
    };

    document.getElementById("add-part").onclick = addPart;
};