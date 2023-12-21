require('dotenv').config();
const mongoose=require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true,useUnifiedTopology: true });
const { Schema }=mongoose;
// Create a person schema called personSchema with the following shape:

// A required name field of type String
// An age field of type Number
// A favoriteFoods field of type [String]
// Use the Mongoose basic schema types. If you want you can also add more fields, use simple validators
//  like required or unique, and set default values. See our Mongoose article.

// Now, create a model from the personSchema and assign it to the existing variable Person.

var personSchema = new Schema({
  name:{ type:String, require:true },
  age: Number,
  favoriteFoods:[String] 

})
var Person=mongoose.model("Person",personSchema)

// let Person;
const createAndSavePerson = (done) => {
   var everyDev= new Person({
    name:"every dev",
    age: 29,
    favoriteFoods:["pasta","crembo"] 
  });
  everyDev.save(function(err, data) {
    if(err) return console.error();
    done(null , data);
    
  })
  };

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(err, Persons)=> {
    if(err) return console.error();
    done(null , Persons);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},(err, Persons)=> {
    if(err) return console.error();
    done(null , Persons);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},(err,persons)=>{
    if(err) return console.error();
    done(null, persons)
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId ,(err, persons)=>{
  if(err) return console.error();  
  done(null , persons)
  });
};

const findEditThenSave = (personId, done) => { 
  const foodToAdd = "hamburger";
  Person.findById(personId,(err,person)=>{
    if(err) return console.error();

    person.favoriteFoods.push(foodToAdd);

    person.save((err,person)=>{
      if(err) return console.error();
      done(null,person)
    })
  })

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},
      {age:20},
      { new: true },
      (err,person)=>{ 
        if(err)return console.error()
        done(null, person)
  })


};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,
    (erorr,person)=>{ 
      if(erorr)return console.error()
      done(null, person)
})
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove},(erorr,removed)=>{
    if(erorr) return console.error();
    done(null,removed)
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch})
        .sort({name:'asc'})
        .limit(2)
        .select('-age')
        .exec((erorr, result)=>{
            if(erorr) return console.error(); 
            done(null ,result);
          }) 
        };

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
