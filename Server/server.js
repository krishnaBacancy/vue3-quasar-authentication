const express = require('express')
const app = express()

const cors = require('cors')
const axios = require('axios')
const qs = require('qs')
const createError = require('http-errors')

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

const router = express.Router();

const auth = (req, res, next) => {
  // check for basic auth header
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return res.status(401).json({ message: 'Missing Authorization Header' });
  }

  // verify auth credentials
  const base64Credentials =  req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  req.user = { username, password }
  next()
}

router.post('/', auth, async (req, res) => {
  // console.log('req.user', req.user);
  const { username, password } = req.user;
  const data = qs.stringify({
    'scope': 'offline_access',
    'grant_type': 'password',
    'username': username,
    'password': password,
    'client_id': '0oahdhjkutaGcIK2M4x6' 
  });
  const config = {
    method: 'post',
    url: 'https://dev-457931.okta.com/oauth2/aushd4c95QtFHsfWt4x6/v1/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  };
  
  try {
    const result = (await axios(config) || {})
    res.send(result.data)
  } catch (e) {
    const error = ((e || {}).response || {}).data
    const message = (e || {}).message
    res.status(401).send(error || (message ? { error: message } : e))
  }
  
});

app.use('/', router)

// Configure a middleware for 404s and the error handler
app.use((req, res, next) => {
  next(createError(404));
});

const port = 3000;
const host = '127.0.0.1';
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  console.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  console.info('Application started on http://%s:%d', host, port)
);
