import { User } from "../../entities/user";
import { IEmailProvider } from "../../providers/IEmailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./createUserDTO";

export class CreateUserUseCase {

    constructor(
        private readonly userRepository: IUsersRepository,
        private readonly emailProvider: IEmailProvider
    ) {}

    
    async execute(data:ICreateUserRequestDTO){

        const userAlreadyExists = await this.userRepository.findByEmail(data.email)
        
        if(userAlreadyExists){
            throw new Error('User already exists.')
        }

        const user = new User(data);
        
        await this.userRepository.save(user);

        await this.emailProvider.sendEmail(
            {
                to: {
                    name: data.name,
                    email: data.email
                },
                from: {
                    name: 'My app squad',
                    email: 'squad@mail.com'
                },
                subject: "My app - sign up",
                body: "You have been sign up sucessfuly!"
            }
        )
        
    }
}