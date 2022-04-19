import { MailTrapProvider } from "../../providers/implementations/MailTrapProvider";
import { FakeUserRepository } from "../../repositories/implementations/FakeUserRepository";
import { CreateUserController } from "./createUserController";
import { CreateUserUseCase } from "./createUserUseCase";

const userRepository = new FakeUserRepository();

const emailProvider = new MailTrapProvider();

const createUserUseCase = new CreateUserUseCase(userRepository, emailProvider);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController }