const getByPost = (idpost) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM post_messages order by idpost desc where fk_post = ?', [idpost], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        })
    })
}

const getByUserId = (iduser) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM post_messages order by idpost desc where fk_user = ?', [iduser], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        })
    })
}

const create = ({ fk_post, fk_user, text }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into post_messages (fk_post, fk_user, text) values (?, ?, ?)', [fk_post, fk_user, text], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM posts where idpost_message = ?', [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result)
        });
    });
}

module.exports = {
    getByPost, getByUserId, create, deleteById
}