import React from 'react';
import {observer} from "mobx-react";
import styled from 'styled-components';
import useStores from '../../../stores/useStores';

const ProfileModalComment = () => {

    const { UtilStore } = useStores();
    const { profileToggle, toggleProfile, profileData } = UtilStore;

    return (
        <div>hihi</div>
    );
};

export default observer(ProfileModalComment);