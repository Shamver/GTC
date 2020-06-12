import React, { memo } from 'react';
import {
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import useStores from '../../../../../stores/useStores';

const PostOptionDropDown = () => {
  const { ComponentPostStore } = useStores();
  const { postOptionOpen, openPostOption } = ComponentPostStore;

  return (
    <Dropdown isOpen={postOptionOpen} toggle={openPostOption}>
      <DropdownToggle caret>
        Dropdown
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Header</DropdownItem>
        <DropdownItem>Some Action</DropdownItem>
        <DropdownItem disabled>Action (disabled)</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Foo Action</DropdownItem>
        <DropdownItem>Bar Action</DropdownItem>
        <DropdownItem>Quo Action</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default memo(PostOptionDropDown);
