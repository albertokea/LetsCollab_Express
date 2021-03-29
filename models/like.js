const getLike = (idpost, iduser) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM likes where fk_post = ? AND fk_user = ?', [idpost, iduser], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows[0]);
        });
    });
}

const getByUser = (iduser) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM likes where fk_user = ?', [iduser], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

const create = ({ fk_post, fk_user }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into likes (fk_post, fk_user) values (?, ?)', [fk_post, fk_user], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM likes where idlike = ?', [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result)
        });
    });
}

module.exports = { getLike, getByUser, create, deleteById }