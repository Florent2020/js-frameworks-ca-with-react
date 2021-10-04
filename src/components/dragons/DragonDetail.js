import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Loader from "../layout/Loader";
import ErrorMessage from "../layout/ErrorMessage";
import { HOME_API } from "../../constants/api";
import { Container } from "react-bootstrap";

function DragonDetail() {
	const [dragon, setDragon] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	let history = useHistory();

	const { id } = useParams();

	if (!id) {
		history.push("/");
	}

	const url = HOME_API + id;

	useEffect(
		function () {
			async function fetchData() {
				try {
					const response = await fetch(url);

					if (response.ok) {
						const json = await response.json();
						console.log(json);
						setDragon(json);
					} else {
						setError("An error occured!");
					}
				} catch (error) {
					setError(error.toString());
				} finally {
					setLoading(false);
				}
			}
			fetchData();
		},
		[url]
	);

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <ErrorMessage message={`Error: ${error}`} />;
	}

	return (
		<div className="dragon--detail">

			<Container>
				<Breadcrumb>
					<Breadcrumb.Item href="/">Back to home</Breadcrumb.Item>
				</Breadcrumb>
				<h1><span>Name: </span>{dragon.name}</h1>

				<Card>
					<Card.Img variant="top" src={dragon.flickr_images} />
					<Card.Body>
						<div>
							<p>Description: {dragon.description}</p>
							<div>
								<Badge variant="info" size="large">
								<span>First flight: </span>{new Date(dragon.first_flight).toUTCString().substr(4,13).replace()}
								</Badge>
							</div>
						</div>
					</Card.Body>
				</Card>
			</Container>
		</div>
	);
}

export default DragonDetail;