import { useState } from 'react';
import { Container, Form, Button, Card, CardBody } from 'react-bootstrap';
import BusinessAPI from '../services/BusinessAPI';
import AlertMessage from '../components/AlertMessage';


const UploadDocs = () => {
    const [formData, setFormData] = useState({
        logo: null,
        images: null,
        document: null,
        documentType: '',
    });
    const [alertMessage, setAlertMessage] = useState(null);

    // useEffect(() => {
    //     // Fetch recent documents of each type
    //     fetchRecentDocs();
    // }, []);

    // const fetchRecentDocs = async () => {
    //     try {
    //         // Fetch recent documents from the backend
    //         const documents = await BusinessAPI.getBusinessDocuments();
    //         console.log("Recent documents:", documents);
    //     } catch (error) {
    //         console.error('Error fetching recent documents:', error);
    //     }
    // };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: (name === "images") ? files : (files ? files[0] : value),
        });
    };

    const handleReset = () => {
        setFormData({
            logo: null,
            images: null,
            document: null,
            documentType: '',
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { logo, images, document, documentType } = formData;

            if (documentType === 'logo' && logo) {
                await BusinessAPI.uploadBusinessLogo({ "logo": logo });
            } else if (documentType === 'images' && images) {
                const imagesFormData = new FormData();
                Array.from(images).forEach(image => {
                    imagesFormData.append('image', image);
                });
                await BusinessAPI.uploadBusinessImage(imagesFormData);
            } else if (documentType === 'document' && document) {
                const documentFormData = new FormData();
                documentFormData.append('document', document);
                await BusinessAPI.uploadBusinessDocument(documentFormData);
            } else if (documentType === 'ownerDocument' && document) {
                const ownerDocumentFormData = new FormData();
                ownerDocumentFormData.append('document', document);
                await BusinessAPI.uploadBusinessOwnerDocument(ownerDocumentFormData);
            } else {
                console.error('Invalid document type or missing file.');
                return;
            }
            // Reset form data
            handleReset();
            setAlertMessage({ type: "success", message: `The ${documentType} uploaded successfully.` });
            // Fetch recent documents again to update the list
            // fetchRecentDocs();
        } catch (error) {
            console.error('Error uploading document:', error);
            setAlertMessage({ type: "danger", message: `${error}` });
        }
    };

    return (
        <Container>
            {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} setAlertMessage={setAlertMessage} />}
            <h3 className="mb-4">Upload logo/images/documents</h3>
            <Card className='shadow rounded'>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="documentType">
                            <Form.Label>Document Type</Form.Label>
                            <Form.Control as="select" name="documentType" value={formData.documentType} onChange={handleChange} required>
                                <option value="">Select document type</option>
                                <option value="logo">Business Logo</option>
                                <option value="images">Business Images</option>
                                <option value="document">Business Document</option>
                                <option value="ownerDocument">Owner Document</option>
                            </Form.Control>
                        </Form.Group>
                        {formData.documentType === 'logo' && (
                            <Form.Group controlId="logo">
                                <Form.Label>Upload Logo</Form.Label>
                                <Form.Control type="file" accept='image/*' name="logo" onChange={handleChange} required />
                            </Form.Group>
                        )}
                        {formData.documentType === 'images' && (
                            <Form.Group controlId="images">
                                <Form.Label>Upload Images</Form.Label>
                                <Form.Control type="file" accept='image/*' name="images" onChange={handleChange} multiple required />
                            </Form.Group>
                        )}
                        {['document', 'ownerDocument'].includes(formData.documentType) && (
                            <Form.Group controlId="document">
                                <Form.Label>Upload Document</Form.Label>
                                <Form.Control type="file" name="document" onChange={handleChange} required />
                            </Form.Group>
                        )}
                        <div className="my-2">
                            <Button variant="primary" className='btn-sm me-2' type="submit">Upload</Button>
                            <Button variant="danger" className='btn-sm me-2' type="reset" onClick={handleReset}>Clear</Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
};

export default UploadDocs;
