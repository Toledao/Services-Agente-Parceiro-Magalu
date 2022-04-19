import { User } from "../../entities/user";
import { IUsersRepository } from "../IUsersRepository";

export class FakeUserRepository implements IUsersRepository{
    
    private users: User[] = [];

    async findByEmail(email: string): Promise<User> {
        console.log(this.users)
        const user = this.users.find(x => x.email === email);
        
        return user;
    }
    
    async save(user: User): Promise<void> {
        this.users.push(user);
    }
}