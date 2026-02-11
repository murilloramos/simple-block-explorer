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

app.get("/block/:hash/txs", async (req, res) => {
    const { hash } = req.params

    try {
        const response = await axios.get(
            `https://blockstream.info/api/block/${hash}/txs`
        )
        res.json(response.data)
    } catch (err) {
        res.status(500).send("Error fetching block")
    }
})

app.get("/ui", async (req, res) => {
    const blocks = await axios.get(
        "https://blockstream.info/api/blocks"
    )

    let html = `<h1>Bitcoin  Explorer</h1>`

    blocks.data.forEach(block => {
        html += `
            <div>
                <a href="block/${block.id}">
                    Block ${block.height}
                </a>
            </div>
        `
    })

    res.send(html)
})