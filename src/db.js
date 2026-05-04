const { Database } = require('bun:sqlite');

const db = new Database('database.sqlite');

async function add(id, reason) {
    try {
        await db.run('INSERT INTO warnings (user_id, reason) VALUES (?, ?)', [id, reason]);
    } catch (error) {
        console.error('Error adding warning:', error);
    }
}
async function getWarnings(userId) {
    try {
        const warnings = await db.all('SELECT * FROM warnings WHERE user_id = ?', [userId]);
        return warnings;
    } catch (error) {
        console.error('Error fetching warnings:', error);
        return [];
    }
}
module.exports = { add, getWarnings };