const getByUser = (iduser) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM favourites where active = 1 AND fk_user = ?', [iduser], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

const getCountByUser = (iduser) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT count(*) as count FROM favourites where fk_user = ? AND active = 1', [iduser], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows[0].count);
        });
    });
}

const getCountByPost = (idpost) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT count(*) as count FROM favourites where fk_post = ? AND active = 1', [idpost], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports = { getByUser, getCountByUser, getCountByPost }