import bcrypt from "bcryptjs"

const users = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("password", 10),
    isAdmin: True,
  },
  {
    name: "Billie",
    email: "billie@gmail.com",
    password: bcrypt.hashSync("password", 10),
  },
  {
    name: "Jean",
    email: "jean@gmail.com",
    password: bcrypt.hashSync("password", 10),
  },
]

export default users
