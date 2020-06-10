//import mockFirebase from '../_mocks_/firebase-mock.js'

import * as firebase from 'firebase';
import 'firebase/auth';
import { loginGoogle } from '../src/index.js'


let firebaseConfig = {
  apiKey: "AIzaSyCBWMiBIM_0KMxQgbZZarPb4R_htLsd9UE",
  authDomain: "socialnetwork-15a5f.firebaseapp.com",
  databaseURL: "https://socialnetwork-15a5f.firebaseio.com",
  projectId: "socialnetwork-15a5f",
  storageBucket: "socialnetwork-15a5f.appspot.com",
  messagingSenderId: "863801306874",
  appId: "1:863801306874:web:c6631f9d9d65117d44a343",
  measurementId: "G-YSFLLZDYTT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/* global.firebase = {
  auth: jest.fn(() => ({
    signInWithPopup: jest.fn(() => new Promise((resolve, reject) => {
      resolve(true)
    }))
  }))
}

test('Login email', () => {
  let email = 'ejemplo@hotmail.com'
  let password = 'ejem'

  expect(auth.loginUser(email, password)).toBe('No cumple con 6 caracteres')

})  */




//global.firebase = mockFirebase();


describe('loginGoogle', () => {
  it('debería ser una función', () => {
    expect(typeof loginGoogle).toBe('function');
  });
});

/* global.firebase = {
  auth: jest.fn(() => ({
    signInWithEmailAndPassword: jest.fn(() => new Promise((resolve, reject) => {
      resolve(true)
    }))
  }))
}
test('Validaciones de emailLogin', () => {
  let email = "antropologia@gmail.com"
  let password = "123D"
  expect(auth.loginUser(email, password)).toBe('No cumple con 6 caracteres');
  expect(auth.loginUser('', password)).toBe('No existe email o password');
}); */