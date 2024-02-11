const { createId, checkValidId } = require("./helpers");
const express = require("express");
const router = express.Router();

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

router.get("/", function (req, res) {
  res.status(200).json(data);
});

router.get("/:id", function (req, res) {
  let found = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });
  console.debug(found);
  if (checkValidId(req.params.id)){
    if (found) {
        res.status(200).json(found);
      } else {
        res.sendStatus(404);
      }
  } else {
    res.sendStatus(400);
  }
});

router.post('/', function(req, res){
    const item = req.body;
    if (req.body.username && req.body.age && req.body.hobbies){
        console.debug({id: createId(data), ...item});
        data.push({id: createId(data), ...item});
        res.status(201).json({id: createId(data), ...item});
    } else {
        res.sendStatus(400);
    }
})

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
      });
    if (checkValidId(req.params.id)){
        if(found){
            data = data.filter(i => i.id !== id);
            console.debug(data)
            res.status(204);
        } else {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(400);
    }
});

router.put('/:id', function(req, res){
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (checkValidId(req.params.id)){
        if(found){
            found.username = req.body.username || found.username;
            found.age = req.body.age || found.age;
            found.hobbies = req.body.hobbies || found.hobbies;
            console.debug(found)
            res.status(200).json(found);
        } else {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(400);
    }
})

module.exports = router;