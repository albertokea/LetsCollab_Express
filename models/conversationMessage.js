const getMessages = (idconversation, iduser) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM conversation_messages where fk_conversation = ? AND fk_user = ?', [idconversation, iduser], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports = { getMessages }
