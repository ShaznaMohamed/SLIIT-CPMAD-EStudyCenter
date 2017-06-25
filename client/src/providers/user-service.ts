import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';

@Injectable()
export class UserService {
    constructor(public af: AngularFireDatabase, public local: Storage, private camera: Camera) { }

    // Get Current User's UID
    getUid() {
        return this.local.get('uid');
    }

    // Create User in Firebase
    createUser(userCredentails, uid) {
        let currentUserRef = this.af.object(`/users/${uid}`);
        console.log(userCredentails);
        currentUserRef.set({ email: userCredentails.email });
    }

    // Get Info of Single User
    getUser() {
        // Getting UID of Logged In User
        return this.getUid().then(uid => {
            return this.af.object(`/users/${uid}`);
        });
    }


    // Get All Users of App
    getAllUsers() {
        return this.af.list('/users');
    }

    // Get base64 Picture of User
    getPicture() {
        let base64Picture;
        let options = {
            destinationType: 0,
            sourceType: 0,
            encodingType: 0
        };

        let promise = new Promise((resolve, reject) => {
            this.camera.getPicture(options).then((imageData) => {
                base64Picture = "data:image/jpeg;base64," + imageData;
                resolve(base64Picture);
            }, (error) => {
                reject(error);
            });

        });
        return promise;
    }

    // Update Provide Picture of User
    updatePicture() {
        this.getUid().then(uid => {
            let pictureRef = this.af.object(`/users/${uid}/picture`);
            this.getPicture()
                .then((image) => {
                    pictureRef.set(image);
                });
        });
    }
}

