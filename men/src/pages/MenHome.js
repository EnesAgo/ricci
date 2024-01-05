import React, { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot} from "firebase/firestore";
import expObj from "../firebase/firebaseInit";
import OnePainting from "../view/Painting";
function MenHome() {

    const [paintings, setPaintings] = useState([])
    const [paintingData, setPaintingData] = useState([])
    const [filter, setFilter] = useState('')

    const {firestoreDb} = expObj
    const colletionRef = collection(firestoreDb, 'men');


    async function PostD(){
        try {
            const docRef = await addDoc(collection(firestoreDb, "men"), {
                name: "Alexander",
                desc: "Alexander the Great",
                imgs: ['https://firebasestorage.googleapis.com/v0/b/eesart-test.appspot.com/o/paintings%2FAlexanderTheGreat.jpeg?alt=media&token=2a3f956a-58d4-4375-9cc0-97f3dfeedd23'],
                price: 1000
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async function GetDocs(){

        const unsub = onSnapshot(colletionRef, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({docId: doc.id, ...doc.data()});
            });
            setPaintings(items)
            setPaintingData(items)

            console.log(items)
        });
    }

    useEffect(() => {
        GetDocs()
    }, [])


    useEffect(() => {

        let items = [];
        paintingData.forEach(e => {
            if(e.name.toLowerCase().includes(filter.toLowerCase())){
                items.push(e)
            }
        })

        setPaintings(items)


    }, [filter])


    return (
        <>
            {/*<button onClick={() => {PostD()}}>Click</button>*/}

            <section className={"filterCover"}>
                <div className={"filter"}>
                    <h3>Filter:</h3>
                    <input placeholder={"filter 🔍"} type="text" onChange={(e) => setFilter(e.target.value)} />
                    {/*<button onClick={() => {setFilter('')}}>clear filter</button>*/}
                </div>
           </section>

            <section className="paintingCover">
                <div className="paintingsSection">
                    {
                        paintings && paintings.map((e, i) => (
                            <OnePainting key={i} name={e.name} price={e.price} url={e.imgs[0]} docId={e.docId} />
                        ))
                    }
                </div>
            </section>


        </>
    );
}

export default MenHome;
