const jwt = require('jsonwebtoken');

const secret = 'MiSecret';

const generateToken = (user) => {
  return jwt.sign({ user }, secret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };


app.post('/auth', (req, res) => {
    const { user, password } = req.body;
  
    if (user === 'User' && password === 'Password') {
      const token = generateToken(user);
      return res.json({ token });
    } else {
      return res.status(401).json({ error: 'Unauthorized' });
    }
});

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(400).json({ error: 'Bad Request: Token missing' });
    }
  
    const user = verifyToken(token);
  
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
    }
  
    req.user = user;
    next();
  };
  
app.use(authenticateToken);

/*

*/
