import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import useStores from '../../../../stores/useStores';

const PostingContent = () => {
  const { UtilLoadingStore } = useStores();
  return (
    <CKEditor
      editor={ClassicEditor}
      data={post.text}
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

export default PostingContent;
