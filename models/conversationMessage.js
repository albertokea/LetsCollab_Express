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

module.exports = { getMessages }
