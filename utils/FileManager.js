const FileHandler = require("./FileHandler")

class FileManager {

    constructor(file) {
        this.fileHandler = new FileHandler(file);
    }

    async list(print = true, id) {

        try {

            let data = await this.fileHandler.read()
            data = JSON.parse(data);

            if (id) {

                const index = data.findIndex(task => task.id === id);

                if (index !== -1) {
                    if (print) {
                        console.log("Task:", data[index])
                    } else {
                        return data[index];
                    }
                } else {
                    console.error("Error:", "Task not found");
                }

            } else {
                if (print) {
                    console.log("Tasks:", data)
                } else {
                    return data;
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }

    }

    async create(newData) {
        try {
            const data = await this.list(false);
            let id = this.generateRandomId(data);
            let createdAt = this.generateCreationDate();

            const creatingData = {
                "id": id,
                "createdAt": createdAt,
                "title": newData.title || data[index].title,
                "text": newData.text || data[index].text,
            }

            data.push(creatingData);

            await this.fileHandler.write(JSON.stringify(data))

            console.log("Success:", "Task created successfully")

        } catch (error) {
            console.error("Error:", error);
        }
    }

    async update(id, newData) {

        try {
            const data = await this.list(false);

            const index = data.findIndex(task => task.id === id);

            if (index !== -1) {

                const updatedData = {
                    "id": data[index].id,
                    "createdAt": data[index].createdAt,
                    "title": newData.title || data[index].title,
                    "text": newData.text || data[index].text,
                }

                data.splice(index, 1, updatedData)

                await this.fileHandler.write(JSON.stringify(data))

                console.log("Success:", "Task updated successfully")

            } else {
                console.error("Error:", "Task not found");
            }

        } catch (error) {
            console.error("Error:", error);
        }

    }

    async delete(id) {
        try {
            const data = await this.list(false);

            const index = data.findIndex(task => task.id === id);

            if (index !== -1) {

                data.splice(index, 1)

                await this.fileHandler.write(JSON.stringify(data))

                console.log("Success:", "Task deleted successfully")

            } else {
                console.error("Error:", "Task not found");
            }

        } catch (error) {
            console.error("Error:", error);
        }
    }

    generateCreationDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    generateRandomId(data) {

        const length = 10;

        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        let generatedId = '';

        function generateId() {
            let id = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                id += charset[randomIndex];
            }
            return id;
        }

        for (let i = 0; i < 100; i++) {
            generatedId = generateId();

            const index = data.findIndex((task) => task.id === generatedId)

            if (index === -1) {
                break;
            }
        }

        return generatedId;

    }

}

module.exports = FileManager;