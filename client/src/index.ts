import User from "./user/user"
import UserService from "./user/user_service"

const userService = new UserService()
const user1: User = new User("Joachim")

userService.saveUser(user1)