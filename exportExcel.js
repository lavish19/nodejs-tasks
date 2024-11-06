const exceljs = require('exceljs');
const User = require('./models/User');
const Task = require('./models/Task');

async function exportToExcel() {
  const workbook = new exceljs.Workbook();
  const userSheet = workbook.addWorksheet('Users');
  const taskSheet = workbook.addWorksheet('Tasks');

  const users = await User.query();
  const tasks = await Task.query();

  userSheet.columns = [
    { header: 'ID', key: 'id' },
    { header: 'Name', key: 'name' },
    { header: 'Email', key: 'email' },
    { header: 'Mobile', key: 'mobile' }
  ];

  userSheet.addRows(users);

  taskSheet.columns = [
    { header: 'ID', key: 'id' },
    { header: 'Task Name', key: 'task_name' },
    { header: 'Task Type', key: 'task_type' },
    { header: 'User ID', key: 'user_id' }
  ];

  taskSheet.addRows(tasks.map(task => ({
    id: task.id,
    task_name: task.task_name,
    task_type: task.task_type,
    user_id: task.user_id
  })));

  return workbook;
}

module.exports = exportToExcel;
