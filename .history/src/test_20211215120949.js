const dns = require('dns')



dns.lookup('google.com', (err, address, family) => {


    console.log("address : " + address)
    console.log("family : " + family)
})