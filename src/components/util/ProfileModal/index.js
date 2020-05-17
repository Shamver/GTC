import React from 'react';
import {observer} from "mobx-react";
import {
    Modal, ModalHeader, ModalBody, TabContent,
    TabPane, Nav, NavItem, NavLink, Row, Col
} from 'reactstrap';
import { faCalendarAlt, faAt, faPen, faComment } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import useStores from '../../../stores/useStores';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classnames from 'classnames';

import ProfileModalPostList from './ProfileModalPostList';
import ProfileModalCommentList from './ProfileModalCommentList';
import avatarImg from "../../../resources/images/takagi.jpg";

const ProfileModal = () => {

    const { UtilStore } = useStores();
    const { profileToggle, toggleProfile, profileData, toggleTab, activeTab } = UtilStore;

    return (
        <Modal isOpen={profileToggle} toggle={toggleProfile}>
            <ModalHeaderBack toggle={toggleProfile}><b>{profileData.nickname}님의 프로필</b></ModalHeaderBack>
            <ModalBodyBox>
                <ProfileInfoBox>
                    <ProfileAvatarWrap>
                        <Avatar src={avatarImg} />
                    </ProfileAvatarWrap>
                    <ProfileInfoWrap>
                        <ProfileInfo>
                            <ProfileInfoTitle>
                                <FaiPink icon={faCalendarAlt} className="fa-fw" /> 가입일자
                            </ProfileInfoTitle>
                            <ProfileInfoContents>{profileData.userCreated}</ProfileInfoContents>
                        </ProfileInfo>
                        <ProfileInfo>
                            <ProfileInfoTitle>
                                <FaiPink icon={faAt} className="fa-fw" /> 이메일
                            </ProfileInfoTitle>
                            <ProfileInfoContents>{profileData.userEmail}</ProfileInfoContents>
                        </ProfileInfo>
                        <ProfileInfo>
                            <ProfileInfoTitle>
                                <FaiPink icon={faPen} className="fa-fw" /> 작성 글
                            </ProfileInfoTitle>
                            <ProfileInfoContents>{profileData.postCount}</ProfileInfoContents>
                        </ProfileInfo>
                        <ProfileInfo>
                            <ProfileInfoTitle>
                                <FaiPink icon={faComment} className="fa-fw" /> 작성 댓글
                            </ProfileInfoTitle>
                            <ProfileInfoContents>{profileData.commentCount}</ProfileInfoContents>
                        </ProfileInfo>
                    </ProfileInfoWrap>
                </ProfileInfoBox>

                <div>
                    <Nav tabs>
                        <NavItem>
                            <NavItemTitle className={classnames({ active: activeTab === '1' })} onClick={() => { toggleTab('1'); }} >
                                작성글
                            </NavItemTitle>
                        </NavItem>
                        <NavItem>
                            <NavItemTitle className={classnames({ active: activeTab === '2' })} onClick={() => { toggleTab('2'); }} >
                                작성 댓글
                            </NavItemTitle>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                          <ProfileModalPostList />
                        </TabPane>
                        <TabPane tabId="2">
                          <ProfileModalCommentList />
                        </TabPane>
                    </TabContent>
                </div>
            </ModalBodyBox>
        </Modal>
    );
};
const ModalHeaderBack = styled(ModalHeader)`
  border-bottom: 4px solid #DC3545 !important;
`;

const ModalBodyBox = styled(ModalBody)`
  padding: 5px !important;
`;

const ProfileInfoBox = styled.div`
  display: flex;
  padding: 5px;
`;

const ProfileInfoWrap = styled.div`
`;

const ProfileAvatarWrap = styled.div`
  margin-right: 12px;
`;

const Avatar = styled.img`
  width : 96px;
  border-radius: 3px;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 0;
`;

const ProfileInfoTitle = styled.span`
  font-weight: 500;
  font-size: 13px;
  margin: 0 8px 0 0;
`;

const ProfileInfoContents = styled.span`
  font-size: 13px;
`;

const FaiPink = styled(FontAwesomeIcon)`
  color: #f57c73;
`;

const NavItemTitle = styled(NavLink)`
  font-size: 13px;
  cursor: pointer;
`
export default observer(ProfileModal);