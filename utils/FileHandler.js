const fsPromises = require('fs').promises;
const fs = require('fs');

class FileHandler {

    constructor(file) {
        this.file = file;
        this.watchListener = null;
        this.watchHandle = null;
    }

    async read() {
        try {
            const data = await fsPromises.readFile(this.file, 'utf8');
            return data;
        } catch (error) {
            console.error('Error reading file:', error);
            throw error;
        }
    }

    async write(newData) {
        try {
            await fsPromises.writeFile(this.file, newData, 'utf8');
        } catch (error) {
            console.error('Error writing file:', error);
            throw error;
        }
    }

    async delete() {
        try {
            await fsPromises.unlink(this.file);
            console.log("Success:", "File deleted successfully");
        } catch (error) {
            console.error('Error deleted file:', error);
            throw error;
        }
    }

    async getStats() {
        try {
            const stats = await fsPromises.lstat(this.file);
            console.log('File statistics:', stats);
        } catch (error) {
            console.error('Error getting file statistics:', error);
            throw error;
        }
    }

    async rename(newName) {
        try {
            const index = this.file.lastIndexOf('/');
            const path = this.file.substring(0, index + 1);
            const newPath = path + newName;

            await fsPromises.rename(this.file, newPath);
            console.log(`File renamed from ${this.file} to ${path}`);

            this.file = newPath;

        } catch (error) {
            console.error('Error renaming file:', error);
            throw error;
        }
    }

    watch() {
        try {

            this.watchHandle = fs.watch(this.file, (eventType, filename) => {
                console.log(`fs.watch Event: ${eventType}`);
                console.log(`Filename: ${filename}`);
            });

            this.watchListener = (curr, prev) => {
                console.log('fs.watchFile Event: File changed');
                console.log(`Previous modification time: ${prev.mtime}`);
                console.log(`Current modification time: ${curr.mtime}`);
            };

            fs.watchFile(this.file, { interval: 1000 }, this.watchListener);
        } catch (error) {
            console.error('Error watching file:', error);
            throw error;
        }
    }

    unwatch() {
        try {

            if (this.watchHandle) {
                this.watchHandle.close();
                this.watchHandle = null;
                console.log('Stopped watching file with fs.watch.');
            }

            if (this.watchListener) {
                fs.unwatchFile(this.file, this.watchListener);
                this.watchListener = null;
                console.log('Stopped watching file with fs.watchFile.');
            }
        } catch (error) {
            console.error('Error stopping watch on file:', error);
            throw error;
        }
    }
}

module.exports = FileHandler;