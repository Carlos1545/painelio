module.exports = {
    insert_todo: `INSERT INTO tbl_todo(title, completed) VALUES(?, ?)`,
    read_todo: `SELECT * FROM tbl_todo`,
    update_todo: `UPDATE tbl_todo SET tbl_todo.title = ?, tbl_todo.completed = ? WHERE tbl_todo.id = ?`,
    delete_todo: `DELETE FROM tbl_todo WHERE tbl_todo.id = ?`
}