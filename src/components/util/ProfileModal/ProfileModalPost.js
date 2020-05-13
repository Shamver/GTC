import React from 'react';
import {observer} from "mobx-react";
import styled from 'styled-components';
import useStores from '../../../stores/useStores';

const ProfileModalPost = () => {

    const { UtilStore } = useStores();
    const { profileToggle, toggleProfile, profileData } = UtilStore;

    return (
        <div>hi</div>
    );
};

export default observer(ProfileModalPost);