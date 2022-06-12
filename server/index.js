const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./Models/user.model");
const { db } = require("./Models/user.model");
const TaskModel = require("./Models/task.model");
const NotesModel = require("./Models/notes.model");
const ProjectModel = require("./Models/project.model");
const fetch = require("node-fetch");

app.use(cors());
app.use(express.json());

// use Swagger UI for API docs
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//mongoose.connect() line has been redacted.

async function checkComplete(projectId) {
  var relatedTasks = [];
  let completeTasks = 0;
  const tasks = await TaskModel.find({ relatedProject: projectId });

  for (const task of tasks) {
    relatedTasks.push(task._id);

    if (task.completed) {
      completeTasks++;
    }
  }
  var completion = 0;

  if (relatedTasks.length) {
    completion = completeTasks / relatedTasks.length;
  }

  return completion;
}

// custom error handling
function errorHandler(errors) {
  let errorsFormatted = {};
  const errorMessage = errors.slice("25").split(", ");
  errorMessage.map((error) => {
    const key = error.slice(0, error.indexOf(":"));
    const value = error.slice(error.indexOf(":") + 2);
    errorsFormatted[key] = value;
  });

  return errorsFormatted;
}

// GET - retrieve the 7-day weather forecast for the User with public IP address
app.get("/weather/:ip", async (req, res) => {
  var forecast = await fetch(
    "http://api.weatherapi.com/v1/forecast.json?key=3afc36f211494fa98e8155239222503&q=" +
      req.params.ip +
      "&days=3&aqi=yes&alerts=no"
  ).then(function (response) {
    return response.json();
  });

  var now = new Date();
  //now = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

  var weather = [];
  for (const day of forecast.forecast.forecastday) {
    var thisDate = new Date(day.date); // date comes from the weather API in local format
    thisDate = new Date(thisDate.getTime() + now.getTimezoneOffset() * 60000);

    weather.push({
      day: thisDate.toLocaleDateString("en-US", { weekday: "long" }),
      date: day.date,
      iconUrl: "https:" + day.day.condition.icon.replace("64x64", "128x128"),
      maxTemp: day.day.maxtemp_c,
      minTemp: day.day.mintemp_c,
      conditionText: day.day.condition.text,
    });

    if (thisDate < now) {
      var addedHours = 0;
      for (const hour of day.hour) {
        var thisHour = new Date(hour.time);

        if (now < thisHour && addedHours < 3) {
          weather.push({
            hour: thisHour.toLocaleString("en-US", {
              hour: "numeric",
              hour12: true,
            }),
            date: day.date,
            iconUrl: "https:" + hour.condition.icon.replace("64x64", "128x128"),
            temp: hour.temp_c,
            precip_mm: hour.precip_mm,
            conditionText: hour.condition.text,
          });
          addedHours++;
        }
      }
    }
  }
  res.status(200).send(weather);
});

// GET - retrieve the user model
app.get("/user", async (req, res) => {
  if (!("x-api-key" in req.headers)) res.status(403).send("Unauthorized");
  const user = await UserModel.find({ email: req.headers["x-api-key"] });

  // Initialize points attribute of UserSchema
  if (user.points === null) {
    init_points = JSON.stringify({ points: 0 });
    user = await UserModel.findByIdAndUpdate(
      req.headers["x-api-key"],
      init_points,
      { new: true }
    );
    await user.save();
  }
  res.json(user);
});

// PATCH - update user by id
app.patch("/user", async (req, res) => {
  try {
    if (!("x-api-key" in req.headers)) res.status(403).send("Unauthorized");
    let user = await UserModel.findOne({ email: req.headers["x-api-key"] });
    let dbreq = await UserModel.updateOne({ _id: user._id }, req.body);
    user = await UserModel.findOne({ email: req.headers["x-api-key"] });
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR: User ID could not be updated.");
    console.log(error.stack);
  }
});

