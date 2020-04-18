const express = require('express');
const path = require('path');
const app = express();

let contacts = [];

app.use(express.json());

//GET
app.get('/api/contacts', (req, res) => {
    res.status(200).json(contacts); 
});

//POST
app.post('/api/contacts', (req, res) => {
   const contact = {...req.body, id: Date.now(), marked: false,};
   contacts.push(contact);
   res.status(201).json(contact); 
});

//PUT
app.put('/api/contacts/:id', (req, res) => {
    const changeContactIndex = contacts.findIndex(contact => contact.id === req.body);
    contacts[changeContactIndex] = req.body;
    res.json(contacts[changeContactIndex]);

});

//DELETE
app.delete('/api/contacts/:id', (req, res) => {
    contacts = contacts.filter(c => c.id !== req.params.id);
    res.status(200).json({message: 'Contact did delete'});
});

app.use(express.static(path.resolve(__dirname, 'clients')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'clients', 'index.html'));
});

app.listen(3000, () => console.log('HTTP server listen 3000 port...'));