import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { ChatsService } from '../../providers/chats-service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ChatViewPage } from '../chat-view/chat-view';

@Component({
    templateUrl: 'chats.html'
})
export class ChatsPage {
    chats: Observable<any[]>;
    constructor(public chatsService: ChatsService,
        public userService: UserService,
        public af: AngularFireDatabase,
        public nav: NavController) {

        this.chatsService.getChats()
            .then(chats => {
                this.chats = chats.map(users => {
                    return users.map(user => {
                        user.info = this.af.object(`/users/${user.$key}`);
                        return user;
                    });
                });
            });
    }


    openChat(key) {
        this.userService.getUid()
            .then(uid => {
                let param = { uid: uid, interlocutor: key };
                this.nav.push(ChatViewPage, param);
            });
    }
}