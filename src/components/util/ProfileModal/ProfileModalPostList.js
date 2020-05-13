import React from 'react';
import {observer} from "mobx-react";
import styled from 'styled-components';
import useStores from '../../../stores/useStores';
import ProfileModalPost from './ProfileModalPost';

const ProfileModalPostList = () => {

    const { UtilStore } = useStores();
    const { profileToggle, toggleProfile, profileData } = UtilStore;

    return (
        <ProfileModalPost />
    );
};

export default observer(ProfileModalPostList);