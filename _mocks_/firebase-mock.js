
/* const firestore = {
    auth: () => {
        return {
            signInWithPopup: (provider) => {
                return new Promise((resolve, reject) => {
                    resolve('datauser')


                })
            }
        }
    }
} */
//Creando un mock manual
const firebase = {
    auth: () => {
        return {
            signInWithPopup: (provider) => {
                return new Promise((resolve, reject) => {
                    resolve('datauser')


                })
            }
        }
    },


}

export default jest.fn(() => {
    return firebase
}) 