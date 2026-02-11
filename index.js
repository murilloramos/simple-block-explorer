const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("The Bitcoin Explorer is running!!!")
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});

app.get("/blocks", async (req, res) => {
    try {
        const response = await axios.get(
            "https://blockstream.info/api/blocks"
        )
        res.json(response.data)
    } catch (err) {
        res.status(500).send("Error fetching blocks")
    }
})

app.get("/block/:hash", async (req, res) => {
    const { hash } = req.params

    try {
        const response = await axios.get(
            `https://blockstream.info/api/block/${hash}`
        )
        res.json(response.data)
    } catch (err) {
        res.status(500).send("Error fetching block")
    }
})