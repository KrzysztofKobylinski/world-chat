
import firebase from 'firebase';

class FirebaseSDK {
	constructor() {
		if (!firebase.apps.length) {
			firebase.initializeApp({
        apiKey: '<INSERT_HERE_CONFIG>',
        authDomain: '<INSERT_HERE_CONFIG>',
        databaseURL: '<INSERT_HERE_CONFIG>',
        projectId: '<INSERT_HERE_CONFIG>',
        storageBucket: '<INSERT_HERE_CONFIG>',
        messagingSenderId: '<INSERT_HERE_CONFIG>',
      })
		}
	}
	login = async (user, success_callback, failed_callback) => {
		await firebase
			.auth()
			.signInWithEmailAndPassword(user.email, user.password)
			.then(success_callback, failed_callback);
	};
}
const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;
