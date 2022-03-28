const mongoose = require("mongoose");
var express = require("express");
var router = express.Router();

const EventSchema = new mongoose.Schema({
  project_name: String,
  project_manager: String,
  report_date: String,
  project_start_date: String,
  project_end_date: String,
  milestones: [{
    task_name: String,
    assign_to: String,
    task_status: String,
    deadline: String,

  }]
});

//Model:
const Events = mongoose.model("Events", EventSchema);

router.get("/event/getmany", async function (req, res) {
  const events = await Events.find();
  res.send(events);
});

router.get("/event/:id", async function (req, res) {
  const event = await Events.findById(req.params.id);
  if (!event) {
    res.status(404).send("event not found");
  }
  res.send(event);
});

router.get("/event/upcoming/events", async function (req, res) {
  const events = await Events.find()
    .sort({ 'report_date': 'desc' }).limit(3);
  res.send(events);
});

router.get("/event/manager/top4", async function (req, res) {
  const events = await Events.find({}, ['project_manager']).limit(4);
  res.send(events);
});


router.post("/event", async function (req, res) {
  const { project_name, project_manager, project_start_date, project_end_date, report_date } = req.body

  let event = new Events({
    project_manager: project_manager,
    project_name: project_name,
    project_start_date: project_start_date,
    project_end_date: project_end_date,
    report_date: report_date
  });
  event = await event.save();

  res.send(event);
});

router.put("/event/:id", async function (req, res) {
  const { project_name, project_manager, project_start_date, project_end_date, report_date, milestones } = req.body
  const event = await Events.findByIdAndUpdate(
    req.params.id,
    {
      project_manager: project_manager,
      project_name: project_name,
      project_start_date: project_start_date,
      project_end_date: project_end_date,
      report_date: report_date,
      milestones: milestones
    },
    { new: true }
  );

  if (!event) {
    res.status(404).send("event not found");
  }

  res.send(event);
});

router.delete("/event/:id", async function (req, res) {
  const event = await Events.findByIdAndRemove(req.params.id);
  if (!event) {
    res.status(404).send("event not found");
  }

  res.send(event);
});

router.get("/event/search/:searchTerm", async function (req, res) {
  let regex = new RegExp(req.params.searchTerm, 'i');
  const event = await Events.find({ $or: [{ project_name: regex }, { project_manager: regex }] });

  if (!event) {
    res.status(404).send("event not found");
  }

  res.send(event);
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});
//Model:
const Users = mongoose.model("Users", UserSchema);
try {
  let user = Users.findOne({ username: 'bob', password: '1234' }).exec((err, user) => {
    console.log("user", user);
    console.log("error", err);
    if (!err && !user) {

      let user = new Users({ username: 'bob', password: '1234' });
      user.save();

    }
    else {
      console.log(err);
    }

  });;

  Users.findOne({ username: 'jhon', password: '1234' }).exec((err, user) => {
    console.log("user", user);
    console.log("error", err);
    if (!err && !user) {

      let user = new Users({ username: 'jhon', password: '1234' });
      user.save();

    }
    else {
      console.log(err);
    }

  });;

  Users.findOne({ username: 'joe', password: '1234' }).exec((err, user) => {
    console.log("user", user);
    console.log("error", err);
    if (!err && !user) {

      let user = new Users({ username: 'joe', password: '1234' });
      user.save();

    }
    else {
      console.log(err);
    }

  });;



}
catch (ex) {

}


router.get("/user/getmany", async function (req, res) {
  const users = await Users.find();
  res.send(users);
});
router.post("/user/login", async function (req, res) {
  const { username, password } = req.body;
  const user = await Users.findOne({ username: username, password: password });
  if (user) {
    res.send(200);
    return
  }
  else {
    res.send(404);
    return
  }
});

module.exports = router;

