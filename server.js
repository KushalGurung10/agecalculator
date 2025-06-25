const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Age Calculator Backend is Running!');
});

app.post('/calculate-age', (req, res) => {
  const { name, dob } = req.body;

  if (!name || !dob) {
    return res.status(400).json({ error: 'Name and date of birth are required' });
  }

  const birthDate = new Date(dob);
  const today = new Date();

  if (isNaN(birthDate.getTime())) {
    return res.status(400).json({ error: 'Invalid date format' });
  }

  let age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!hasHadBirthdayThisYear) {
    age--;
  }

  res.json({ message: `${name}, you are ${age} years old.` });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
