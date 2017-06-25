import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { UserService } from '../../providers/user-service';
import { ChatViewPage } from '../chat-view/chat-view';

@Component({
    templateUrl: 'users.html'
})
export class UsersPage {
    users: FirebaseListObservable<any[]>;
    uid: string;
    constructor(public nav: NavController, public userService: UserService) { }

    ngOnInit() {
        this.userService.getUid()
            .then(uid => {
                this.uid = uid;
                this.users = this.userService.getAllUsers();
                console.log(this.users);
            });
    };

    openChat(key) {
        let param = { uid: this.uid, interlocutor: key };
        this.nav.push(ChatViewPage, param);
    }
}