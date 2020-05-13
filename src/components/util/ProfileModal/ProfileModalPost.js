import React from 'react';
import {observer} from "mobx-react";
import styled from 'styled-components';
import useStores from '../../../stores/useStores';

const ProfileModalPost = ({ postData }) => {
    return (
        <tr>
            <td>{postData.postTitle}</td>
            <td>{postData.postCreated}</td>
        </tr>
    );
};

export default observer(ProfileModalPost);