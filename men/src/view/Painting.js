import React from "react";
import {Link} from "react-router-dom";

function OnePainting({name, price, url, docId}) {
    return (
        <article className={"painting"}>
            <div>
                <img src={url} alt={name} />
            </div>
            <header>
                {/*<h2>{name} - {price} €</h2>*/}
                <h2>{name}</h2>
                <Link to={`/${docId}`}>
                    <button>
                        BUY
                    </button>
                </Link>
            </header>


        </article>
    )
}

export default OnePainting