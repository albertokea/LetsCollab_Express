const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users', (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        })
    })
}

const getById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('select * from users where users.iduser = ?', [id], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows[0]);
        })
    })
}

const getByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('select * from users where users.email = ?', [email], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null)
            resolve(rows[0]);
        });
    });
}

const getByUser = (username) => {
    return new Promise((resolve, reject) => {
        db.query('select * from users where users.user = ? OR users.email = ?', [username, username], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null)
            resolve(rows[0]);
        })
    })
}

const create = ({ name, surname, email, birth_date, gender, user, password }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into users (name, surname, email, birth_date, gender, user, password, register_date) values (?, ?, ?, ?, ?, ?, ?, ?)', [name, surname, email, birth_date, gender, user, password, new Date()],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
    });
}

const updateProfile = ({ bio, profile_picture, instagram, facebook, twitter, subtitle, iduser }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'update users set bio = ?, profile_picture = ?, instagram = ?, facebook = ?, twitter = ?, subtitle = ? where iduser = ?',
            [bio, profile_picture, instagram, facebook, twitter, subtitle, iduser],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
    });
}

/* const updateHeader = ({ header_picture, iduser }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'update users set  header_picture = ?, where iduser = ?',
            [header_picture, iduser],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
    });
} */
const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM users where iduser = ?', [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result)
        });
    });
}



module.exports = {
    getAll, getById, getByEmail, getByUser, create, updateProfile, deleteById, /* updateHeader */
}