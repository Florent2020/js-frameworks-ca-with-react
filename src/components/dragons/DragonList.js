import { useState, useEffect } from "react";
import { HOME_API } from "../../constants/api";
import Row from "react-bootstrap/Row";
import DragonItem from "./DragonItem";
import Heading from "../layout/Heading";
import Loader from "../layout/Loader";
import ErrorMessage from "../layout/ErrorMessage";

function DragonList() {
    const [dragons, setDragons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(function () {
        async function fetchData() {
            try {
                const response = await fetch(HOME_API);

                if (response.ok) {
                    const json = await response.json();
                    console.log(json);
                    setDragons(json);
                } else {
                    setError("An error occured!")
                }
            } catch (error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorMessage message={`Error: ${error}`} />;
    }

    return (
        <>
            <Heading content="Dragons" />
            <Row>
                {dragons.map(function (dragon) {
                    const { id,
                            name,
                            description,
                            flickr_images,
                            first_flight
                        } = dragon;
                    return <DragonItem key={id} id={id} name={name} description={description} flickr_images={flickr_images} first_flight={first_flight} />;
                })}
            </Row>
        </>
    );
}

export default DragonList;