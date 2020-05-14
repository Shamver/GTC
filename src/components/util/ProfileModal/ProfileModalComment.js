import React from 'react';
import {observer} from "mobx-react";
import styled from 'styled-components';
import useStores from '../../../stores/useStores';

const ProfileModalComment = ({ commentData }) => {
    return (
        <tr>
            <td>{commentData.commentContent}</td>
        </tr>
    );
};

export default observer(ProfileModalComment);