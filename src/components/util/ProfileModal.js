import React from 'react';
import {observer} from "mobx-react";
import {
    Modal, ModalHeader, ModalBody, FormText, Input,
} from 'reactstrap';
import styled from 'styled-components';
import useStores from '../../stores/useStores';

const MyProfile = () => {

    const { UtilStore } = useStores();
    const { profileToggle, toggleProfile } = UtilStore;

    return (
        <Modal isOpen={profileToggle} toggle={toggleProfile}>
            <ModalHeader toggle={toggleProfile}><b>Profile</b></ModalHeader>
            <ModalBody>
                ㅎㅇ
            </ModalBody>
        </Modal>
    );
};

export default observer(MyProfile);