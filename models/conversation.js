const getByConversation = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM conversations where idconversation = ?', [id], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows[0]);
        });
    });
}

const getByUserId = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM conversations where fk_user1 = ? OR fk_user2 = ?', [id, id], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

const getByUsersIds = (id1, id2) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM conversations where fk_user1 = ? AND fk_user2 = ? OR fk_user1 = ? AND fk_user2 = ? ', [id1, id2, id2, id1], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows[0]);
        });
    });
}

const create = ({ fk_user1, fk_user2 }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into conversations (fk_user1, fk_user2) values (?, ?)', [fk_user1, fk_user2], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

module.exports = { getByConversation, getByUserId, getByUsersIds, create }