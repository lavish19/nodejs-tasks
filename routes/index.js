// routes/index.js
const User = require('../models/User');
const Task = require('../models/Task');
const { check, validationResult } = require('express-validator');
const excelExport = require('../exportExcel');

module.exports = (app) => {
  // Render home page
  app.get('/', (req, res) => {
    res.render('home');
  });

  // Add User Route
  app.get('/add-user', (req, res) => {
    res.render('addUser');
  });

  app.post('/add-user', [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Valid email required'),
    check('mobile').matches(/^[0-9]{10}$/).withMessage('Valid mobile number required')
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('addUser', { errors: errors.array() });
    }

    const { name, email, mobile } = req.body;
    await User.query().insert({ name, email, mobile });
    res.redirect('/');
  });

  // Add Task Route
  app.get('/add-task', async (req, res) => {
    const users = await User.query();
    res.render('addTask', { users });
  });

  app.post('/add-task', async (req, res) => {
    const { user_id, task_name, task_type } = req.body;
    await Task.query().insert({ user_id, task_name, task_type });
    res.redirect('/');
  });

  // Export to Excel Route
  app.get('/export', async (req, res) => {
    const workbook = await excelExport();
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="Users_Tasks.xlsx"');
    await workbook.xlsx.write(res);
    res.end();
  });

  // Fetch tasks for a single user by ID
  app.get('/tasks/:id', async (req, res) => {
    const tasks = await Task.query().where('user_id', req.params.id);
    res.json(tasks);
  });
};

app.get('/add-user', (req, res) => {
    res.render('addUser');
  });
  app.post('/add-user', [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Valid email required'),
    check('mobile').matches(/^[0-9]{10}$/).withMessage('Valid 10-digit mobile number required')
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('addUser', { errors: errors.array() });
    }
    const { name, email, mobile } = req.body;
    await User.query().insert({ name, email, mobile });
    res.redirect('/');
  });
  app.get('/add-task', async (req, res) => {
    const users = await User.query();
    res.render('addTask', { users });
  });
  app.post('/add-task', async (req, res) => {
    const { user_id, task_name, task_type } = req.body;
    await Task.query().insert({ user_id, task_name, task_type });
    res.redirect('/');
  });
  