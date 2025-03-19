const Person = require('../db')

//Obtiene los contactos de la agenda 
const getContacts = (request, response) => {

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

const information = (request, response) => {
    const now = new Date()


    Person.find({}).then(result => {
      return response.status(200).send(`
          <p> Phonebook has into for ${result.length} people </p>
          <br/>
          <p>${now} </p>
        `)
    }).catch(error => {
      return response.status(500).json({
        message: 'Ocurrio un error en el servidor',
        success: false
      })
    })
}

const getContact = (request, response) => {
  const id = request.params.id

  Person.findById(id).then(result => {
    if(result){
      return response.status(200).json({
        message: 'Usuario obtenido con exito',
        success: true,
        result
      })
    }

    return response.status(404).json({
      message: 'El usuario no se encuentra registrado',
      success: false
    })
  }).catch(error => {
    console.log(error)
    return response.status(400).json({
      message: 'Mal formato de id',
      success: false
    })
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


const updateContact = (request, response) => {
  const id = request.params.id
  const {name, number} = request.body

  Person.findByIdAndUpdate({_id: id},{name, number}, {new: true, runValidators:true, context:'query'})
  .then(result => {
    if(result){
      return response.status(200).json({
        message: 'Contacto agregado con exito',
        success: true
      })
    }

    return response.status(404).json({
      message: 'Contacto No se encuentra registrado',
      success: true
    })
  }).catch(error => {
    return response.status(400).json({
      message: error.message,
      success: false
    })
  })
}

module.exports = {getContacts, information, getContact, deleteContact, addContact, updateContact}