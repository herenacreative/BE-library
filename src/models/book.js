const connection = require("../helpers/mysql");

module.exports = {
  getAllBookModel: function () {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT b.book_id, b.book_name, b. description, b.image, g.genre_name, a.author_name, b.status, b.stock FROM book_tb b INNER JOIN author_tb a ON b.author_id=a.author_id INNER JOIN genre_tb g ON b.genre_id=g.genre_id",
        function (err, result) {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  searchPageSortModel: function (search, sort, page, limit) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT b.*, a.author_name , g.genre_name 
            FROM book_tb as b INNER JOIN 
            author_tb as a INNER JOIN 
            genre_tb as g WHERE 
            b.author_id=a.author_id AND 
            b.genre_id=g.genre_id 
            AND 
            (b.description like '%${search}%' OR b.book_name like '%${search}%')
            
            GROUP BY book_id
            order by ${sort}`;
      // const sql = 'SELECT b.book_id, b.book_name, b. description, b.image, g.genre_name, a.author_name, b.status, b.stock FROM book_tb b INNER JOIN author_tb a ON b.author_id=a.author_id INNER JOIN genre_tb g ON b.genre_id=g.genre_id'
      // connection.query(`${sql}  WHERE b.book_id || b.book_name || b.status like '%${search}%' order by ${sort} limit ${limit} offset ${page}`, function(err, result) {
      connection.query(sql, function (err, result) {
        console.log(result, "g", err);
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  getIdBookModel: function (id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT b.book_id, b.book_name, b. description, b.image, g.genre_name, a.author_name, b.status FROM book_tb b INNER JOIN author_tb a ON b.author_id=a.author_id INNER JOIN genre_tb g ON b.genre_id=g.genre_id WHERE book_id=?",
        id,
        function (err, result) {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  postBookModel: function (setData) {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO book_tb SET ? ", setData, function (
        err,
        result
      ) {
        console.log(err, "k", result);
        if (err) {
          reject(err);
        }
        const newData = {
          id: result.insertId,
          ...setData,
        };
        resolve(newData);
      });
    });
  },

  putBookModel: function (setData, id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE book_tb SET ? WHERE book_id=?",
        [setData, id],
        function (err, result) {
          if (err) {
            reject(err);
          }
          const newData = {
            id,
            ...setData,
          };
          resolve(newData);
        }
      );
    });
  },

  deleteBookModel: function (id) {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM book_tb WHERE book_id=?", id, function (
        err,
        result
      ) {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
};
