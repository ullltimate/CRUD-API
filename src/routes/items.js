// import required essentials
const express = require("express");
// create new router
const router = express.Router();

// create a JSON data array
let data = [
  {
    id: 1,
    username: 'catty',
    age: 18,
    hobbies: 'tennis',
  },
  {
    id: 2,
    username: 'daddy',
    age: 20,
    hobbies: 'swimming',
  },
  {
    id: 3,
    username: 'user123',
    age: 22,
    hobbies: 'running',
  },
  {
    id: 4,
    username: 'user432',
    age: 36,
    hobbies: '',
  },
  {
    id: 5,
    username: 'hobbit',
    age: 19,
    hobbies: 'smoke',
  },
];

// this end-point of an API returns JSON data array
router.get("/", function (req, res) {
  res.status(200).json(data);
});

// this end-point returns an object from a data array find by id
// we get `id` from URL end-points
router.get("/:id", function (req, res) {
  // find an object from `data` array match by `id`
  let found = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });
  console.debug(found)
  // if object found return an object else return 404 not-found
  if (found) {
    res.status(200).json(found);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', function(req, res){
    const item = req.body;
    if (req.body.username && req.body.age && req.body.hobbies){
        console.debug({id: createId(), ...item});
        data.push({id: createId(), ...item});
        res.status(201).json({id: createId(), ...item});
    } else {
        res.sendStatus(400);
    }
})

router.delete('/:id', (req, res) => {
    // Reading isbn from the URL
    const id = Number(req.params.id);

    console.debug(id);
    // Remove item from the books array
    data = data.filter(i => {
        if (i.id !== id) {
            return true;
        }
        return false;
    });
    console.debug(data)
    res.send('Item is deleted');
});

function createId(){
    let newId = data[data.length-1].id + 1;
    return newId;
}

//router.put('/:id', function(req, res){
//    const item = req.body;
//    console.debug(item);
//    //console.log(item);
//    data.push(item);
//    res.send('Items is added to the database');
//})

module.exports = router;