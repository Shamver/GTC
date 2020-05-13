import React from 'react';
import {observer} from "mobx-react";
import {
    Modal, ModalHeader, ModalBody
} from 'reactstrap';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';
import ProfileModalPostList from './ProfileModalPostList';
import ProfileModalCommentList from './ProfileModalCommentList';

const ProfileModal = () => {

    const { UtilStore } = useStores();
    const { profileToggle, toggleProfile, profileData } = UtilStore;

    return (
        <Modal isOpen={profileToggle} toggle={toggleProfile}>
            <ModalHeader toggle={toggleProfile}><b>{profileData.nickname}님의 프로필</b></ModalHeader>
            <ModalBody>
                <ProfileInfoBox>
                    <ProfileInfo>
                        <ProfileInfoTitle>가입일자</ProfileInfoTitle>
                        <ProfileInfoContents>{profileData.userCreated}</ProfileInfoContents>
                    </ProfileInfo>
                    <ProfileInfo>
                        <ProfileInfoTitle>이메일</ProfileInfoTitle>
                        <ProfileInfoContents>{profileData.userEmail}</ProfileInfoContents>
                    </ProfileInfo>
                    <ProfileInfo>
                        <ProfileInfoTitle>작성 글</ProfileInfoTitle>
                        <ProfileInfoContents>{profileData.postCount}</ProfileInfoContents>
                    </ProfileInfo>
                    <ProfileInfo>
                        <ProfileInfoTitle>작성 댓글</ProfileInfoTitle>
                        <ProfileInfoContents>{profileData.commentCount}</ProfileInfoContents>
                    </ProfileInfo>
                </ProfileInfoBox>
                <ProfileModalPostList />
                <ProfileModalCommentList />
            </ModalBody>
        </Modal>
    );
};

const ProfileInfoBox = styled.div`
  padding: 5px;
`;

const ProfileInfo = styled.div`
  display: flex;
  margin: 4px 0;
`;

const ProfileInfoTitle = styled.span`
  font-weight: 500;
  margin: 0 5px 0 0;
`;

const ProfileInfoContents = styled.span`
  color: #cecece;
`;

export default observer(ProfileModal);