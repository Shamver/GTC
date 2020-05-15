import React, { useState } from 'react';
import {observer} from "mobx-react";
import {
    Modal, ModalHeader, ModalBody, TabContent,
    TabPane, Nav, NavItem, NavLink, Row, Col
} from 'reactstrap';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';
import ProfileModalPostList from './ProfileModalPostList';
import ProfileModalCommentList from './ProfileModalCommentList';
import { faCalendarAlt, faAt, faPen, faComment } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classnames from 'classnames';

const ProfileModal = () => {

    const { UtilStore } = useStores();
    const { profileToggle, toggleProfile, profileData } = UtilStore;
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    return (
        <Modal isOpen={profileToggle} toggle={toggleProfile}>
            <ModalHeaderBack toggle={toggleProfile}><b>{profileData.nickname}님의 프로필</b></ModalHeaderBack>
            <ModalBody>
                <ProfileInfoBox>
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
                </ProfileInfoBox>

                <div>
                    <Nav tabs>
                        <NavItem>
                            <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }} >
                                작성글
                            </NavLink>
                            <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                작성 댓글
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <ProfileModalPostList />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    <ProfileModalCommentList />
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </div>
            </ModalBody>
        </Modal>
    );
};
const ModalHeaderBack = styled(ModalHeader)`
  border-bottom: 4px solid #DC3545 !important;
`;

const ProfileInfoBox = styled.div`
  padding: 5px;
`;

const ProfileInfo = styled.div`
  display: flex;
  margin: 4px 0;
`;

const ProfileInfoTitle = styled.span`
  font-weight: 500;
  font-size: 13px;
  margin: 0 5px 0 0;
`;

const ProfileInfoContents = styled.span`
  color: #cecece;
`;

const FaiPink = styled(FontAwesomeIcon)`
  color: #f57c73;
`;

export default observer(ProfileModal);