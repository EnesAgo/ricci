import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import expObj from "../firebase/firebaseInit";
import { doc, onSnapshot} from "firebase/firestore";
import ImageSlider from "../view/ImageSlider";


function MenInfo() {

    const { docId } = useParams()
    const {firestoreDb} = expObj
    const docRef = doc(firestoreDb, 'men', docId);

    const [painting, setPainting] = useState()
    const [images, setImages] = useState()


    async function GetDocs(){

        const unsub = onSnapshot(docRef, (doc) => {
            setPainting(doc.data())
            console.log(doc.data())
        });
    }

    useEffect(() => {
        GetDocs()
    }, [])
    useEffect(() => {

        if(painting){
            const altImages = [];
            painting.imgs.forEach(e => {
                altImages.push({
                    src: e,
                    alt: painting.desc
                })
            })
            setImages(altImages)
        }

    }, [painting])


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <>

            <section className={"buySection section"}>

                <section className={"slider"}>

                    {
                        images && <ImageSlider data={images} />
                    }
                    {/*<h1>{painting && painting.name}</h1>*/}

                </section>
                <section className={"buyProgress"}>
                    <h2 className={"paintingName"}>{painting && painting.name}</h2>
                    <p className={"paintingDetail"}>{painting && painting.category}</p>
                    <p className={"paintingDetail"}>by Esra Dehar</p>
                    <p className={"stars"}>★★★★★</p>
                    {/*<p className={"price"}>€{painting && painting.price}</p>*/}

                    <ul>
                        {
                            painting && painting.details.map((e) => (
                                <li><span>{e}</span></li>
                            ))
                        }
                    </ul>

                    {
                        painting &&
                        <a
                            href={`mailto:contact@esartshop.com?subject=Buying%20the%20piece%20%23${docId}&body=Hello%20I%20wanna%20buy%20${painting.name}%2C%20`}
                        >
                            <button>BUY / Contact Artist</button>
                        </a>
                    }


                </section>

            </section>
            <section className={"section buyDetailSection"}>

            </section>

        </>
    )
}

export default MenInfo