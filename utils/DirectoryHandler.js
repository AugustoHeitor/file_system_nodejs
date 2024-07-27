const fsPromises = require('fs').promises;
const fs = require('fs');

class DirectoryHandler {

    constructor(directory) {
        this.directory = directory;
        this.watchHandle = null;
    }

    async create(name) {
        try {

            const path = this.directory + '/' + name;

            await fsPromises.mkdir(path, { recursive: true });

            console.log("Success:", "Directory created successfully");
        } catch (error) {
            console.error('Error created directory:', error);
            throw error;
        }
    }

    async read() {
        try {
            const data = await fsPromises.readdir(this.directory);
            console.log('Directory contents:', data);
        } catch (error) {
            console.error('Error reading directory:', error);
            throw error;
        }
    }


    async delete() {
        try {

            await fsPromises.rm(this.directory, { recursive: true, force: true });
            console.log("Success:", "Directory deleted successfully");

        } catch (error) {
            console.error('Error deleted directory:', error);
            throw error;
        }
    }


    async getStats() {
        try {
            const stats = await fsPromises.lstat(this.directory);
            console.log('Directory statistics:', stats);
        } catch (error) {
            console.error('Error getting directory statistics:', error);
            throw error;
        }
    }

    async rename(newName) {
        try {
            const index = this.directory.lastIndexOf('/');
            const path = this.directory.substring(0, index + 1);
            const newPath = path + newName;

            await fsPromises.rename(this.directory, newPath);
            console.log(`Directory renamed from ${this.directory} to ${path}`);

            this.directory = newPath;

        } catch (error) {
            console.error('Error renaming directory:', error);
            throw error;
        }
    }

    watch() {
        try {

            this.watchHandle = fs.watch(this.directory, (eventType, filename) => {
                console.log(`fs.watch Event: ${eventType}`);
                console.log(`Filename: ${filename}`);
            });

        } catch (error) {
            console.error('Error watching directory:', error);
            throw error;
        }
    }

    unwatch() {
        try {

            if (this.watchHandle) {
                this.watchHandle.close();
                this.watchHandle = null;
                console.log('Stopped watching directory with fs.watch.');
            }

        } catch (error) {
            console.error('Error stopping watch on directory:', error);
            throw error;
        }

    }

    search(text) {

        // Exemplo -> **/*.js

        try {
            fs.glob(text, (error, matches) => {
                if (error) {
                    throw error;
                }

                console.log(matches);
            });
        } catch (error) {
            console.error('Error when searching:', error);
            throw error;
        }

    }

    async copy(path) {
        try {
            await fsPromises.cp(this.directory, path, { recursive: true });
            console.log(`Successfully copied from ${this.directory} to ${path}`);
        } catch (error) {
            console.error('Error while copying:', error);
        }
    }

}

module.exports = DirectoryHandler;