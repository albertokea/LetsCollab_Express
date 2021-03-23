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
            resolve(rows);
        })
    })
}

const getByLicense = (license) => {
    return new Promise((resolve, reject) => {
        db.query('select * from posts where posts.license = ?', [license], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows);
        })
    })
}

const getByKey = (key) => {
    return new Promise((resolve, reject) => {
        db.query('select * from posts where posts.key = ?', [key], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows);
        })
    })
}

const getByBpm = (bpm) => {
    return new Promise((resolve, reject) => {
        db.query('select * from posts where posts.bpm = ?', [bpm], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows);
        })
    })
}

const getByType = (type) => {
    return new Promise((resolve, reject) => {
        db.query('select * from posts where posts.type  = ?', [type], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows);
        })
    })
}

const getByUserId = (fk_user) => {
    return new Promise((resolve, reject) => {
        db.query('select * from posts where posts.fk_user  = ?', [fk_user], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows);
        })
    })
}

const create = ({ genre, license, audio, key, bpm, extra_tags, download, description, type }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into posts (genre, license, audio, key_note, bpm, extra_tags, download, like_active, description_text, type) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [genre, license, audio, key, bpm, extra_tags, download, false, description, type],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
    });
}

const updateById = ({ genre, license, audio, key_note, bpm, extra_tags, download, description_text, like_active, idpost }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'update posts set genre = ?, license = ?, audio = ?, key_note = ?, bpm = ?, extra_tags = ?, download = ?, like_active = ?, description_text = ? where idpost = ?',
            [genre, license, audio, key_note, bpm, extra_tags, download, description_text, like_active, idpost],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
    });
}

const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM posts where idpost = ?', [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result)
        });
    });
}

module.exports = {
    getAll, getById, getByGenre, getByLicense, getByKey, getByBpm, getByType, getByUserId, create, updateById, deleteById
}