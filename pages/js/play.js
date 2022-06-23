'use strict';

import Vision from '../../vision.js'
import { getFirestore, collection, query, where, orderBy, getDoc, getDocs, doc, setDoc, addDoc, Timestamp  } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js'

const userEmail = "ebalbin00@mylangara.ca"
let wordOfTheDay = ""

function init () {

    const db = getFirestore()
    
    // Get User Details
    const userRef = collection(db, "users")
    const userDetails = query(userRef, where("user_email", "==", userEmail))

    getDocs(userDetails)
    .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            document.querySelector('.name-field').innerHTML = `Hi ${doc.data().firstname}!`
        })
    })

    const wordsRef = collection(db, "words")
    const allWords = query(wordsRef)

    // Get User Progress
    let usedWords = []

    const datesAreOnSameDay = (first, second) =>
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate();

    const progressRef = collection(db, "progress")
    const userProgress = query(progressRef,
        where("user_email", "==", userEmail),
        orderBy("date_started", "desc"))

    getDocs(userProgress)
    .then((snapshot) => {
        // user progress found
        document.querySelector('#mainArea').style.display = "block"

        let allProgress = snapshot.docs
        let recentProgress = allProgress[0]

        if (recentProgress.data().resolved === false) {
            // if resolved false
            let dateStarted = new Date(recentProgress.data().date_started.seconds * 1000)

            if (datesAreOnSameDay(dateStarted, new Date())) {
                // same day
                const docRef = doc(db, "words", recentProgress.data().word)
                getDoc(docRef)
                .then((doc) => {
                    wordOfTheDay = doc.data().name
                    document.querySelector('.word-to-guess').innerHTML = doc.data().name

                    doc.data().hints.forEach((hint) => {
                        document.querySelector('.word-hints').innerHTML += `<li>${hint}</li>`
                    })
                })

            } else {
                // not same day
                let wordPool = []
                let listOfWords = []
                let finishedWords = []
                
                allProgress.forEach((doc) => {
                    finishedWords.push(doc.data().word)
                })
                
                let getList = async () => {
                    await getDocs(allWords)
                    .then((snapshot) => {
                        snapshot.docs.forEach((doc) => {
                            listOfWords.push(doc.id)
                        })
                    })
                }

                const getNewWord = async () => {
                    await getList()
                    wordPool = listOfWords.filter(val => !finishedWords.includes(val))

                    wordOfTheDay = wordPool[Math.floor(Math.random() * wordPool.length)]
                    
                    addNewProgress(wordOfTheDay)
                }
                getNewWord()
            }
        } else {
            // if resolved true
        }
    })
    .catch((error) => {
        console.log(error.message)
        // no user progress found
        // Get all words and choose one randomly

        getDocs(allWords)
        .then((snapshot) => {
            let randomWord = snapshot.docs[Math.floor(Math.random() * snapshot.docs.length)].id

            addNewProgress(randomWord)
        })
    })

    function addNewProgress(whatstheword) {
        let addProgress = async () => {
            await addDoc(collection(db, "progress"), {
                date_completed: "",
                date_started: Timestamp.fromDate(new Date()),
                resolved: false,
                tries: 1,
                user_email: userEmail,
                word: whatstheword
            });

            location.reload()
        }
        addProgress()
    }

}

init();