// GET - retrieve the user's tasks
app.get("/task", async (req, res) => {
  if (!("x-api-key" in req.headers)) res.status(403).send("Unauthorized");

  const tasks = await TaskModel.find({ uid: req.headers["x-api-key"] });
  res.json(tasks);
});

// PATCH - update task by id
app.patch("/task/:id", async (req, res) => {
  try {
    task = await TaskModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send("An unexpected error occurred");
  }
});

// POST - create new task
app.post("/task", async (req, res) => {
  if (!("x-api-key" in req.headers)) res.status(403).send("Unauthorized");

  try {
    const task = req.body;
    task.uid = req.headers["x-api-key"];
    const newTask = new TaskModel(task);
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    console.log(error.stack);
    console.log(error.message);
    res.status(400).send("An unexpected error occurred");
  }
});

// DELETE - delete task by id
app.delete("/task/:id", async (req, res) => {
  if (!("x-api-key" in req.headers)) res.status(403).send("Unauthorized");
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      res.status(404).send("Task not found");

    const task = await TaskModel.findOne({
      uid: req.headers["x-api-key"],
      _id: req.params.id,
    });
    if (!task) res.status(404).send("No task found");
    const deleted_task = await TaskModel.findByIdAndDelete(task.id);
    res.status(200).send();
  } catch (error) {
    res.status(400).send("An unexpected error occurred");
  }
});

// GET - retrieve Project by id
app.get("/project/:id", async (req, res) => {
  if (!("x-api-key" in req.headers)) res.status(403).send("Unauthorized");
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      res.status(404).send("Project not found");

    const project = await ProjectModel.findOne({
      uid: req.headers["x-api-key"],
      _id: req.params.id,
    });
    if (!project) {
      res.status(404).send("Project not found");
      return;
    }

    var completeTasks = 0;
    const tasks = await TaskModel.find({ relatedProject: project._id });
    var relatedTasks = [];
    for (const task of tasks) {
      relatedTasks.push(task["_doc"]);
      if (task["_doc"].completed) {
        completeTasks++;
      }
    }

    var completion = 0;
    if (relatedTasks.length) {
      completion = completeTasks / relatedTasks.length;
    }

    res.json(
      Object.assign({}, project["_doc"], {
        relatedTasks: relatedTasks,
        completionStatus: completion,
      })
    );
  } catch (error) {
    console.log(error.stack);
    res.status(400).send("An unexpected error occurred");
  }
});

// GET - retrieve the user's Projects
app.get("/project", async (req, res) => {
  if (!("x-api-key" in req.headers)) res.status(403).send("Unauthorized");

  const projects = await ProjectModel.find({ uid: req.headers["x-api-key"] });
  var projectsResponse = [];

  for (project of projects) {
    var completeTasks = 0;
    const tasks = await TaskModel.find({ relatedProject: project._id });
    var relatedTasks = [];
    for (const task of tasks) {
      relatedTasks.push(task._id);
      if (task.completed) {
        completeTasks++;
      }
    }

    var completion = 0;
    if (relatedTasks.length) {
      completion = completeTasks / relatedTasks.length;
    }

    var projectResponse = Object.assign({}, project["_doc"], {
      relatedTasks: relatedTasks,
      completionStatus: completion,
    });
    projectsResponse.push(projectResponse);
  }
  res.json(projectsResponse);
});

// POST - create Project
app.post("/project", async (req, res) => {
  if (!("x-api-key" in req.headers)) res.status(403).send("Unauthorized");

  try {
    const project = req.body;
    project.uid = req.headers["x-api-key"];
    const newProject = new ProjectModel(project);
    await newProject.save();
    res.json(newProject);
  } catch (error) {
    console.log(error.stack);
    console.log(error.message);
    res.status(400).send("An unexpected error occurred");
  }
});

// PATCH - update Project by id
app.patch("/project/:id", async (req, res) => {
  try {
    project = await ProjectModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    await project.save();
    res.send(project);
  } catch (error) {
    res.status(400).send("An unexpected error occurred");
  }
});

