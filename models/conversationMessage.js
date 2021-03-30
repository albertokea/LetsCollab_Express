const getMessages = (idconversation) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM conversation_messages where fk_conversation = ?', [idconversation], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

const create = ({ fk_conversation, fk_user, text }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into conversation_messages (fk_conversation, fk_user, text) values (?, ?, ?)', [fk_conversation, fk_user, text], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

module.exports = { getMessages, create }
