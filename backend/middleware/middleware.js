// Middleware we can use to listen to/ view api requests
// app.use((req, res, next) => {
//   console.log(req.originalUrl)
//   next() // Continue with next middleware
// })

const notFound = (req, res, next) => {
  // Send nice error if we use a url that does not exist
  const error = new Error(`URL not found: ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  // An error occurred in a request. However, the statusCode may be 200 even though it shouldn't be. This happens when e.g. we use an object id that is in the wrong format. Here we fix that.
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode
  res.status(statusCode)
  // Return json with error message (and traceback if in development mode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  })
  // This is the last middleware and therefore we don't need to use next()
}

export { notFound, errorHandler }
