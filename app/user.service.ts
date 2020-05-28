import { Injectable } from "@angular/core";

@Injectable()
export class UserService {

    users: Array<{name: string, picturePath: string}> = [];
    constructor() {

        this.users.push({name: 'Rafal', picturePath: 'rafal.jpg'}, {name: 'Agata', picturePath: 'aleksandra.jpg'}, {name: 'Ola', picturePath: 'ola.jpg'}
        , {name: 'Aleksandra', picturePath: 'agata.jpg'})
    }

    getUsers() {
        return this.users
    }


}
