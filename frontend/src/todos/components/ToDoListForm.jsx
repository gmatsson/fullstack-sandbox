import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/styles'
import {TextField, Card, CardContent, CardActions, Button, Typography} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import {Done} from "@material-ui/icons";
import axios from "axios";

const useStyles = makeStyles({
    card: {
        margin: '1rem'
    },
    todoLine: {
        display: 'flex',
        alignItems: 'center'
    },
    textField: {
        flexGrow: 1
    },
    standardSpace: {
        margin: '8px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    }
})

export const ToDoListForm = ({toDoList, saveToDoList}) => {
    const classes = useStyles()
    const [todos, setTodos] = useState(toDoList.todos)

    useEffect(() => {
        (async () =>
        {
            try {
                const body = {id: toDoList.id, todos: todos}
                await axios.put('http://localhost:3001/saveTodos', body);
                saveToDoList(toDoList.id, {todos})
            } catch (e) {
                console.log(e)
            }
        })()

    }, [todos])

    const handleSubmit = event => {
        event.preventDefault()
    }
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography component='h2'>
                    {toDoList.title}
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form}>
                    {todos.map((todo, index) => (
                        <div key={index} className={classes.todoLine}>
                            <Typography className={classes.standardSpace} variant='h6'>
                                {index + 1}
                            </Typography>
                            <TextField
                                disabled={todo.done}
                                label='What to do?'
                                value={todo.content}
                                onChange={event => {
                                    setTodos([ // immutable update
                                        ...todos.slice(0, index),
                                        {content: event.target.value, done: todo.done},
                                        ...todos.slice(index + 1)
                                    ])
                                }}
                                className={classes.textField}
                            />
                            <Button
                                size='small'
                                color='primary'
                                className={classes.standardSpace}
                                onClick={() => {
                                    setTodos([ // immutable delete
                                        ...todos.slice(0, index),
                                        {content: todo.content, done: !todo.done},
                                        ...todos.slice(index + 1)
                                    ])
                                }}
                            >
                                <Done/>
                            </Button>
                            <Button
                                size='small'
                                color='primary'
                                className={classes.standardSpace}
                                onClick={() => {
                                    setTodos([ // immutable change
                                        ...todos.slice(0, index),
                                        {content: todo.content, done: !todo.done},
                                        ...todos.slice(index + 1)
                                    ])
                                }}
                            >
                                <DeleteIcon/>
                            </Button>
                        </div>
                    ))}
                    <CardActions>
                        <Button
                            type='button'
                            color='primary'
                            onClick={() => {
                                setTodos([...todos, {content: '', done: false}])
                            }}
                        >
                            Add Todo <AddIcon/>
                        </Button>
                        <Button type='submit' variant='contained' color='primary'>
                            Save
                        </Button>
                    </CardActions>
                </form>
            </CardContent>
        </Card>
    )
}
