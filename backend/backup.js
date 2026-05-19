const bcrypt = require("bcryptjs");
bcrypt.hash("admin@123", 10).then(console.log);

