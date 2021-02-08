const charsNumsSpaceComma = new RegExp('^[A-Za-z0-9, ]*$')

export const modelValidation = (name) => {
  let valid = true
  let message

  if (!charsNumsSpaceComma.test(name)){
    valid = false
    message = 'Invalid characters'
  }else if (name.length>=50){
    valid = false
    message = 'Maximum length exceeded'
  }else if (name.length==0){
    valid = false
    message = 'Model name may not be empty'
  }
  return {
    valid,
    message
  }
}

export const tagValidation = (tags, oldTagLength) => {
  let valid = true
  let message

  if (!charsNumsSpaceComma.test(tags)){
    valid = false
    message = 'Invalid characters'
  }else if (tags.length + oldTagLength >= 255){
    valid = false
    message = 'Maximum length of all tags exceeded'
  }
  return {
    valid,
    message
  }
}
