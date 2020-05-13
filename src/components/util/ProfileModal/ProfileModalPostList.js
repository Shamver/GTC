import React from 'react';
import {observer} from "mobx-react";
import styled from 'styled-components';
import useStores from '../../../stores/useStores';
import ProfileModalPost from './ProfileModalPost';

const ProfileModalPostList = () => {

    const { UtilStore } = useStores();
    const { profilePostData } = UtilStore;
    // const postList =  profilePostData.map( index => (
    //     <ProfileModalPost postData={index} key={index.postId}/>
    // ));
    console.log(profilePostData)

    return (
        <table>
            <tr>
                <th>제목</th>
                <th>타이틀</th>
            </tr>
            {/*{profilePostData}*/}
        </table>
    );
};

export default observer(ProfileModalPostList);