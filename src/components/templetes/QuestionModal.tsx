import { useRecoilState } from "recoil"
import { questionModalState } from "../../recoil"
import { Box, Modal, Button } from "@mui/material"

export default function QuestionModal() {
    const [questionModal, setQuestionModal] = useRecoilState(questionModalState)
    const handleOpen = () => {
        setQuestionModal({ open: true });
    };
    const handleClose = () => {
        setQuestionModal({ open: false });
    };
    return <Modal
        open={questionModal.open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
    >
        <Box sx={{
            width: 400, height: 400, backgroundColor: '#ffffff',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%)`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Button onClick={handleClose}>
                닫기
            </Button>
        </Box>
    </Modal>
}