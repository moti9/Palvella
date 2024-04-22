import { useState, useEffect } from "react";
import BusinessAPI from "../services/BusinessAPI";
import AlertMessage from "../components/AlertMessage";
import { Card, CardBody, Container } from "react-bootstrap";
import BusinessDetail from "./BusinessDetail";

const AccountDetail = () => {
    const [business, setBusiness] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);


    const getBusineeDetail = async () => {
        try {
            const response = await BusinessAPI.getBusinessDetails();
            setBusiness(response);
        } catch (error) {
            setAlertMessage({ type: "primary", message: "No business found" });
        }
    }

    useEffect(() => {
        getBusineeDetail();
        // console.log(business);
    }, []);

    return (
        <Container>
            {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} setAlertMessage={setAlertMessage} />}
            <Card>
                <CardBody>
                    {business ? (<BusinessDetail data={business} />) : (
                        null)}
                </CardBody>
            </Card>
        </Container>
    );
}

export default AccountDetail;