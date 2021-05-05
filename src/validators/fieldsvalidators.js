const Joi = require("joi");
const schema = Joi.object({
    photo: Joi.string().uri().required(),
    name: Joi.string().min(1).max(30).pattern(new RegExp("^[a-zA-Z]+$")).required(),
    lastname: Joi.string().min(1).max(30).pattern(new RegExp("^[a-zA-Z]+$")).required(),
    dob: Joi.date().required(),
    job: Joi.string().min(1).max(30).required(),
    bio: Joi.string().min(1).max(400).required(),
});

//schema anterior con las validaciones

function validate(body) {
    return schema.validate({
        photo: body.photo,
        name: body.name,
        lastname: body.lastname,
        dob: body.dob,
        job: body.job,
        bio: body.bio,
     }, {abortEarly: false})
  }
 
 module.exports = {
     validate
  }