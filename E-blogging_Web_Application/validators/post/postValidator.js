const {body} = require('express-validator')
const cheerio = require('cheerio')

/**
 * Create Post validation 
 * Validate all and stored into PostValidation Array
 */
const postValidation = [

   //validation post title
   body('title') 
   .not().isEmpty().withMessage('Please Provide a Title')
   .isLength({max:100}).withMessage('Title Length Must be less than 100'),

   //validation post body
   body('body')
   .not().isEmpty().withMessage('Please Provide Post Body')
   .custom(value=>{

    let node =cheerio.load(value)
    let text =node.text()

    if(text.length>5000){
        throw new Error('Length must be less than 5000')
    }
    return true

   })


]


module.exports = postValidation