const jsonServer = require('json-server');
const queryString = require('query-string');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3000;

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

router.render = (req, res) => {
    const headers = res.getHeaders();
    const tatolCountHeaders = headers["x-total-count"];
    
    console.log(queryString.parse(req._parsedUrl.search));

    if (req.method === "GET" && tatolCountHeaders) {
        const queryParams = queryString.parse(req._parsedUrl.search);
        const result = {
            data: res.locals.data,
            pagination: {
                _page: Number(queryParams._page) || 10,
                _limit: Number(queryParams._limit) || 1,
                totalPgae: tatolCountHeaders
            }
        }

        return  res.jsonp(result);
    }

    res.jsonp(res.locals.data)
};

// Use default router
server.use('/api', router)
server.listen(PORT, () => {
  console.log('JSON Server is running')
})