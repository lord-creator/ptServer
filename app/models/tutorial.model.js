const sql = require("./db.js");
const http = require("http");
// import { http } from 

// constructor
const Tutorial = function(tutorial) {
  this._appVersion = tutorial._appVersion;
  this._ip = tutorial._ip;
  this._latitude = tutorial.latitude;
  this._longitude = tutorial.longitude;
};

Tutorial.registerUser = (employee, result) => {
  sql.query("INSERT INTO employee SET ?", employee, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    employee.id = res.insertId;
    console.log("registered employee: ", { id: res.insertId, ...employee });
    result(null, { id: res.insertId, ...employee });
  });
};

/* Record Unregistered Employer */

Tutorial.recordTemployer = (employer, result) => {
  sql.query("INSERT INTO t_employer SET ?", employer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    employer.id = res.insertId;
    console.log("created t_employer: ", { id: res.insertId, ...employer });
    result(null, { id: res.insertId, ...employer });
  });
};

/* Tutorial.recordTemployer = (employer, result) => {
  let query = `INSERT INTO t_employer (_name, _email, _industry) VALUES( ${employer._name}, ${employer._email}, ${employer._industry})`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", { id: res.insertId, ...employer });
    result(null, { id: res.insertId, ...newTutorial });
  });
}; */

/* Get User By Email */

Tutorial.checkUbyemail = (email, result) => {
  sql.query(`SELECT * FROM employee WHERE _email = '${email}' LIMIT 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result( null, 0);
  });
};

Tutorial.checkSession = (user, result) => {
  sql.query(`SELECT * FROM employee WHERE id = ${user.id} AND _email = '${user._email}' LIMIT 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log(`${user.id} is a valid session `);
      result(null, true); //is a valid session
      return;
    }

    // not valid session
    console.log(`QUERY:`,`SELECT * FROM employee WHERE id = ${user.id} AND _email = '${user.email}' LIMIT 1`)
    result( null, false);
  });
};


Tutorial.checkTEbyss = (ss, result) => {
  sql.query(`SELECT * FROM t_employer WHERE _ss = ${ss} LIMIT 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result( null, 0);
  });
};


Tutorial.findById = (id, result) => {
  sql.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tutorial: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Tutorial.getAll = (title, result) => {
  let query = "SELECT * FROM tutorials";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

/* Get Employer */

Tutorial.getEmployer = (details, result) => {
  let query = "SELECT * FROM employer WHERE";

  if(details.id){
    query += ` id = ${details.id} LIMIT 1`;
  }else if (details.industry) {
    query += ` _industry = ${details.industry} LIMIT 1`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found employer: ", res[0]);
      result(null, res);
      return;
    }

    console.log("employer: ", res);
    result(null, 0);
  });
};


/* Get Industries */

Tutorial.getIndustries = (result) => {
    let query = "SELECT * FROM industries";
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.length) {
        console.log("found User: ", res[0]);
        result(null, res);
        return;
      }
  
      console.log("industries: ", res);
      result(null, 0);
    });
};


/* Get Employers */

Tutorial.getEmployers = (result) => {
  let query = "SELECT * FROM employer";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res[0]);
      result(null, res);
      return;
    }

    console.log("Employers: ", res);
    result(null, 0);
  });
};


Tutorial.getupdates = (result) => {
  let query = "SELECT * FROM updates WHERE NOT priority=1 ORDER BY date DESC LIMIT 10";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res);
      result(null, res);
      return;
    }

    console.log("Employers: ", res);
    result(null, 0);
  });
};

Tutorial.getTopupdate = (result) => {
  let query = "SELECT * FROM updates WHERE priority = 1 ORDER BY date DESC LIMIT 1";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res[0]);
      result(null, res[0]);
      return;
    }

    console.log("Employers: ", res);
    result(null, 0);
  });
};

//Record Report
Tutorial.recordReport = (report, result) => {
  sql.query("INSERT INTO report SET ?", report, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    report.id = res.insertId;
    console.log("report recorded successfully: ", { id: res.insertId, ...report });
    result(null, { id: res.insertId, ...report });
  });
};

Tutorial.findReportById = (id, result) => {
  sql.query(`SELECT * FROM report WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found report: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, 0);
  });
};



Tutorial.getAllPublished = result => {
  sql.query("SELECT * FROM tutorials WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

Tutorial.updateById = (id, tutorial, result) => {
  sql.query(
    "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
    [tutorial.title, tutorial.description, tutorial.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};

/* Update Temporary Employer */
Tutorial.updateTEbyss = (employer, result) => {
  sql.query(
    `UPDATE t_employer SET _name = '${employer._name}', _email = '${employer._email}', _industry = '${employer._industry}' WHERE _ss = '${employer._ss}' LIMIT 1`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("response in model on line 248: ", res);

      console.log("updated t_employer: ", employer);
      result(null, employer);
    }
  );
};

/* Update Temporary Employer */
Tutorial.updateUbyemail = (employee, result) => {
  sql.query(
    `UPDATE employee SET _name = '${employee._name}', _industry = '${employee._industry}' WHERE _email = '${employee._email}' LIMIT 1`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("response in model on line 248: ", res);

      console.log("updated employee: ", employee);
      result(null, employee);
    }
  );
};

Tutorial.remove = (id, result) => {
  sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

Tutorial.removeAll = result => {
  sql.query("DELETE FROM tutorials", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tutorials`);
    result(null, res);
  });
};

module.exports = Tutorial;