const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.code === '23505') {
    return res.status(400).json({ error: 'Duplicate entry: this record already exists' });
  }

  if (err.code === '23503') {
    return res.status(400).json({ error: 'Foreign key constraint violation' });
  }

  if (err.message.includes('JWT')) {
    return res.status(401).json({ error: 'Authentication error' });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
};

module.exports = errorHandler;
