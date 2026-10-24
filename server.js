

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MyNewPassword123",
    database: "delta"
});

// Connect to MySQL
db.connect(function (error) {
    if (error) {
        console.log("Database connection failed");
        console.log(error);
    } else {
        console.log("MySQL connected successfully");
    }
});

// Test route
app.get("/", function (req, res) {
    res.send("Mini Helpdesk Backend is running");
});

// GET: Fetch all tasks
app.get("/tasks", function (req, res) {
    const sql = "SELECT * FROM tasks";

    db.query(sql, function (error, results) {
        if (error) {
            console.log(error);
            return res.status(500).json({
                message: "Tasks could not be fetched"
            });
        }

        res.json(results);
    });
});

// GET: Fetch one task by ID
app.get("/tasks/:id", function (req, res) {
    const id = req.params.id;
    const sql = "SELECT * FROM tasks WHERE id = ?";

    db.query(sql, [id], function (error, results) {
        if (error) {
            console.log(error);
            return res.status(500).json({
                message: "Task could not be fetched"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(results[0]);
    });
});

// POST: Create a task
app.post("/tasks", function (req, res) {
    const { title, description, status, priority } = req.body;

    if (!title || !status || !priority) {
        return res.status(400).json({
            message: "Title, status and priority are required"
        });
    }

    const sql = `
        INSERT INTO tasks (title, description, status, priority)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [title, description || "", status, priority],
        function (error, result) {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Task could not be created"
                });
            }

            res.status(201).json({
                message: "Task created successfully",
                id: result.insertId
            });
        }
    );
});

// PUT: Update a task
app.put("/tasks/:id", function (req, res) {
    const id = req.params.id;
    const { title, description, status, priority } = req.body;

    if (!title || !status || !priority) {
        return res.status(400).json({
            message: "Title, status and priority are required"
        });
    }

    const sql = `
        UPDATE tasks
        SET title = ?, description = ?, status = ?, priority = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [title, description || "", status, priority, id],
        function (error, result) {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Task could not be updated"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Task not found"
                });
            }

            res.json({
                message: "Task updated successfully"
            });
        }
    );
});

// DELETE: Delete a task
app.delete("/tasks/:id", function (req, res) {
    const id = req.params.id;
    const sql = "DELETE FROM tasks WHERE id = ?";

    db.query(sql, [id], function (error, result) {
        if (error) {
            console.log(error);
            return res.status(500).json({
                message: "Task could not be deleted"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully"
        });
    });
});

// Start the server
app.listen(3000, function () {
    console.log("Server running on port 3000");
}); 
// Connect to MySQL
db.connect(function (error) {
    if (error) {
        console.log("Database connection failed");
        console.log(error);
    } else {
        console.log("MySQL connected successfully");
    }
});

// Test route
app.get("/", function (req, res) {
    res.send("Mini Helpdesk Backend is running");
});

// GET: Fetch all tasks
app.get("/tasks", function (req, res) {
    const sql = "SELECT * FROM tasks";

    db.query(sql, function (error, results) {
        if (error) {
            console.log(error);
            return res.status(500).json({
                message: "Tasks could not be fetched"
            });
        }

        res.json(results);
    });
});

// GET: Fetch one task by ID
app.get("/tasks/:id", function (req, res) {
    const id = req.params.id;
    const sql = "SELECT * FROM tasks WHERE id = ?";

    db.query(sql, [id], function (error, results) {
        if (error) {
            console.log(error);
            return res.status(500).json({
                message: "Task could not be fetched"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(results[0]);
    });
});

// POST: Create a task
app.post("/tasks", function (req, res) {
    const { title, description, status, priority } = req.body;

    if (!title || !status || !priority) {
        return res.status(400).json({
            message: "Title, status and priority are required"
        });
    }

    const sql = `
        INSERT INTO tasks (title, description, status, priority)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [title, description || "", status, priority],
        function (error, result) {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Task could not be created"
                });
            }

            res.status(201).json({
                message: "Task created successfully",
                id: result.insertId
            });
        }
    );
});

// PUT: Update a task
app.put("/tasks/:id", function (req, res) {
    const id = req.params.id;
    const { title, description, status, priority } = req.body;

    if (!title || !status || !priority) {
        return res.status(400).json({
            message: "Title, status and priority are required"
        });
    }

    const sql = `
        UPDATE tasks
        SET title = ?, description = ?, status = ?, priority = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [title, description || "", status, priority, id],
        function (error, result) {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Task could not be updated"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Task not found"
                });
            }

            res.json({
                message: "Task updated successfully"
            });
        }
    );
});

// DELETE: Delete a task
app.delete("/tasks/:id", function (req, res) {
    const id = req.params.id;
    const sql = "DELETE FROM tasks WHERE id = ?";

    db.query(sql, [id], function (error, result) {
        if (error) {
            console.log(error);
            return res.status(500).json({
                message: "Task could not be deleted"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully"
        });
    });
});

// Start the server
app.listen(3000, function () {
    console.log("Server running on port 3000");
}); 
