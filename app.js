const express = require('express');
const app = express();

const {apiRouter} = require('./routes/api-router');


app.use(express.json());
app.use('/api', apiRouter);



app.use('/*', (req, res, next) => {
    
    res.status(404).send({msg: 'Path not found'})
})

app.use((err, req, res, next) => {
    if(err.code === '23503')  res.status(404).send({msg: 'article not found'})
    if(err.code === '22P02') res.status(422).send({msg: 'Invaild Input'})
    if(err.code === '42703') res.status(400).send({msg: 'Bad Request'})
    if(err.status) res.status(err.status).send({msg: err.msg})
    //console.log(err)

    res.status(500).send({msg: 'SERVER ERROR'})
})


module.exports = app;