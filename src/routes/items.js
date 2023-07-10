// import required essentials
const express = require("express");
// create new router
const router = express.Router();

// create a JSON data array
let data = [
  {
    id: 1,
    title: "Create a project",
    order: 1,
    completed: true,
    createdOn: new Date(),
  },
  {
    id: 2,
    title: "Take a cofféé",
    order: 2,
    completed: true,
    createdOn: new Date(),
  },
  {
    id: 3,
    title: "Write new article",
    order: 3,
    completed: true,
    createdOn: new Date(),
  },
  {
    id: 4,
    title: "Walk toward home",
    order: 4,
    completed: false,
    createdOn: new Date(),
  },
  {
    id: 5,
    title: "Have some dinner",
    order: 5,
    completed: false,
    createdOn: new Date(),
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
    console.debug(item);
    //console.log(item);
    data.push(item);
    res.send('Items is added to the database');
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

//router.put('/:id', function(req, res){
//    const item = req.body;
//    console.debug(item);
//    //console.log(item);
//    data.push(item);
//    res.send('Items is added to the database');
//})

module.exports = router;