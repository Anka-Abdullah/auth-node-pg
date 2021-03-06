const actionQuery = (...argument) => {
    return new Promise((resolve, reject) => {
      connection.query(...argument, (error, result) => {
        if (!error) {
        //   console.log(...argument)
          resolve(result)
        } else {
        //   console.log(...argument)
          reject(new Error(error))
        }
      })
    })
  }

  export default actionQuery