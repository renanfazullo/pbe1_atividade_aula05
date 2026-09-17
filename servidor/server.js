const express = require("express")
const inventario = require("../bens.json")

const mostrarInventario = (req, res) => {
    res.send(inventario)
}

const novoItem = (req, res) => {
    if (req.body) {
        const novoId = inventario.length + 1

        const item = {
            id: novoId,
            item: req.body.item,
            local: req.body.local,
            dataRegistro: req.body.dataRegistro,
            valor: req.body.valor,
            patrimonio: req.body.patrimonio
        }

        inventario.push(item)

        res.send("Item cadastrado com sucesso.")
    } else {
        res.send("Erro ao receber item")
    }
}

const mostrarItem = (req, res) => {
    const id = req.params.id

    const item = inventario.find((item) => item.id == id)

    if (item) {
        res.send(item)
    } else {
        res.status(404).send("Item não encontrado")
    }
}

const excluirItem = (req, res) => {
    const id = req.params.id

    inventario.forEach((item, indice) => {
        if (item.id == id) {
            inventario.splice(indice, 1)
        }
    })

    res.send("Item excluído com sucesso.")
}

const alterarItem = (req, res) => {
    const id = req.params.id
    const dados = req.body

    inventario.forEach((item) => {
        if (item.id == id) {
            item.item = dados.item
            item.local = dados.local
            item.dataRegistro = dados.dataRegistro
            item.valor = dados.valor
            item.patrimonio = dados.patrimonio
        }
    })

    res.send("Item atualizado com sucesso!")
}

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const porta = 3000

app.get("/inventario", mostrarInventario)
app.post("/inventario", novoItem)
app.get("/inventario/:id", mostrarItem)
app.delete("/inventario/:id", excluirItem)
app.put("/inventario/:id", alterarItem)

app.listen(porta, () => {
    console.log(`Servidor: http://127.0.0.1:${porta}`)
})