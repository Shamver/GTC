import React, { memo } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const PostingContent = () => {
  const { BoardPostStore } = useStores();
  const { post, onChangeValue } = BoardPostStore;
  const { text } = post;

  return (
    <CKEditor
      editor={ClassicEditor}
      data={text}
      onChange={(event, editor) => onChangeValue(editor.getData())}
      config={
        {
          ckfinder: {
            uploadUrl: '/api/util/file/images',
          },
        }
      }
    />
  );
};

export default memo(observer(PostingContent));
