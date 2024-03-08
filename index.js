const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const db = mysql.createConnection({
  host: 'n4h.h.filess.io',
  user: 'philosophydb_militarydo',
  password: '206c13a90f82d3d521fe127572baf3269dbb8021',
  database: 'philosophydb_militarydo',
  port: '3307'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
    
app.use('/citations', cors());
// Get all cites
app.get('/citations', (req, res) => {
    db.query('SELECT * FROM CITATIONS', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  
  // Get a cite by ID
  app.get('/citations/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM CITATIONS WHERE id = ?', [id], (err, results) => {
      if (err) throw err;
      res.json(results[0]);
    });
  });
  
  // Create a new cite
  app.post('/citations', (req, res) => {
    const { content } = req.body;
    db.query('INSERT INTO CITATIONS (CONTENT) VALUES (?)', [content], (err, result) => {
      if (err) throw err;
      res.json({ message: 'Cite added successfully', id: result.insertId });
    });
  });
  
  // Update a cite
  app.put('/citations/:id', (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    db.query('UPDATE CITATIONS SET CONTENT = ? WHERE id = ?', [content, id], (err) => {
      if (err) throw err;
      res.json({ message: 'Cite updated successfully' });
    });
  });
  
  // Delete a cite
  app.delete('/citations/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM CITATIONS WHERE id = ?', [id], (err) => {
      if (err) throw err;
      res.json({ message: 'Cite deleted successfully' });
    });
  });        