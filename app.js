const tasks = './files/tasks.json';
const paste = './files';

const FileHandler = require('./utils/FileHandler');
const FileManager = require('./utils/FileManager')
const DirectoryHandler = require('./utils/DirectoryHandler')

const file = new FileHandler(tasks);
const directory = new DirectoryHandler(paste);

