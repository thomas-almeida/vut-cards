function translateRole(role) {

  let translatedRole = ''

  if (role == 'Duelist') {
    translatedRole = 'Duelista'
  } else if (role == 'Controller') {
    translatedRole = 'Controlador'
  } else if (role == 'Initiator') {
    translatedRole = 'Iniciador'
  } else if (role == 'Sentinel') {
    translatedRole = 'Sentinela'
  }

  return translatedRole
}

export default {
  translateRole
}