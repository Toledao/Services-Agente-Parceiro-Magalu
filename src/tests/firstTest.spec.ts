import { User } from "@entities/user";

test('it should be ok', () => {

    const user = new User();

    user.name = 'felipe';

    expect(user.name).toEqual('felipe');

})