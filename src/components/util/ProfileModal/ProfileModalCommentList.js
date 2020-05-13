import React from 'react';
import {observer} from "mobx-react";
import styled from 'styled-components';
import useStores from '../../../stores/useStores';
import ProfileModalComment from './ProfileModalComment';

const ProfileModalCommentList = () => {

    const { UtilStore } = useStores();
    const { profileToggle, toggleProfile, profileData } = UtilStore;

    return (
        <ProfileModalComment />
    );
};

export default observer(ProfileModalCommentList);