

let usuarios = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

//Obtiene los contactos de la agenda 
const getContacts = (require, response) => {

    response.status(200).json({
        message: 'Usuarios obtenidos con exito',
        success: true,
        usuarios
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
  const id = Number(request.params.id)
  const contact = usuarios.find(user => user.id === id)
  if(!contact){
    return response.status(404).json({
      message: 'El contacto que intentas eliminar no se encuentra registrado',
      success: false
    })
  }

  usuarios = usuarios.filter(user => user.id !== id)
  return response.status(200).json({
    message: "Usuario eliminado con exito",
    success: true
  })
}

const addContact = (request, response) => {
  const contact = request.body
  if(!contact.name || !contact.number){
    return response.status(400).json({
      message: 'Faltan datos obligatorios',
      success: false
    })
  }

  if(contact.name){
    const user = usuarios.find(user => user.name === contact.name)
    if(user){
      return response.status(409).json({
        message: 'El usuario ya se encuentra registrado',
        success: false
      })
    }
  }

  const id = usuarios.length > 0 
    ? Math.max(...usuarios.map(user => user.id))
    :0

  const newContact = {
    name: contact.name,
    number: contact.number,
    id: id + 1
  }

  usuarios = usuarios.concat(newContact)

  return response.status(200).json({
    message: 'Usuario creado con exito',
    success: true
  })
}

module.exports = {getContacts, information, getContact, deleteContact, addContact}