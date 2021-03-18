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

module.exports = {
    getByUser, create
}