const getAll = (offset) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM posts order by idpost desc limit 10 offset ?', [offset], (err, rows) => {
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

const getByGenre = (genre, offset) => {
    return new Promise((resolve, reject) => {
        db.query('select * from posts where posts.genre = ? order by idpost desc limit 10 offset ?', [genre, offset], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows);
        })
    })
}

const getByLicense = (license, offset) => {
    return new Promise((resolve, reject) => {
        db.query('select * from posts where posts.license = ? order by idpost desc limit 10 offset ?', [license, offset], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows);
        })
    })
}

const getByKey = (key, offset) => {
    return new Promise((resolve, reject) => {
        db.query('select * from posts where posts.key_note = ? order by idpost desc limit 10 offset ?', [key, offset], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows);
        })
    })
}

const getByBpm = (bpm, offset) => {
    return new Promise((resolve, reject) => {
        db.query('select * from posts where posts.bpm = ? order by idpost desc limit 10 offset ?', [bpm, offset], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows);
        })
    })
}

const getByType = (type, offset) => {
    return new Promise((resolve, reject) => {
        db.query('select * from posts where posts.type  = ? order by idpost desc limit 10 offset ?', [type, offset], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows);
        })
    })
}

const getByUserId = (fk_user, offset) => {
    return new Promise((resolve, reject) => {
        db.query('select * from posts where posts.fk_user  = ? order by idpost desc limit 10 offset ?', [fk_user, offset], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows);
        })
    })
}

const getByKeyword = (keyword, offset) => {
    return new Promise((resolve, reject) => {
        db.query('select * from posts where posts.genre like ? OR posts.type like ? OR posts.description_text like ? OR posts.extra_tags like ? order by idpost desc limit 10 offset ?', [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`, offset], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows);
        })
    })
}

const getCount = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT count(*) as count FROM posts', (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows[0].count);
        })
    })
}

const getCountUserPosts = (user) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT count(*) as count FROM posts where fk_user = ?', [user], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows[0].count);
        })
    })
}

const getCountByGenre = (genre) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT count(*) as count FROM posts where genre = ?', [genre], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows[0].count);
        })
    })
}

const getCountByLicense = (license) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT count(*) as count FROM posts where license = ?', [license], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows[0].count);
        })
    })
}

const getCountByKey = (key) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT count(*) as count FROM posts where key_note = ?', [key], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows[0].count);
        })
    })
}

const getCountByBpm = (bpm) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT count(*) as count FROM posts where bpm = ?', [bpm], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows[0].count);
        })
    })
}

const getCountByType = (type) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT count(*) as count FROM posts where type = ?', [type], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows[0].count);
        })
    })
}

const getCountByKeyword = (keyword) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT count(*) as count from posts where posts.genre like ? OR posts.type like ? OR posts.description_text like ? OR posts.extra_tags like ? order by idpost desc limit 10 offset ?', [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows[0].count);
        })
    })
}

const create = ({ genre, license, audio, key, bpm, extra_tags, download, description, type, fk_user }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into posts (genre, license, audio, key_note, bpm, extra_tags, download, like_active, description_text, type, fk_user) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [genre, license, audio, key, bpm, extra_tags, download, false, description, type, fk_user],
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
    getAll, getCount, getCountUserPosts, getCountByGenre, getCountByLicense, getCountByKey, getCountByBpm, getCountByType, getCountByKeyword, getById, getByGenre, getByLicense, getByKey, getByBpm, getByType, getByUserId, getByKeyword, create, updateById, deleteById,
}