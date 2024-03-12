import app from './app';

app.listen(process.env.PORT_DEV, () => {
    console.log(`Server is working at http://localhost:${process.env.PORT_DEV}`)
})