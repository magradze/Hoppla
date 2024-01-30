"use client";
import React from 'react';
import {Trash} from "lucide-react";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";

type CarModelProps = {
    cars: any,
    isOpen: boolean,
    onOpenChange: () => void
}

const CarModel = ({
                      cars,
                      isOpen,
                      onOpenChange
                  }: CarModelProps) => {

    const [modalPlacement, setModalPlacement] = React.useState("auto");

    return (
        <Modal
            isOpen={isOpen}
            placement={modalPlacement as any}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 fira-go">ავტომობილები</ModalHeader>
                        <ModalBody>
                            <ul>
                                {cars.map((car: any, index: number) => (
                                        <li
                                            key={index}
                                            className="w-full flex flex-col gap-2 px-4 py-2 items-start cursor-pointer fira-go">

                                            <div className="flex justify-between items-center w-full">
                                                <div className="flex flex-col w-full">
                                                    <div className="flex justify-between items-center w-full">
                                                        <h3 className="text-lg font-bold flex gap-2 items-center ">{car.brand}
                                                            <div className="w-4 h-4 rounded-md"
                                                                 style={{background: `${car.color.toLowerCase()}`}}/>
                                                        </h3>
                                                    </div>
                                                    <span className="text-xs">{car.model} {car.year}</span>

                                                </div>

                                            </div>
                                            <div
                                                className="flex flex-col justify-center items-center w-full">
                                                <div className="my-2">
                                                    <div className="font-bold">
                                                        <span className="car-plate-ui"> {car.plateNumber}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                )}
                            </ul>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose} className="fira-go">
                                ჩახურვა
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default CarModel;