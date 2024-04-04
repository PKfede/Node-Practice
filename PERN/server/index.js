const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")

//middle
app.use(cors())
app.use(express.json())

//routes

//create

app.post("/todos", async (req, res) => {
    try {

        const { description } = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description])
        res.json(newTodo.rows[0])

    } catch (error) {
        console.log(err.message);
    }
})

//get all

app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (error) {
        console.log(err.message);
    }
})

//get a

app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params
        const todo = await pool.query("SELECT * FROM todo where todo_id = $1", [id])
        res.json(todo.rows[0])
    } catch (error) {
        console.log(err.message);
    }
})

//update

app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body
        const updateTodos = await pool.query("UPDATE todo SET description =$1 WHERE todo_id = $2", [description, id])
        res.json("todo was updated")
    } catch (error) {
        console.log(err.message);
    }
})

//delete 

app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
        res.json("todo was deleted")
    } catch (error) {
        console.log(err.message);
    }
})


app.listen(5000, () => {
    console.log("server has starter port 5000")
})