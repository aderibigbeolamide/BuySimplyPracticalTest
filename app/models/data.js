const fs = require('fs');
function readJsonFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
    return  JSON.parse(data);
    });
};

function getData(filePath) {
    try {
        const data = readJsonFile(filePath);
        return data;
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return null;
    }
}
module.exports = { getData };
