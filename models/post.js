const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM posts', (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        })
    })
}

const getById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('select * from posts where posts.idpost = ?', [id], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows[0]);
        })
    })
}

const getByGenre = (genre) => {
    return new Promise((resolve, reject) => {
        db.query('select * from posts where posts.genre = ?', [genre], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows[0]);
        })
    })
}

const getByLicense = (license) => {
    return new Promise((resolve, reject) => {
        db.query('select * from posts where posts.license = ?', [license], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows[0]);
        })
    })
}

const getByKey = (key) => {
    return new Promise((resolve, reject) => {
        db.query('select * from posts where posts.key = ?', [key], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows[0]);
        })
    })
}

const getByBpm = (bpm) => {
    return new Promise((resolve, reject) => {
        db.query('select * from posts where posts.bpm = ?', [bpm], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows[0]);
        })
    })
}

/* const create = ({ genre, license, audio, date, }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into users (name, surname, email, birth_date, gender, user, password, register_date) values (?, ?, ?, ?, ?, ?, ?, ?)', [name, surname, email, birth_date, gender, user, password, new Date()],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
    });
} */

module.exports = {
    getAll, getById, getByGenre, getByLicense, getByKey, getByBpm
}