const allowedCors = [
  'https://daianamesto.students.nomoredomainsmonster.ru',
  'http://daianamesto.students.nomoredomainsmonster.ru',
  'localhost:3000',
];

const optionsCors = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Origin', '*');

  next();
};

export default optionsCors;
