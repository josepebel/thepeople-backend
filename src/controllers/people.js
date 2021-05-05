const controller = {};
const People = require("../models/people");
const validator = require("../validators/fieldsvalidators");


controller.savePerson = async (req, res) => {
  let photo = req.body.photo;
  let name = req.body.name;
  let lastname = req.body.lastname;
  let dob = req.body.dob;
  let job = req.body.job;
  let bio = req.body.bio;

  const validation = validator.validate(req.body);

  if (validation.error) {
    const errors = [];
    for (let index = 0; index < validation.error.details.length; index++) {
      errors.push(validation.error.details[index].message);
    }
    console.log(validation.error);
    res.status(400).send(errors);
    return;
  }

  if (photo && name && lastname && dob && job && bio) {
    try {
      const person = new People({
        photo: photo,
        name: name,
        lastname: lastname,
        dob: dob,
        job: job,
        bio: bio,
      });

      await person.save();
      res.status(204).send();
      
    } catch (err) {
      res.status(500).send(err);
    }
  } 
};


// Devuelve todas las series

// controller.getSeries = async (req, res) => {
//   try {
//     const series = await Serie.find();
//     res.json(series);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

//Devuelve profile filtrada por nombre

// controller.getPeople = async (req, res) => {
//     const filter = req.query.filter
//   try {
//     const people = await People.find({name: new RegExp(filter, "i")});
//     res.json(people);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

//Devuelve filtrado por dos campos

controller.getPeople = async (req, res) => {
  const filter = req.query.filter;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  let query;

  if (filter && startDate && endDate) {
    query = {
      $and: [
        {
          $or: [
            {
              name: new RegExp(filter, "i"),
            },
            {
              lastname: new RegExp(filter, "i"),
            },
          ],
        },
        {
          dob: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      ],
    };
  } else if (!filter && startDate && endDate) {
    query = {
      dob: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };
  } else if (filter && !startDate && !endDate) {
    query = {
      $or: [
        {
          name: new RegExp(filter, "i"),
        },
        {
          lastname: new RegExp(filter, "i"),
        },
      ],
    };
  } else if (!filter && !startDate && !endDate) {
    query = {};
  }

  try {
    const people = await People.find(query);
    res.json(people);
  } catch (err) {
    res.status(500).send(err);
  }
};

//Devuelve filtrado por fecha

// controller.getPeopleDate = async (req, res) => {
//   // const filter = req.query.filter;

//   const startDate = new Date(req.query.startDate);
//   const endDate = new Date(req.query.endDate);

//   const query = {
//     dob: {
//       $gte: startDate,
//       $lt: endDate,
//     },
//   };

//   try {
//     const people = await People.find(query);
//     res.json(people);
//     console.log(startDate);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

controller.getPerson = async (req, res) => {
  const id = req.params.ident;
  if (id) {
    try {
      const person = await People.findById(id);
      res.json(person);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send();
  }
};

controller.updatePerson = async (req, res) => {
  let photo = req.body.photo;
  let name = req.body.name;
  let lastname = req.body.lastname;
  let dob = req.body.dob;
  let job = req.body.job;
  let bio = req.body.bio;

  const id = req.params.id;

  const validation = validator.validate(req.body);

  if (validation.error) {
    const errors = [];
    for (let index = 0; index < validation.error.details.length; index++) {
      errors.push(validation.error.details[index].message);
    }
    console.log(validation.error);
    res.status(400).send(errors);
    return;
  }

  if (photo && name && lastname && dob && job && bio) {
    try {
      await People.findByIdAndUpdate(id, {
        photo: photo,
        name: name,
        lastname: lastname,
        dob: dob,
        job: job,
        bio: bio,
        updatedAt: Date.now(),
      });
      res.status(204).send();
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send();
  }
};

controller.deletePerson = async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      await People.findByIdAndDelete(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send();
  }
};

module.exports = controller;
