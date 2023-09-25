import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Modal } from 'react-bootstrap';

function ScheduleModal({eventData, showModal, setShowModal}: any) {
    return(
        <Modalstyled show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>조회</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {eventData && (
                    <>
                        <ModalData>{eventData?.title}</ModalData>
                        <ModalData>{eventData?.date}</ModalData>
                        {eventData.content && <ModalData>{eventData.content}</ModalData>}
                        {eventData?.url && (
                            <ModalData>
                                <Link to={'/event-story/post/' + eventData.url}>게시물보기</Link>
                            </ModalData>
                        )}
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    닫기
                </Button>
            </Modal.Footer>
        </Modalstyled>
    );
}

export default ScheduleModal;

const Modalstyled = styled(Modal)`
    margin-top: 20%;
`;

const ModalData = styled.p`
    font-size: 18px;
`;