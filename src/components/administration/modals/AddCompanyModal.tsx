"use client";
import React from 'react';
import {Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react";
import CompanyForm from "@/components/administration/forms/CompanyForm";

type Props = {
    isOpen: boolean,
    onOpenChange: () => void
}

const AddCompanyModal = ({isOpen, onOpenChange}: Props) => {
    const [modalPlacement] = React.useState("auto");

    return (
        <Modal
            isOpen={isOpen}
            placement={modalPlacement as any}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 fira-go">კომპანიის დამატება</ModalHeader>
                        <ModalBody>
                            <CompanyForm onClose={onClose}/>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AddCompanyModal;
