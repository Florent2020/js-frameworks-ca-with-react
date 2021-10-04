import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

function DragonItem({ id, name, flickr_images, description, first_flight }) {
	return (
			<Col>
				<Card>
					<NavLink to={`detail/${id}`}>
						<Card.Img variant="top" src={flickr_images} />
						<Card.Body>
							<Card.Title>{name}</Card.Title>
							<div>
								<p><strong>Description:</strong> {description}</p>
								<div>
									<Badge variant="info" size="large">
									<span>First flight: </span>{new Date(first_flight).toUTCString().substr(4,13).replace()}
									</Badge>
								</div>
							</div>
						</Card.Body>
					</NavLink>
				</Card>
			</Col>
	);
}

DragonItem.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	flickr_images: PropTypes.array.isRequired,
	description: PropTypes.string.isRequired,
	first_flight: PropTypes.string,
};

DragonItem.defaultProps = {
	first_flight: "Unknown",
};

export default DragonItem;