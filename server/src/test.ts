import ChatServiceTest from "./tests/ChatService.test";
import OfferServiceTest from "./tests/OfferService.test";
import UserServiceTest from "./tests/UserService.test";

async function runTests() {
    const userService = new UserServiceTest();
    const offerService = new OfferServiceTest();
    const chatService = new ChatServiceTest();

    console.log("🏁 Début des tests.");
    // await userService.runTests();
    // await offerService.runTests();
    // await chatService.runTests();
    console.log("🏁 Fin des tests.");
}

runTests();