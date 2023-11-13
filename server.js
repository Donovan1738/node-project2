const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

let instruments = [
    {
        id: 1,
        name: "Piano",
        description: "A delicate instrument that creates sound by hammers hitting strings",
        material: "Maple wood",
        img: "images/piano.jpg",
        parts: [
            "Keys",
            "Strings",
            "Pedals",
            "Hammers",
            "Dampers",
            "Frame",
        ],
    },
    { 
        id: 2,
        name: "Guitar",
        description: "A stringed instrument",
        material: "Spruce wood",
        img: "images/guitar.jpg",
        parts: [
            "Strings",
            "Frets",
            "Fretboard",
            "Tuners",
            "Stringpost",
            "Neck"
        ],
    },
    { 
        id: 3,
        name: "Drumset",
        description: "An instrument that creates rythms and holds the beat",
        material: "Birch wood",
        img: "images/drum.jpg",
        parts: [
            "Snare drum",
            "Hi-hat",
            "Crash cymbal",
            "Ride Cymbal",
            "Low tom",
            "High Tom",
        ],
    },
    { 
        id: 4,
        name: "Saxophone",
        description: "A woodwind instrument",
        material: "Brass",
        img: "images/sax.jpg",
        parts: [
            "Neck",
            "Body",
            "Reed",
            "Bell",
            "Mouth Piece",
            "Key Pearls",
        ],
    },
    { 
        id: 5,
        name: "Xylophone",
        description: "A percussion instrument made of wood",
        material: "Rosewood",
        img: "images/exylo.jpg",
        parts: [
            "Bars",
            "Resonating tubes",
            "Mallets",
            "Wheels",
            "Wood",
            "Keys",
        ],
    },
    {
        id: 6,
        name: "Trumpet",
        description: "A brass instrument",
        material: "Brass",
        img: "images/trumpet.jpg",
        parts: [
            "Mouth piece",
            "Lead pipe",
            "Bell",
            "Tuning slide",
            "Pistons",
            "Valves",
        ],
    },
];

app.get("/api/recipes", (req, res) => {
    res.send(instruments);
});

app.post("/api/recipes", (req,res) => {
    const result = validateInstrument(req,body);

    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    console.log(req.body.parts);
    const instrument = {
        id: instruments.length + 1,
        name: req.body.name,
        description: req.body.description,
    };

    if (req.body.parts) {
        instrument.parts = req.body.parts.split(",");
    }

    instruments.push(instrument);
    res.send(instrument);
});

const validateInstrument = (instrument) => {
    const schema = Joi.object({
        id: Joi.allow(""),
        name: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),
        parts: Joi.allow(),
    });

    return schema.validate(instrument);
};

app.listen(3000, () => {
    console.log("I'm listening");
});