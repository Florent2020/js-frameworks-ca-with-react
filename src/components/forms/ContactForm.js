import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import ValidationError from "../forms/ValidationError";
import { MINIMUM_FIRST_NAME_CHARACTERS, MINIMUM_LAST_NAME_CHARACTERS, MINIMUM_MESSAGE_VALUE, DEFAULT_VALUES } from "../../constants/registration";


const schema = yup.object().shape({

    first_name: yup
        .string()
        .required("Please enter your first name!")
        .min(MINIMUM_FIRST_NAME_CHARACTERS, `Your first name must be at least ${MINIMUM_FIRST_NAME_CHARACTERS} characters!`),
    last_name: yup
        .string()
        .required("Please enter your last name!")
        .min(MINIMUM_LAST_NAME_CHARACTERS, `Your last name must be at least ${MINIMUM_LAST_NAME_CHARACTERS} characters!`),
    email: yup
        .string()
        .required("Please enter an email address!")
        .email("Please enter a valid email address!"),
    subject: yup
        .string()
        .required("Please enter your subject!"),
    message: yup
        .string()
        .required("Please enter your message!")
        .min(MINIMUM_MESSAGE_VALUE, `The message must be at least ${MINIMUM_MESSAGE_VALUE} characters!`),

});


function ContactForm() {

    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    function onSubmit(data) {
        console.log(data);

        setSubmitted(true);

        reset(DEFAULT_VALUES);
    }

    // console.log(errors);

    return (
        <Container>
            {submitted && <Alert variant="success">Your submit was successful!</Alert>}
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Control placeholder="First Name" {...register("first_name")} />
                    {errors.first_name && <ValidationError>{errors.first_name.message}</ValidationError>}
                </Form.Group>

                <Form.Group>
                    <Form.Control placeholder="Last Name" {...register("last_name")} />
                    {errors.last_name && <ValidationError>{errors.last_name.message}</ValidationError>}
                </Form.Group>

                <Form.Group>
                    <Form.Control placeholder="Email" {...register("email")} />
                    {errors.email && <ValidationError>{errors.email.message}</ValidationError>}
                </Form.Group>

                <Form.Group>
                    <Form.Control placeholder="Select ..." {...register("subject")}  as="select">
                        <option value="">Subject</option>
                        <option value="sport">Sport</option>
                        <option value="music">Music</option>
                        <option value="science">Science</option>
                    </Form.Control>
                    {errors.subject && <ValidationError>{errors.subject.message}</ValidationError>}
                </Form.Group>

                <Form.Group>
                    <Form.Control  placeholder="Message" {...register("message")}  as="textarea" rows={3} />
                    {errors.message && <ValidationError>{errors.message.message}</ValidationError>}
                </Form.Group>

                <Button variant="info" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default ContactForm;