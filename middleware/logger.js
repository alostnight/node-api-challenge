module.exports = () => {
    return (req, res, next) => {
      const time = new Date().toISOString()
      console.log(`${req.ip} ${req.method} ${req.url}`)
  
      next()
    }
  }
  