// POST - check if project is complete
app.post("/project/checkComplete/:id", async (req, res) => {
  if (!("x-api-key" in req.headers)) res.status(403).send("Unauthorized");

  try {
    const project = await ProjectModel.findById(req.params.id);
    const user = await UserModel.findOne({ email: req.headers["x-api-key"] });
    if (!project) res.status(404).send("Project not found");
    let completion = await checkComplete(project._id);

    if (completion === 1 && !project.complete) {
      user.completedProjects++;
      project.complete = true;
    } else if (
      user.completedProjects >= 0 &&
      completion < 1 &&
      project.complete
    ) {
      user.completedProjects--;
      project.complete = false;
    }

    if (user.completedProjects < 0) user.completedProjects = 0;

    await user.save();
    await project.save();

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).send("An unexpected error occurred");
  }
});

// DELETE - delete project by id
app.delete("/project/:id", async (req, res) => {
  if (!("x-api-key" in req.headers)) res.status(403).send("Unauthorized");
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      res.status(404).send("Project not found");

    const user = await UserModel.findOne({ email: req.headers["x-api-key"] });

    const project = await ProjectModel.findOne({
      uid: req.headers["x-api-key"],
      _id: req.params.id,
    });
    if (!project) res.status(404).send("No project found");

    const deleted_project = await ProjectModel.findByIdAndDelete(project.id);
    let completion = await checkComplete(project._id);
    const tasks = await TaskModel.find({ relatedProject: project._id });

    for (const task of tasks) {
      task.remove();
    }
    if (completion === 1) {
      user.completedProjects--;
    }

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).send("An unexpected error occurred");
  }
});

app.get("/notes", async (req, res) => {
  try {
    if (!("x-api-key" in req.headers)) res.status(403).send("Unauthorized");

    // find all notes
    const notes = await NotesModel.find({});
    res.status(200).json(notes);
  } catch (error) {
    res
      .status(400)
      .json({ errors: { message: "An unexpected error has occurred" } });
  }
});

app.get("/notes/:id", async (req, res) => {
  try {
    if (!("x-api-key" in req.headers)) res.status(403).send("Unauthorized");

    const { id } = req.params;

    const note = await NotesModel.findById(id);

    res.status(200).json(note);
  } catch (error) {
    res
      .status(400)
      .json({ errors: { message: "An unexpected error has occurred" } });
  }
});

app.put("/notes/:id", async (req, res) => {
  try {
    if (!("x-api-key" in req.headers)) res.status(403).send("Unauthorized");

    const { id } = req.params;
    const note = await NotesModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    note.save();

    res.status(200).json(note);
  } catch (error) {
    res
      .status(400)
      .json({ errors: { message: "An unexpected error has occurred" } });
  }
  // if (!note) {
  //   res.status(400).json({errors: {message: 'Cannot find '}})
  // }
});

app.post("/notes", async (req, res) => {
  try {
    if (!("x-api-key" in req.headers)) res.status(403).send("Unauthorized");

    const newNote = new NotesModel(req.body);
    newNote.uid = req.headers["x-api-key"];
    await newNote.save();

    res.status(201).json(newNote);
  } catch (error) {
    console.log();
    if (error.message[23] === ":") {
      res
        .status(400)
        .json({ errors: { message: errorHandler(error.message) } });
    } else {
      res
        .status(400)
        .json({ errors: { message: "An unexpected error has occurred" } });
    } // console.log(error.message);
  }
});

app.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await NotesModel.deleteOne({ _id: id });

    if (deletedNote.deletedCount === 0) {
      res
        .status(400)
        .json({ errors: { message: `Note with id of: ${id} does not exist` } });
    }

    // success = empty json
    res.status(200).json({});
  } catch (error) {
    res
      .status(400)
      .json({ errors: { message: "An unexpected error has occurred" } });
  }
});

app.listen(3001, () => {
  console.log("Server started on 3001");
});
