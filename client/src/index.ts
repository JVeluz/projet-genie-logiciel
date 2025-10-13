import User from "./models/user"
import UserService from "./services/user_service"

const userService = new UserService()
const user1: User = new User("Joachim")

userService.save(user1)
const user2: User = userService.get(1)
console.log(user2.getName())