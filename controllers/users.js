const Person = require('../db')

//Obtiene los contactos de la agenda 
const getContacts = (require, response) => {

  Person.find({}).then(result => {
    
    return response.status(200).json({
      message: 'Contactos obtenidos con exito',
      success: true,
      result
    })
  }).catch(error => {
    console.log(error.message)
    return response.status(500).json({
      message: 'Ocurrior un error en el servidor',
      success: false
    })
  })
}

const information = (require, response) => {
    const now = new Date()
    const numberUsers = usuarios.length

    return response.status(200).send(`
        <p>Phonebook has into for ${numberUsers} people </p>
        <br />
        <p>${now} </p>
        `)
}

const getContact = (request, response) => {
  const id = Number(request.params.id)
  const contact = usuarios.find(user => user.id === id)
  if(!contact){
    return response.status(404).json({
      message: 'El contacto no se encuentra registrado',
      success: false
    })
  }

  return response.status(200).json({
    message:'Se obtuvo con exito el contacto',
    success: true,
    contact
  })
}

const deleteContact = (request, response) => {
  const id = request.params.id

  Person.findOneAndDelete({_id:id}).then(result => {
    if(result){
      return response.status(200).json({
        message: 'Contacto eliminado con exito',
        success: true
      })
    }

    return response.status(404).json({
      message: 'El usuario no se encuentra registrado',
      success: false
    })
  }).catch(error => {
    return response.status(400).json({
      message: 'Formato de id incorrecto',
      success: false
    })
  })
}

const addContact = (request, response) => {
  const {name, number }= request.body
  if(!name || !number){
    return response.status(400).json({
      message: 'Faltan datos obligatorios',
      success: false
    })
  }

  const contact = new Person({
    name: name,
    number: number
  })

  contact.save().then(result => {
    return response.status(200).json({
      message: 'Contacto agregado con exito',
      success: true
    })
  }).catch(err => {

    return response.status(400).json({
      message: err.message,
      success: false
    })
  })
}

module.exports = {getContacts, information, getContact, deleteContact, addContact}