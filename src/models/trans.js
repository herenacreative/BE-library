const connection = require("../helpers/mysql");

module.exports = {
  getAllBorrowModel: function () {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT t.id, t.trans_id, b.book_name, u.user_id, t.borrow_date, t.count, t.status FROM book_tb b INNER JOIN trans_tb t ON t.book_id=b.book_id INNER JOIN user_tb u ON t.user_id = u.user_id",
        function (err, result) {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  getBorrowModelById: function (id) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM trans_tb WHERE id = ?", id, function (
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

  getPendingByUserIdModel: function (id, book_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * from trans_tb where user_id= ? book_id=?",
        [id, book_id],
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
      const sql =
        "SELECT t.id, t.trans_id, b.book_name, u.user_id, t.borrow_date, t.count, t.status FROM book_tb b INNER JOIN trans_tb t ON t.book_id=b.book_id INNER JOIN user_tb u ON t.user_id = u.user_id";
      connection.query(
        `${sql}  WHERE u.user_id || b.book_name || t.trans_id like '%${search}%' order by ${sort} limit ${limit} offset ${page}`,
        function (err, result) {
          console.log(result, "g", err);
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  getIdBorrowModel: function (id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT t.id, t.trans_id, b.book_name, u.user_id, t.borrow_date FROM book_tb b INNER JOIN trans_tb t ON t.book_id=b.book_id INNER JOIN user_tb u ON t.user_id = u.user_id where id=?",
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

  postBorrowModel: function (setData) {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO trans_tb SET ? ", setData, function (
        err,
        result
      ) {
        if (err) {
          reject(err);
        }
        const newData = {
          id: result,
          ...setData,
        };
        resolve(newData);
      });
    });
  },

  getAllReturnedModel: function () {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT r.return_id, t.id, t.book_id, t.user_id, t.borrow_date, r.return_date, t.count, r.status FROM trans_tb t INNER JOIN trans_return_tb r ON r.id=t.id",
        function (err, result) {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  returnSearchPageSortModel: function (search, sort, page, limit) {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT r.return_id, t.id, t.book_id, t.user_id, t.borrow_date, r.return_date, t.count, r.status FROM trans_tb t INNER JOIN trans_return_tb r ON r.id=t.id";
      connection.query(
        `${sql}  WHERE t.user_id || r.return_id || t.id like '%${search}%' order by ${sort} limit ${limit} offset ${page}`,
        function (err, result) {
          console.log(result, "g", err);
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  getIDReturnedModel: function (id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT r.return_id, t.id, t.book_id, t.user_id, t.borrow_date, r.return_date, t.count, r.status FROM trans_tb t INNER JOIN trans_return_tb r ON r.id=t.id where return_id=?",
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

  postReturnedModel: function (setData) {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO trans_return_tb SET ? ", setData, function (
        err,
        result
      ) {
        console.log(err, "k", result);
        if (err) {
          reject(err);
        }
        const newData = {
          id: result,
          ...setData,
        };
        resolve(newData);
      });
    });
  },
};
